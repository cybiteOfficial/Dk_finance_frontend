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
  customerDetails:[],
  selectedCustomer:{}
}

export  const fetchApplicantDataThunk = createAsyncThunk(
  "/fetchApplicantData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchApplicantDataApi(payload);
    return response;
  }
);

export  const fetchCustomersByApplicantIdDataThunk = createAsyncThunk(
  "/fetchCustomersByApplicantIdData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCustomersByApplicantIdDataApi(payload);
    return response;
  }
);
export  const fetchLoanDataThunk = createAsyncThunk(
  "/fetchLoanData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchLoanDataApi(payload);
    return response;
  }
);
export  const fetchDocumentDataThunk = createAsyncThunk(
  "/fetchDocumentData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchDocumentDataApi(payload);
    return response;
  }
);
export  const fetchPhotographDataThunk = createAsyncThunk(
  "/fetchPhotographData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchPhotographDataApi(payload);
    return response;
  }
);
export  const fetchCollateralDataThunk = createAsyncThunk(
  "/fetchCollateralData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCollateralDataApi(payload);
    return response;
  }
);
export  const fetchCafDataThunk = createAsyncThunk(
  "/fetchCafData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCafDataApi(payload);
    return response;
  }
);

//update thunks
export const updateCustomerDataThunk = createAsyncThunk(
  "/updateCustomerData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateCustomerDataApi(payload);
    return response;
  }
);

export const updateLoanDataThunk = createAsyncThunk(
  "/updateLoanData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateLoanDataApi(payload);
    return response;
  }
);
export const updateDocumentDataThunk = createAsyncThunk(
  "/updateDocumentData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateDocumentDataApi(payload);
    return response;
  }
);
export const updatePhotographDataThunk = createAsyncThunk(
  "/updatePhotographData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updatePhotographDataApi(payload);
    return response;
  }
);
export const updateCollateralDataThunk = createAsyncThunk(
  "/updateCollateralData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateCollateralDataApi(payload);
    return response;
  }
);
export const updateCafDataThunk = createAsyncThunk(
  "/updateCafData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.updateCafDataApi(payload);
    return response;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setCustomer(state,action){
      state.selectedCustomer = action.payload.selectedCustomer
    },
    removeCustomer(state,action){
      state.selectedCustomer = []
    },
    removeStore(state) {
      state.applicantData = [];
      state.customerDetails = [];
      state.selectedCustomer=""
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchApplicantDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('actionDash: ', action);
      state.applicantData = action.payload.results
      
    });
    builder.addCase(fetchCustomersByApplicantIdDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('actioncUSTOEMR: ', action);
      state.customerDetails = action.payload.results
    });

    builder.addCase(fetchLoanDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('actionLoan ', action);
      state.loanDetails = action.payload.data
    });
  },
});

export const {setCustomer,removeCustomer,removeStore} = dashboardSlice.actions;

export default dashboardSlice.reducer;
