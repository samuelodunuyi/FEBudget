import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const budgetLineApi = createApi({
  reducerPath: 'budgetLineApi',
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
  tagTypes: ['BudgetLine'],
  endpoints: (builder) => ({
    createBudgetLine: builder.mutation({
      query: (body) => ({
        url: `api/v1/BudgetLine`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BudgetLine'],
    }),

    getBudgetLines: builder.query({
      query: (params) => ({
        url: `api/v1/BudgetLine`,
        method: 'GET',
        params,
      }),
      providesTags: ['BudgetLine'],
    }),

    getBudgetLine: builder.query({
      query: (id) => ({
        url: `api/v1/BudgetLine/${id}`,
        method: 'GET',
      }),
      providesTags: ['BudgetLine'],
    }),

    updateBudgetLine: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/BudgetLine/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['BudgetLine'],
    }),

    deleteBudgetLine: builder.mutation({
      query: (id) => ({
        url: `api/v1/BudgetLine/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BudgetLine'],
    }),
  }),
});

export const {
  useCreateBudgetLineMutation,
  useGetBudgetLinesQuery,
  useGetBudgetLineQuery,
  useUpdateBudgetLineMutation,
  useDeleteBudgetLineMutation,
} = budgetLineApi;
