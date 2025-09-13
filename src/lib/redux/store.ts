import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { approvalApi } from './services/approval.service';
import { budgetLineApi } from './services/budgetLine.service';
import { fundApi } from './services/fund.service';
import { grantProviderApi } from './services/grantProvider.service';
import { requestApi } from './services/request.service';
import { userApi } from './services/user.service';
import { useTypeApi } from './services/useType.service';
import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [requestApi.reducerPath]: requestApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [budgetLineApi.reducerPath]: budgetLineApi.reducer,
  [approvalApi.reducerPath]: approvalApi.reducer,
  [fundApi.reducerPath]: fundApi.reducer,
  [grantProviderApi.reducerPath]: grantProviderApi.reducer,
  [useTypeApi.reducerPath]: useTypeApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    [requestApi.reducerPath]: requestApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [budgetLineApi.reducerPath]: budgetLineApi.reducer,
    [approvalApi.reducerPath]: approvalApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [grantProviderApi.reducerPath]: grantProviderApi.reducer,
    [useTypeApi.reducerPath]: useTypeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      requestApi.middleware,
      userApi.middleware,
      budgetLineApi.middleware,
      approvalApi.middleware,
      fundApi.middleware,
      grantProviderApi.middleware,
      useTypeApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
