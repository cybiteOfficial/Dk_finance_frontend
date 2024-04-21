// reducers.js
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI} from "../../services/auth/auth-services"


export const loginUserThunk = createAsyncThunk(
  '/loginUser',
  async (payload) => {
    const response = await authAPI.loginUserApi(payload)
    console.log('responseauth: ', response);
    return response.data; 
  },
);

const initialState = {
  loggedIn: false,
  userInfo: null,
  appId:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppId(state, action) {
      state.appId = action.payload.appId;
    },
    logout(state) {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loggedIn = true;
    });
  },
});

export const { setAppId, logout } = authSlice.actions;

export default authSlice.reducer;
