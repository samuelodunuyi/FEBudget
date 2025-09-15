import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['User', 'Department'],
  endpoints: (builder) => ({
    // ---------------- USER ----------------
    getUserDetails: builder.query({
      query: () => ({
        url: `api/v1/User/me`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getUserMe: builder.mutation({
      query: () => ({
        url: `api/v1/User/me`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),

    // User POST (schema: { name, email, phoneNumber, address, role, departmentId })
    createUser: builder.mutation({
      query: (body: {
        name: string;
        email: string;
        phoneNumber: string;
        address: string;
        role: number;
        departmentId: string;
      }) => ({
        url: `api/v1/User`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUsers: builder.query({
      query: (params) => ({
        url: `api/v1/User`,
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query({
      query: (id: string) => ({
        url: `api/v1/User/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/v1/User/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `api/v1/User/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    getUserActivities: builder.query({
      query: (params) => ({
        url: `api/v1/useractivities`,
        method: 'GET',
        params,
      }),
    }),

    // ---------------- DEPARTMENT ----------------
    createDepartment: builder.mutation({
      query: (body: {
        name: string;
        description: string;
        code: string;
      }) => ({
        url: `api/v1/department`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Department'],
    }),

    getDepartments: builder.query({
      query: (params) => ({
        url: `api/v1/department`,
        method: 'GET',
        params,
      }),
      providesTags: ['Department'],
    }),

    getDepartmentById: builder.query({
      query: (id: string) => ({
        url: `api/v1/department/${id}`,
        method: 'GET',
      }),
      providesTags: ['Department'],
    }),

    updateDepartment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `api/v1/department/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Department'],
    }),

    deleteDepartment: builder.mutation({
      query: (id: string) => ({
        url: `api/v1/department/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),

    getAllDepartments: builder.query({
      query: () => ({
        url: `api/v1/department/all`,
        method: 'GET',
      }),
      providesTags: ['Department'],
    }),
  }),
});

export const {
  // User hooks
  useGetUserDetailsQuery,
  useGetUserMeMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserActivitiesQuery,

  // Department hooks
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
} = userApi;
