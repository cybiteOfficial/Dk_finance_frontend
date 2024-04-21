// reducers.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {dashboardAPI} from "../../services/dashboard/dashboard-services"

const initialState = {
  applicantData:[]
};

const fetchApplicantDataThunk = createAsyncThunk(
    '/fetchApplicantData',
    async (payload, thunkAPI) => {
      const response = await dashboardAPI.fetchApplicantDataApi(payload)
      return response.data
    },
  );

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchApplicantDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
     
    })
  },
});

export const { } = dashboardSlice.actions;

export default dashboardSlice.reducer;
