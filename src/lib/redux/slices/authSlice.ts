/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type AuthState = {
  userInfo: any | null;
  token: string | null;
  role: number | null;
};

const initialState: AuthState = {
  userInfo: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data, token } }: PayloadAction<{ data: any; token: any }>
    ) => {
      state.token = token;
      state.userInfo = data;
    },

    setUser: (state, { payload }: PayloadAction<any>) => {
      state.userInfo = payload;
    },

    updateUser: (state, { payload }: PayloadAction<any>) => {
      state.userInfo = { ...state.userInfo, ...payload };
    },

    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem('persist:root');
      Cookies.remove('token');
      window.location.href = '/';
      return initialState;
    },

    setRole: (state, { payload }: PayloadAction<number>) => {
      state.role = payload;
    },
  },
});

export const { setCredentials, logOut, setUser, updateUser, setRole } =
  authSlice.actions;

export default authSlice.reducer;
