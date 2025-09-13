import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const grantProviderApi = createApi({
  reducerPath: 'grantProviderApi',
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
  tagTypes: ['GrantProvider'],
  endpoints: (builder) => ({
    createGrantProvider: builder.mutation({
      query: (body) => ({
        url: `api/v1/GrantProvider`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GrantProvider'],
    }),

    getGrantProviders: builder.query({
      query: (params) => ({
        url: `api/v1/GrantProvider`,
        method: 'GET',
        params,
      }),
      providesTags: ['GrantProvider'],
    }),

    getGrantProvider: builder.query({
      query: (id) => ({
        url: `api/v1/GrantProvider/${id}`,
        method: 'GET',
      }),
      providesTags: ['GrantProvider'],
    }),

    updateGrantProvider: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/GrantProvider/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['GrantProvider'],
    }),

    deleteGrantProvider: builder.mutation({
      query: (id) => ({
        url: `api/v1/GrantProvider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GrantProvider'],
    }),

    getGrantProviderSummary: builder.query({
      query: () => ({
        url: `api/v1/Report/grant-provider-summary`,
        method: 'GET',
      }),
      providesTags: ['GrantProvider'],
    }),

    getReportDetails: builder.query({
      query: (params) => ({
        url: `api/v1/Report/details`,
        method: 'GET',
        params,
      }),
      providesTags: ['GrantProvider'],
    }),

    getFinancialSummary: builder.query({
      query: (params) => ({
        url: `api/v1/Report/financial-summary`,
        method: 'GET',
        params,
      }),
      providesTags: ['GrantProvider'],
    }),

    getStatusStats: builder.query({
      query: (params) => ({
        url: `api/v1/Report/status-stats`,
        method: 'GET',
        params,
      }),
      providesTags: ['GrantProvider'],
    }),
  }),
});

export const {
  useCreateGrantProviderMutation,
  useGetGrantProvidersQuery,
  useGetGrantProviderQuery,
  useUpdateGrantProviderMutation,
  useDeleteGrantProviderMutation,
  useGetGrantProviderSummaryQuery,
  useGetReportDetailsQuery,
  useGetFinancialSummaryQuery,
  useGetStatusStatsQuery,
} = grantProviderApi;
