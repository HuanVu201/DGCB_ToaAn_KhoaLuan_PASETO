import axios from "axios";
import { API_VERSION,BEARER_TOKEN, HOST_PATH_FILE } from "../../data/constant";
import { ICredential } from "../../models";
import {StoreType} from '../redux/Store'
import { RefreshToken } from "@/features/auth/redux/Actions";
import { resetData as resetAuth} from "@/features/auth/redux/Slice";
import { resetData as resetUser} from "@/features/user/redux/Slice";
import { toast } from "react-toastify";

let store: StoreType

export const injectStoreFile = (_store: StoreType)=> {
  store = _store
}

const axiosInstanceFile = axios.create({
    baseURL: HOST_PATH_FILE,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
    },
})

export const getToken = () => {
  if(process.env.NODE_ENV !== "production" && BEARER_TOKEN){
    return  BEARER_TOKEN
  }
  const auth = localStorage.getItem("persist:root")
  const authKey = auth != null ? JSON.parse(auth) : null
  if(authKey) {
    return JSON.parse(authKey?.auth)?.data?.token
  }
  return null
}

axiosInstanceFile.defaults.headers.common['Tenant'] = `root`;
axiosInstanceFile.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
axiosInstanceFile.defaults.withCredentials = false

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

axiosInstanceFile.interceptors.request.use((config) => {
  // console.log(store.getState().auth.data?.token);
  // console.log(getToken());
  
  var token = store.getState().auth.data?.token;//store.getState().auth.data?.token;
  if(token)
    config.headers['Authorization'] = `Bearer ${token}`;
  
  return config;
})

axiosInstanceFile.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error?.config;
      
      if (error?.response?.status === 401 && !originalRequest.sent) {
        if (isRefreshing) {
          // If a refresh token request is already ongoing, queue the requests
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              resolve(axiosInstanceFile(originalRequest));
            });
          });
        }
        originalRequest.sent = true;
        isRefreshing = true;

        try {
          // const response = await axios.post<ICredential>(HOST_PATH + "/api/tokens/refresh", {
          //   withCredentials: true,
          // });
          const credential = store.getState().auth.data
          if(credential){
            
            const response = await store.dispatch(RefreshToken({token: credential.token, refreshToken: credential.refreshToken})).unwrap()
            originalRequest.headers.Authorization = `Bearer ${response.token}`;
            console.log("set new token");
          
            onRrefreshed(response.token);
            isRefreshing = false;
          }

          return axiosInstanceFile(originalRequest);
        } catch (error) {
          toast.warning("Hết phiên đăng nhập, vui lòng đăng nhập lại")
          isRefreshing = false;
          store.dispatch(resetAuth())
          store.dispatch(resetUser())
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
export default axiosInstanceFile;