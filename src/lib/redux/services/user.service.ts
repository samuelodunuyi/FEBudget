import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const userApi = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: `api/v1/User/me`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getUserMe: builder.mutation({
      query: (email) => ({
        url: `api/v1/User/me`,
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    createUser: builder.mutation({
      query: (body) => ({
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
      query: (id) => ({
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
      query: (id) => ({
        url: `api/v1/User/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    getUserDetailsLogin: builder.mutation({
      query: () => ({
        url: `api/Auth/user-details`,
        method: 'POST',
      }),
    }),

    getUserActivities: builder.query({
      query: (params) => ({
        url: `api/v1/useractivities`,
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useGetUserMeMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserDetailsLoginMutation,
  useGetUserActivitiesQuery,
} = userApi;
