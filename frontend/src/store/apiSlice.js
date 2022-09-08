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
  tagtypes: ['Post', 'Like', 'Comment'],
  endpoints: (build) => ({
    getPostsByUsername: build.query({
      query: (username) => ({ url: `${username}` }),
      providesTags: (result = { posts: [] }, error, arg) => [
        { type: 'Post', id: 'LIST' },
        ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
      ],
    }),
    getPostById: build.query({
      query: (postId) => ({ url: `posts/${postId}` }),
      providesTags: (result = [], error, postId) => [
        { type: 'Post', id: postId },
      ],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    editPost: build.mutation({
      query: (options) => ({
        url: `posts/${options.postId}`,
        method: 'PATCH',
        body: options.body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Post', id: arg.postId },
      ],
    }),
    deletePost: build.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, postId) => [
        { type: 'Post', id: 'LIST' },
        { type: 'Post', id: postId },
      ],
    }),
    getFeed: build.query({
      query: () => 'feed',
      providesTags: (result = { posts: [] }, error) => [
        { type: 'Post', id: 'LIST' },
        ...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })),
      ],
    }),
    followUser: build.mutation({
      query: (username) => ({
        url: `${username}/follow`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    unfollowUser: build.mutation({
      query: (username) => ({
        url: `${username}/follow`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
    searchUser: build.query({
      query: (searchTerm) => ({ url: `search`, params: { query: searchTerm } }),
    }),
    getPostLikes: build.query({
      query: (params) => ({ url: `likes`, params }),
      providesTags: ['Like'],
    }),
    createPostLike: build.mutation({
      query: (body) => ({
        url: 'likes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Like'],
    }),
    deleteLike: build.mutation({
      query: (likeId) => ({
        url: `likes/${likeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Like'],
    }),
    getComments: build.query({
      query: (params) => ({ url: `comments`, params }),
      providesTags: ['Comment'],
    }),
    createComment: build.mutation({
      query: (body) => ({ url: 'comments', method: 'POST', body }),
      invalidatesTags: ['Comment'],
    }),
    deleteComment: build.mutation({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetPostsByUsernameQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetFeedQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useSearchUserQuery,
  useGetPostLikesQuery,
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = apiSlice;
