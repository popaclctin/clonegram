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
  tagtypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => '/post',
      providesTags: (result = [], error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
      ],
    }),
    getPostById: build.query({
      query: (postId) => ({ url: `post/${postId}` }),
      providesTags: (result = [], error, postId) => [
        { type: 'Post', id: postId },
      ],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: '/post',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    editPost: build.mutation({
      query: (options) => ({
        url: `/post/${options.postId}`,
        method: 'PATCH',
        body: options.body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `/post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, postId) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: postId },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
} = apiSlice;
