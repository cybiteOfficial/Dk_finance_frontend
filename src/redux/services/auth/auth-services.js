import axios from "axios";
import mockData from "../../../mocks/data.json";

// Define your base API URL
export const baseURL = "http://15.206.203.204";

// Create an instance of axios with the base URL set
const api = axios.create({
  baseURL,
});

// Define functions to interact with the user-related endpoints
export const authAPI = {
  // Function to fetch user by ID
  loginUserApi: async (payload) => {
  
    try {
     
      const response = await axios.post(`${baseURL}/auth/signin`, {...payload}, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // const data = {
      //   Error: false,
      //   data: {
      //     access_token: "mVDtoD8KzrQkp9foThQNkfq1GbqMxC",
      //     expires_in: 36000,
      //     token_type: "Bearer",
      //     scope: "read write groups",
      //     refresh_token: "RApn4Cwf9l76GYYwjRBS4GnKQPyz10",
      //   },
      //   message: "Successfully login.",
      // };
      return response.data;
    } catch (error) {
      // const err = {
      //   Error: true,
      //   message: "Invalid credentials",
      // };
      return error
    }
  },
  // Add more functions for other user-related operations if needed
};
