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
  tagtypes: ['Post', 'Like', 'Comment', 'Follow'],
  endpoints: (build) => ({
    getUserPosts: build.query({
      query: (userId) => ({ url: `user/${userId}/posts` }),
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
        body: { caption: options.caption },
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
    getFollow: build.query({
      query: ({ userId, followeeId }) => ({
        url: `user/${userId}/follows`,
        params: { followeeId },
      }),
      providesTags: ['Follow'],
    }),
    getFollowers: build.query({
      query: (userId) => ({
        url: `user/${userId}/followers`,
      }),
      providesTags: ['Follow'],
    }),
    getFollowing: build.query({
      query: (userId) => ({
        url: `user/${userId}/following`,
      }),
      providesTags: ['Follow'],
    }),
    createFollow: build.mutation({
      query: (body) => ({
        url: 'follows',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }, 'Follow'],
    }),
    deleteFollow: build.mutation({
      query: (followId) => ({
        url: `follows/${followId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }, 'Follow'],
    }),
    searchUser: build.query({
      query: (searchTerm) => ({ url: `search`, params: { query: searchTerm } }),
    }),
    getPostLikes: build.query({
      query: (postId) => ({ url: `posts/${postId}/likes` }),
      providesTags: ['Like'],
    }),
    getLike: build.query({
      query: ({ userId, postId }) => ({
        url: `user/${userId}/liked`,
        params: { postId },
      }),
      providesTags: ['Like'],
    }),
    createLike: build.mutation({
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
    getPostComments: build.query({
      query: (postId) => ({ url: `posts/${postId}/comments` }),
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
    getUserByUsername: build.query({
      query: (username) => ({ url: `user/${username}` }),
    }),
  }),
});

export const {
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetFeedQuery,
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useSearchUserQuery,
  useGetPostLikesQuery,
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetUserByUsernameQuery,
  useGetLikeQuery,
  useGetFollowQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
} = apiSlice;
