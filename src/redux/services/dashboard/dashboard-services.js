// userAPI.js

// Import axios or any other HTTP client library you prefer
import axios from "axios";
import mockCustomers from "../../../mocks/customers.json";
// Define your base API URL
const baseURL = "http://15.206.203.204/api/v1";
const getAllAplicants = "/applicants/";
const updateCustomer = "/customers";
const  getLoanEndpoint = "/loan_details";
const uploadDocument ="/upload_document";

// Create an instance of axios with the base URL set
const api = axios.create({
  baseURL,
});

export const simpleHeaders = (token)=>{
  return {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization":`Bearer ${token}`,
    },
  };
}

export const formHeaders = (token)=>{
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization":`Bearer ${token}`
    },
  };
}
// Define functions to interact with the user-related endpoints
export const dashboardAPI = {
  // Function to fetch
  fetchApplicantDataApi: async (payload) => {
    console.log("payloaddash: ", payload);
    try {
      // Make a GET request to fetch user by ID
      const url = `${baseURL}${getAllAplicants}`;
      const response = await axios.get(`${url}`, simpleHeaders(payload.token));

      // Return the response data

      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchCustomersByApplicantIdDataApi: async (payload) => {
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${updateCustomer}?application_id=${application_id}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchLoanDataApi: async (payload) => {
    const {application_id,token} = payload
    try {
      // Make a GET request to fetch user by ID
      const url = `${baseURL}${getLoanEndpoint}?application_id=${application_id}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
  fetchDocumentDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
  fetchPhotographDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
  fetchCollateralDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
  fetchCafDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  //update apis
  updateCustomerDataApi: async (payload) => {
    const { bodyFormData, token, cif_id } = payload;
    try {
     
      const response = await api.put(
        `${baseURL}${updateCustomer}?customer_id=${cif_id}`,
        bodyFormData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      return error;
    }
  },

  updateLoanDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
    try {
      const response = await api.post(
        `${baseURL}${getLoanEndpoint}`,
        bodyFormData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  updateDocumentDataApi: async (payload) => {
    const {formData,token} = payload
    try {
      const response = await api.post(
        `${baseURL}${uploadDocument}`,
        formData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  updatePhotographDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(`${baseURL}`, payload, formHeaders);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  updateCollateralDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(`${baseURL}`, payload, formHeaders);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
  updateCafDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(`${baseURL}`, payload, formHeaders);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },
};
