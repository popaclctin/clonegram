import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

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
      apiSlice.endpoints.login.matchFulfilled,
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

export const { setCredentials, resetCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
