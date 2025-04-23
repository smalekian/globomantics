import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthPayload } from '../service/generated';

type AuthState = {
  user: AuthPayload['user'] | null;
  token?: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    removeCredentials: (state) => {
      state.token = null;
      state.user = null;
    },
    setCredentials: (state, { payload }: PayloadAction<AuthPayload>) => {
      state.token = payload.token;
      state.user = payload.user;
    },
  },
});

export default slice.reducer;

export const { removeCredentials, setCredentials } = slice.actions;
