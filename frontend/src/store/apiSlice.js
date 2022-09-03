import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/config';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => '/post',
    }),
    getPostById: build.query({
      query: (postId) => ({ url: `post/${postId}` }),
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: '/post',
        method: 'POST',
        body,
      }),
    }),
    updatePost: build.mutation({
      query: (options) => ({
        url: `/post/${options.postId}`,
        method: 'PATCH',
        body: options.body,
      }),
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
