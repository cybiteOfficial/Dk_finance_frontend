// userAPI.js

// Import axios or any other HTTP client library you prefer
import axios from "axios";
import mockCustomers from "../../../mocks/customers.json";
// Define your base API URL
const baseURL = "http://13.232.141.127/api/v1";
const getAllAplicants = "/applicants/";
const updateCustomer = "/customers";  
const  getLoanEndpoint = "/loan_details";
const uploadDocument ="/upload_document";
const getCollateral = "/collateral_details"
const getCafDetail = "/caf_detail"
const updateStatus = '/update_status';
const printDocument="/print_document"

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

    try {
      // Make a GET request to fetch user by ID
      const getUrl = payload.application_id ? `${baseURL}${getAllAplicants}?application_id=${payload.application_id}`:`${baseURL}${getAllAplicants}?page=${payload.page}`;
      const url = getUrl
      const response = await axios.get(`${url}`, simpleHeaders(payload.token));

      // Return the response data

      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchCustomerByApplicantIdDataApi: async (payload) => {
    const { customer_id, token } = payload;
    try {
      const url = `${baseURL}${updateCustomer}?customer_id=${customer_id}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchPdfDataApi: async (payload) => {
    const { appId, token } = payload;
    try {
      const url = `${baseURL}${printDocument}?application_id=${appId}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchCustomersByApplicantIdDataApi: async (payload) => {
    const { application_id, token, page } = payload;
    try {
      const url = `${baseURL}${updateCustomer}?application_id=${application_id}&page=${page}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchAllCustomersByApplicantIdDataApi: async (payload) => {
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${updateCustomer}?application_id=${application_id}&is_all=True`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchLoanDataApi: async (payload) => {
    const { application_id, token } = payload;
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
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${uploadDocument}?application_id=${application_id}&document_type=other`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchPhotographDataApi: async (payload) => {
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${uploadDocument}?application_id=${application_id}&document_type=photos`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchCollateralDataApi: async (payload) => {
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${getCollateral}?application_id=${application_id}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchCafDataApi: async (payload) => {
    const { application_id, token } = payload;
    try {
      const url = `${baseURL}${getCafDetail}?application_id=${application_id}`;
      const response = await api.get(`${url}`, simpleHeaders(token));

      return response.data;
    } catch (error) {
      return error;
    }
  },

  //update apis
  updateCustomerDataApi: async (payload) => {
    const { bodyFormData, token, cif_id } = payload;
    let response;
    try {
      if (cif_id) {
        response = await api.put(
          `${baseURL}${updateCustomer}?customer_id=${cif_id}`,
          bodyFormData,
          formHeaders(token)
        );
      } else {
        response = await api.post(
          `${baseURL}${updateCustomer}`,
          bodyFormData,
          formHeaders(token)
        );
      }

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

  fileForwardedDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
    try {
      const response = await api.post(
        `${baseURL}${updateStatus}`,
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
    console.log('payload: ', payload);
    const { bodyFormData, token ,api} = payload;
   
    try {
      if (api === "post") {
        var response = await axios.post(
          `${baseURL}${uploadDocument}`,
          bodyFormData,
          formHeaders(token)
        );
        return response.data;
      } else if (api === "put") {
        var response = await axios.put(
          `${baseURL}${uploadDocument}`,
          bodyFormData,
          formHeaders(token)
        );
      } else {
        return;
      }
      return response.data;
      // Return the response data
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  deleteDocumentDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
   
    try {
      
      const response = await axios.delete(
        `${baseURL}${uploadDocument}`,
        {
          data: bodyFormData,
          headers: formHeaders(token).headers
        }
      );
     
      return response.data;
      // Return the response data
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  updatePhotographDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
    try {
      const response = await api.post(
        `${baseURL}${uploadDocument}`,
        bodyFormData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      // If an error occurs, throw it or handle it as needed
    }
  },

  updateCollateralDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
    try {
      const response = await api.post(
        `${baseURL}${getCollateral}`,
        bodyFormData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      return error;
    }
  },
  updateCafDataApi: async (payload) => {
    const { bodyFormData, token } = payload;
    try {
      const response = await api.post(
        `${baseURL}${getCafDetail}`,
        bodyFormData,
        formHeaders(token)
      );
      // Return the response data
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

