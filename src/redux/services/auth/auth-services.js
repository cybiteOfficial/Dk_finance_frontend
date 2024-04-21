// userAPI.js

// Import axios or any other HTTP client library you prefer
import axios from "axios";
import mockData from "../../../mocks/data.json";

// Define your base API URL
const baseURL = "https://api.example.com";

// Create an instance of axios with the base URL set
const api = axios.create({
  baseURL,
});

// Define functions to interact with the user-related endpoints
export const authAPI = {
  // Function to fetch user by ID
  loginUserApi: async (payload) => {
    console.log("payload: ", payload);
    try {
      // Make a GET request to fetch user by ID
      const response = await api.post(
        "https://jsonplaceholder.typicode.com/posts",
        { title: "foo", body: "bar", userId: 1 },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      return {
        data:mockData
      }
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
      throw error;
    }
  },
  // Add more functions for other user-related operations if needed
};
