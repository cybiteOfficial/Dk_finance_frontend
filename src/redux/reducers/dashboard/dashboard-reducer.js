// reducers.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardAPI } from "../../services/dashboard/dashboard-services";

const initialState = {
  applicantData: [],
  loanDetails: [],
  documentDetails: [],
  photographDetails: [],
  collateralDetails: [],
  cafDetails: [],
};

export  const fetchApplicantDataThunk = createAsyncThunk(
  "/fetchApplicantData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchApplicantDataApi(payload);
    return response.data;
  }
);
export  const fetchLoanDataThunk = createAsyncThunk(
  "/fetchLoanData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchLoanDataApi(payload);
    return response.data;
  }
);
export  const fetchDocumentDataThunk = createAsyncThunk(
  "/fetchDocumentData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchDocumentDataApi(payload);
    return response.data;
  }
);
export  const fetchPhotographDataThunk = createAsyncThunk(
  "/fetchPhotographData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchPhotographDataApi(payload);
    return response.data;
  }
);
export  const fetchCollateralDataThunk = createAsyncThunk(
  "/fetchCollateralData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCollateralDataApi(payload);
    return response.data;
  }
);
export  const fetchCafDataThunk = createAsyncThunk(
  "/fetchCafData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCafDataApi(payload);
    return response.data;
  }
);

//update thunks
export const updateLoanDataThunk = createAsyncThunk(
  "/updateLoanData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateLoanDataApi(payload);
    return response.data;
  }
);
export const updateDocumentDataThunk = createAsyncThunk(
  "/updateDocumentData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateDocumentDataApi(payload);
    return response.data;
  }
);
export const updatePhotographDataThunk = createAsyncThunk(
  "/updatePhotographData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updatePhotographDataApi(payload);
    return response.data;
  }
);
export const updateCollateralDataThunk = createAsyncThunk(
  "/updateCollateralData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateCollateralDataApi(payload);
    return response.data;
  }
);
export const updateCafDataThunk = createAsyncThunk(
  "/updateCafData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateCafDataApi(payload);
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchApplicantDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
    });
  },
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
