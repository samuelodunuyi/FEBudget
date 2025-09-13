import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const approvalApi = createApi({
  reducerPath: 'approvalApi',
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
  tagTypes: ['Approval'],
  endpoints: (builder) => ({
    getPendingApprovals: builder.query({
      query: () => ({
        url: `api/v1/Approval/pending`,
        method: 'GET',
      }),
      providesTags: ['Approval'],
    }),

    getApprovalById: builder.query({
      query: (id) => ({
        url: `api/v1/Approval/${id}/pending`,
        method: 'GET',
      }),
      providesTags: ['Approval'],
    }),

    approvalAction: builder.mutation({
      query: (body) => ({
        url: `api/v1/Approval/action`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Approval'],
    }),
  }),
});

export const {
  useGetPendingApprovalsQuery,
  useApprovalActionMutation,
  useGetApprovalByIdQuery,
} = approvalApi;
