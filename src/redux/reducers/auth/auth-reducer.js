// reducers.js
import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI} from "../../services/auth/auth-services"


export const loginUserThunk = createAsyncThunk(
  '/loginUser',
  async (payload) => {
    const response = await authAPI.loginUserApi(payload)
    console.log('responseauth: ', response);
    return response; 
  },
);

const initialState = {
  loggedIn: false,
  userInfo: null,
  appId:"",
  access_token:"",
  uuid:""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppId(state, action) {
      state.appId = action.payload.appId.app_id;
      state.uuid = action.payload.appId.uuid;
    },
    logout(state) {
      state.loggedIn = false;
      state.userInfo = null;
      state.appId=""
      state.access_token=""
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log('action: ', action);
      state.userInfo = [];
      state.loggedIn = true;
      state.access_token=action.payload.data.access_token
    });
  },
});

export const { setAppId, logout } = authSlice.actions;

export default authSlice.reducer;
