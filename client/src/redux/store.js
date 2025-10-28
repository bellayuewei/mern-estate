import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';            // ← 建议带 .js 后缀

import { persistReducer, persistStore } from 'redux-persist'; // ← 用根入口
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer})
const persistConfig = {
  key : 'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)