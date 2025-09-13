import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const requestApi = createApi({
  reducerPath: 'requestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Request'],
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (body) => ({
        url: `api/v1/ExpenseRequest`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    addExpense: builder.mutation({
      query: ({ expenseRequestId, body }) => ({
        url: `api/v1/ExpenseRequest/expense?expenseRequestId=${expenseRequestId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    updateRequest: builder.mutation({
      query: (body) => ({
        url: `api/v1/ExpenseRequest`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    addChatRequest: builder.mutation({
      query: (body) => ({
        url: `api/v1/ExpenseRequest/chat`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    getChatRequest: builder.query({
      query: (id) => ({
        url: `api/v1/ExpenseRequest/${id}/chat`,
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    updateChatRequest: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/ExpenseRequest/chat/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    deleteChatRequest: builder.mutation({
      query: (id) => ({
        url: `api/v1/ExpenseRequest/chat/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Request'],
    }),

    getRequest: builder.query({
      query: (id) => ({
        url: `api/v1/ExpenseRequest/${id}`,
        method: 'GET',
      }),
      providesTags: ['Request'],
    }),

    createExpense: builder.mutation({
      query: ({ expenseRequestId, body }) => ({
        url: `api/v1/ExpenseRequest/expense?expenseRequestId=${expenseRequestId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    updateExpense: builder.mutation({
      query: (body) => ({
        url: `api/v1/ExpenseRequest/expense`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    getRequests: builder.query({
      query: (params) => ({
        url: `api/v1/ExpenseRequest`,
        method: 'GET',
        params,
      }),
      providesTags: ['Request'],
    }),

    completeRequests: builder.mutation({
      query: (body) => ({
        url: `api/v1/ExpenseRequest/complete`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Request'],
    }),

    getDraftRequests: builder.query({
      query: (params) => ({
        url: `api/v1/ExpenseRequest/draft`,
        method: 'GET',
        params,
      }),
      providesTags: ['Request'],
    }),

    convertCurrency: builder.query({
      query: (params) => ({
        url: `api/v1/Currency/convert`,
        method: 'GET',
        params,
      }),
    }),

    getCurrencyOptions: builder.query({
      query: () => ({
        url: `api/v1/Currency/options`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useAddChatRequestMutation,
  useGetChatRequestQuery,
  useUpdateChatRequestMutation,
  useDeleteChatRequestMutation,
  useGetRequestQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useGetRequestsQuery,
  useCompleteRequestsMutation,
  useGetDraftRequestsQuery,
  useConvertCurrencyQuery,
  useGetCurrencyOptionsQuery,
} = requestApi;
