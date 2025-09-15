import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const BudgetApi = createApi({
  reducerPath: 'BudgetApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Budget'],
  endpoints: (builder) => ({
    createBudget: builder.mutation<any, { 
      Year: number; 
      File: File; 
      Narration: string; 
      DepartmentId: string; 
    }>({
      query: ({ Year, File, Narration, DepartmentId }) => {
        const formData = new FormData();
        formData.append("Year", Year.toString());
        formData.append("File", File);
        formData.append("Narration", Narration);
        formData.append("DepartmentId", DepartmentId);

        return {
          url: "/api/v1/Budget",
          method: "POST",
          body: formData,
          headers: {},
        };
      },
      invalidatesTags: ['Budget'],
    }),

    getBudgets: builder.query({
      query: (params) => ({
        url: `api/v1/Budget`,
        method: 'GET',
        params,
      }),
      providesTags: ['Budget'],
    }),

    getBudget: builder.query({
      query: (id) => ({
        url: `api/v1/Budget/${id}`,
        method: 'GET',
      }),
      providesTags: ['Budget'],
    }),

    updateBudget: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/Budget/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Budget'],
    }),

    deleteBudget: builder.mutation({
      query: (id) => ({
        url: `api/v1/Budget/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Budget'],
    }),

    // ✅ New endpoint for approving/revoking budget
    approveBudget: builder.mutation({
      query: ({ id, isApproval }: { id: string; isApproval: boolean }) => ({
        url: `/api/v1/Budget/${id}/action`,
        method: 'POST',
        params: { isApproval },
      }),
      invalidatesTags: ['Budget'],
    }),
  }),
});

export const {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useApproveBudgetMutation, // <--- added hook
} = BudgetApi;
