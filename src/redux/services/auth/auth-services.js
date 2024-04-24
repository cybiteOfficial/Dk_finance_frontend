
import axios from "axios";
import mockData from "../../../mocks/data.json";

// Define your base API URL
export const baseURL = "http://3.111.52.245:8000/api/v1";

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
        {
          title: "New Post Title",
          body: "This is the body of the new post.",
          userId: 1,
        },
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
