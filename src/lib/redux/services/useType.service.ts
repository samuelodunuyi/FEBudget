import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const useTypeApi = createApi({
  reducerPath: 'useTypeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['UseType'],
  endpoints: (builder) => ({
    createUseType: builder.mutation({
      query: (body) => ({
        url: `api/v1/UseType`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UseType'],
    }),

    getUseTypes: builder.query({
      query: (params) => ({
        url: `api/v1/UseType`,
        method: 'GET',
        params,
      }),
      providesTags: ['UseType'],
    }),

    getUseType: builder.query({
      query: (id) => ({
        url: `api/v1/UseType/${id}`,
        method: 'GET',
      }),
      providesTags: ['UseType'],
    }),

    updateUseType: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/UseType/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UseType'],
    }),

    deleteUseType: builder.mutation({
      query: (id) => ({
        url: `api/v1/UseType/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UseType'],
    }),
  }),
});

export const {
  useCreateUseTypeMutation,
  useGetUseTypesQuery,
  useGetUseTypeQuery,
  useUpdateUseTypeMutation,
  useDeleteUseTypeMutation,
} = useTypeApi;
