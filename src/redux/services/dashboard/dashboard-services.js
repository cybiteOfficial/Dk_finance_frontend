// userAPI.js

// Import axios or any other HTTP client library you prefer
import axios from "axios";

// Define your base API URL
const baseURL = "https://api.example.com";

// Create an instance of axios with the base URL set
const api = axios.create({
  baseURL,
});

export const simpleHeaders = {
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
};

export const formHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
// Define functions to interact with the user-related endpoints
export const dashboardAPI = {
  // Function to fetch 
  fetchApplicantDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
      throw error;
    }
  },
  fetchLoanDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.get(`/users/${payload}`);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  },

  //update apis
  updateLoanDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(`${baseURL}`, payload, simpleHeaders);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
      throw error;
    }
  },

  updateDocumentDataApi: async (payload) => {
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(`${baseURL}`, payload, formHeaders);
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
      throw error;
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
      throw error;
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
      throw error;
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
      throw error;
    }
  },
};
