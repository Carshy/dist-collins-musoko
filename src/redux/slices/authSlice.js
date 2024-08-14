import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define the async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://kcb-boma-yangu-backend-kcb-boma-yangu.apps.dev.aro.kcbgroup.com/api/users/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: 'BomaPortalClient',
            password: 'cbfbd0ab-2876-442b-a3c8-8aed9632ba83',
          },
        }
      );

      // Assuming the response contains the JWT token and user information
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
