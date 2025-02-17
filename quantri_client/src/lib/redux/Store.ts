import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { appReducer, rootReducer } from "./RootReducer";
import { injectStore } from "../axios";
import { injectStoreFile } from "../axios/fileInstance";
import { quyTrinhXuLyApi } from '../../services/quytrinhxuly'


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"] ,
  blacklist: ["config"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


injectStore(store)
injectStoreFile(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type StoreType = typeof store

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
