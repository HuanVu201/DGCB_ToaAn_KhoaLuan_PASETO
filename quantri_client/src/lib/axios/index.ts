import axios from "axios";
import { API_VERSION, HOST_PATH, BEARER_TOKEN, HOST_PATH_FILE } from "../../data/constant";
import { ICredential } from "../../models";
import { StoreType } from '../redux/Store';
import { RefreshToken } from "@/features/auth/redux/Actions";
import { resetData as resetAuth } from "@/features/auth/redux/Slice";
import { resetData as resetUser } from "@/features/user/redux/Slice";
import { toast } from "react-toastify";

let store: StoreType;

export const injectStore = (_store: StoreType) => {
  store = _store;
}

const axiosInstance = axios.create({
  baseURL: HOST_PATH,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    accept: "application/json",
  },
});

export const getToken = () => {
  if (process.env.NODE_ENV !== "production" && BEARER_TOKEN) {
    return BEARER_TOKEN;
  }
  const auth = localStorage.getItem("persist:root");
  const authKey = auth != null ? JSON.parse(auth) : null;
  if (authKey) {
    return JSON.parse(authKey?.auth)?.data?.token;
  }
  return null;
}

axiosInstance.defaults.headers.common['Tenant'] = `root`;
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
axiosInstance.defaults.withCredentials = false;

// Add a flag to track whether a refresh token request is ongoing
let isRefreshing = false;

// Array to hold requests waiting for the token to be refreshed
let refreshSubscribers: ((token: string) => void)[] = [];

// Function to handle the subscribers (pending requests)
const onRrefreshed = (newToken: string) => {
  refreshSubscribers.map((callback) => callback(newToken));
  refreshSubscribers = []; // Clear the subscribers once token is refreshed
}

// Subscribe to refresh token process
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
}

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.data?.token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If a refresh token request is already ongoing, queue the requests
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const credential = store.getState().auth.data;
        if (credential) {
          // Call refresh token API
          const response = await store.dispatch(RefreshToken({
            token: credential.token,
            refreshToken: credential.refreshToken
          })).unwrap();

          // Update token in the original request and retry
          originalRequest.headers['Authorization'] = `Bearer ${response.token}`;
          // Notify all the subscribers (queued requests) with the new token
          onRrefreshed(response.token);
          isRefreshing = false;

          return axiosInstance(originalRequest);
        }
      } catch (error) {
        // In case of error during token refresh, log out user
        isRefreshing = false;
        toast.warning("Hết phiên đăng nhập, vui lòng đăng nhập lại");
        store.dispatch(resetAuth());
        store.dispatch(resetUser());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const parseParams = (params: any):string=>{
  let options:string = "";
  let k: keyof typeof params;
  for(k in params){
    
    const isParamTypeObject = typeof params[k] === 'object';
   
    const isParamTypeArray = isParamTypeObject && (params[k]?.length >=0);
    if (!isParamTypeObject && params[k]) {
      options += `${k}=${params[k]}&`;
    }

    if (isParamTypeObject && isParamTypeArray && params[k]) {    
      // let arr = params[k] as string[];  
      params[k].forEach((element: string, index: number) => {
        let key = k as string;
        options += `${key}[${index}]=${element}&`;
      });
    }
  }

  return  options ? options.slice(0, -1) : options;
}
export default axiosInstance;