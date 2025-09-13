import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const fundApi = createApi({
  reducerPath: 'fundApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Fund'],
  endpoints: (builder) => ({
    createFund: builder.mutation({
      query: (body) => ({
        url: `api/v1/Fund`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Fund'],
    }),

    getFunds: builder.query({
      query: (params) => ({
        url: `api/v1/Fund`,
        method: 'GET',
        params,
      }),
      providesTags: ['Fund'],
    }),

    getFund: builder.query({
      query: (id) => ({
        url: `api/v1/Fund/${id}`,
        method: 'GET',
      }),
      providesTags: ['Fund'],
    }),

    updateFund: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/Fund/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Fund'],
    }),

    deleteFund: builder.mutation({
      query: (id) => ({
        url: `api/v1/Fund/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fund'],
    }),
  }),
});

export const {
  useCreateFundMutation,
  useGetFundsQuery,
  useGetFundQuery,
  useUpdateFundMutation,
  useDeleteFundMutation,
} = fundApi;
