// userAPI.js

// Import axios or any other HTTP client library you prefer
import axios from 'axios';

// Define your base API URL
const baseURL = 'https://api.example.com';

// Create an instance of axios with the base URL set
const api = axios.create({
  baseURL,
});

// Define functions to interact with the user-related endpoints
export const dashboardAPI = {
  // Function to fetch user by ID
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
  // Add more functions for other user-related operations if needed
};
