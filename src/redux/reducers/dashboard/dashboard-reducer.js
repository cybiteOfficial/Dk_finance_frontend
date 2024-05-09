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
  customerDetails: [],
  allCustomers:[],
  selectedCustomer: {},
  selectedCustomerData: {},
};

export const fetchApplicantDataThunk = createAsyncThunk(
  "/fetchApplicantData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchApplicantDataApi(payload);
    return response;
  }
);

export const fetchCustomerByApplicantIdDataThunk = createAsyncThunk(
  "/fetchCustomerByApplicantIdData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCustomerByApplicantIdDataApi(
      payload
    );
    return response;
  }
);

export const fetchCustomersByApplicantIdDataThunk = createAsyncThunk(
  "/fetchCustomersByApplicantIdData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCustomersByApplicantIdDataApi(
      payload
    );
    return response;
  }
);

export const fetchAllCustomersByApplicantIdDataThunk = createAsyncThunk(
  "/fetchAllCustomersByApplicantIdData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchAllCustomersByApplicantIdDataApi(
      payload
    );
    return response;
  }
);
export const fetchLoanDataThunk = createAsyncThunk(
  "/fetchLoanData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchLoanDataApi(payload);
    return response;
  }
);
export const fetchDocumentDataThunk = createAsyncThunk(
  "/fetchDocumentData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchDocumentDataApi(payload);
    return response;
  }
);
export const fetchPhotographDataThunk = createAsyncThunk(
  "/fetchPhotographData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchPhotographDataApi(payload);
    return response;
  }
);
export const fetchCollateralDataThunk = createAsyncThunk(
  "/fetchCollateralData",
  async (payload, thunkAPI) => {
    const response = await dashboardAPI.fetchCollateralDataApi(payload);
    return response;
  }
);
export const fetchCafDataThunk = createAsyncThunk(
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
    setCustomer(state, action) {
      state.selectedCustomer = action.payload.selectedCustomer.item;
      state.selectedCustomerData = action.payload.selectedCustomer.data;
    },
    removeCustomer(state, action) {
      state.selectedCustomer = [];
    },
    removeCustomerData(state, action) {
      state.selectedCustomerData = [];
    },
    removeLoan(state, action) {
      state.loanDetails = [];
    },
    removeCollateral(state, action) {
      state.collateralDetails = [];
    },
    removeApplicant(state, action) {
      state.applicantData = [];
    },
    removeCaf(state, action) {
      state.cafDetails = [];
    },
    removeDocs(state, action) {
      state.documentDetails = [];
    },
    removePhotos(state, action) {
      state.photographDetails = [];
    },

    removeStore(state) {
      state.applicantData = [];
      state.customerDetails = [];
      state.loanDetails = [];
      state.collateralDetails = [];
      state.cafDetails = [];
      state.documentDetails = [];
      state.photographDetails = [];
      state.selectedCustomer = "";
      state.selectedCustomerData = "";
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchApplicantDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("actionDash: ", action);
      state.applicantData = action.payload.results;
    });

    builder.addCase(
      fetchCustomerByApplicantIdDataThunk.fulfilled,
      (state, action) => {
        // Add user to the state array
        
        state.selectedCustomerData = action.payload.data;
      }
    );
    builder.addCase(
      fetchCustomersByApplicantIdDataThunk.fulfilled,
      (state, action) => {
        // Add user to the state array
        console.log("actioncUSTOEMR: ", action);
        state.customerDetails = action.payload.results;
      }
    );
    builder.addCase(
      fetchAllCustomersByApplicantIdDataThunk.fulfilled,
      (state, action) => {
       
        state.allCustomers = action.payload.data;
      }
    );
    builder.addCase(fetchCollateralDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("actionColla: ", action);
      state.collateralDetails = action.payload.data;
    });

    builder.addCase(updateCollateralDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("actionColla: ", action);
      state.collateralDetails = [action.payload.data];
    });
    builder.addCase(fetchCafDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      
      state.cafDetails = [action.payload.data];
    });
    builder.addCase(updateCafDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("actionCaf: ", action);
     
    });
    builder.addCase(fetchLoanDataThunk.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("actionLoan ", action);
      state.loanDetails = action.payload.data;
    });
  },
});

export const {
  setCustomer,
  removeCustomer,
  removeStore,
  removeApplicant,
  removeCaf,
  removeCollateral,
  removeDocs,
  removeLoan,
  removePhotos,
  removeCustomerData
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
