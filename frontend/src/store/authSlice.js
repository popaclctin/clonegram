import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signup: build.mutation({
      query: (body) => ({ url: '/auth/signup', method: 'POST', body }),
    }),
  }),
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const {
        payload: { user, token },
      } = action;
      state.user = user;
      state.token = token;
    },
    resetCredentials: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      extendedApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        const {
          payload: { user, token },
        } = action;
        state.token = token;
        state.user = user;
      }
    );
  },
});

export const { useLoginMutation, useSignupMutation } = extendedApiSlice;

export const { setCredentials, resetCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
