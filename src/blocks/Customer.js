import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Paper, Grid,  Pagination,Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StyledTypography } from "../components/Common";
import { theme } from "../theme";
import SnackToast from "../components/Snackbar";
import {fetchApplicantDataThunk, fetchCustomersByApplicantIdDataThunk,fileForwardedThunk,removeCustomer,setCustomer} from "../redux/reducers/dashboard/dashboard-reducer"

// Import JSON data using require()
const jsonData = require("../mocks/customers.json");

export const Customers = () => {
  const token = useSelector((state) => state.authReducer.access_token);
  const { appId } = useSelector((state) => state.authReducer);
  const { customerDetails,applicantData} = useSelector((state) => state.dashboardReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [page, setPage] = useState(1); // State to manage current page
  const itemsPerPage = 20; // Assuming 20 items per page
  const [totalPages ,setTotalPages]=useState(0);
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });

  const handleNavigate = (url) => {
    navigate(url);
  };
  const handleGoBack = () => {
    navigate("/dashboard");
  };

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  const addForm = () => {
    const item = {
      "title": "",
      "firstName": "",
      "middle_name": "",
      "lastName": "",
      "dateOfBirth": "",
      "age": "",
      "sourceOfIncome": "",
      "monthlyIncome": "",
      "monthlyFamilyIncome": "",
      "residenceOwnership": "",
      "agriculturalLand": "",
      "valueOfAgriculturalLand": "",
      "earningsFromAgriculturalLand": "",
      "educationQualification": "",
      "numberOfDependents": "",
      "gender": "",
      "customerSegment": "",
     
    }
    const address =  {
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      state: "",
      district: "",
      city: "",
      tehsil_or_taluka: "",
      pincode: "",
      landmark: "",
      residence_state: "",
      residence_type: "",
      stability_at_residence: "",
      distance_from_branch: "",
    }
    const data ={
      customer_data:item,
      current_address:address,
      permanent_address:address
    }
    dispatch(setCustomer({selectedCustomer:{item,data},type:"setCustomer"}));
    navigate("/applicant/customer/details");
  };
  
  const editForm = (item) => {
    const address =  {
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      state: "",
      district: "",
      city: "",
      tehsil_or_taluka: "",
      pincode: "",
      landmark: "",
      residenceState: "",
      residence_type: "",
      stability_at_residence: "",
      distance_from_branch: "",
    }
    const data ={
      customer_data:{item},
      current_address:address,
      permanent_address:address
    }
    dispatch(setCustomer({selectedCustomer:{item,data},type:"setCustomer"}));
    navigate("/applicant/customer/details");
  };

  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({
      loading,
      errMsg,
      openSnack,
      severity,
    });
  };

  useEffect(() => {
    const fetchCustomers = async () => getCustomersApi();
    fetchCustomers();
   
  }, [page]); 

  const getCustomersApi = async () => {
    
    setErrState(true, "", false, "");
    const payload = {application_id:appId,token,page}
    try {
      const response = await dispatch(
        fetchCustomersByApplicantIdDataThunk(payload)
      );
      // where is err and msg
      const { results, error, message ,count} = response.payload;
      if (error) {
        return setErrState(false, message, true, "error");
      }
      if (results && results.length > 0) {
        const totalPages = Math.ceil(count / itemsPerPage);
        setTotalPages(totalPages)
        setErrState(false, "Fetched successfully.", true, "success");
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  
  const updateStatusDataApi = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("applications_ids", JSON.stringify([appId]));
    const payload = { bodyFormData, token };
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fileForwardedThunk(payload));
      const { error, message, code } = response.payload;
      if (code) {
        return setErrState(
          false,
          response.payload.response.data.message,
          true,
          "error"
        );
      }else{
        getApplicantsApi();
        setErrState(false, message, true, "success");
      }
     
    } catch (error) {
     
      setErrState(false, "", false, "success");
      console.error("error: ", error);
    }
  };

  const getApplicantsApi = async () => {
    setErrState(true, "", false, "");
    const payload = { application_id: appId, token }; 
    try {
      await dispatch(fetchApplicantDataThunk(payload));
    } catch (error) {}
  };

  const handleCloseToast = () => {
    setErrState(false, "", false, ""); // Resetting the error state to close the toast
  };
  return (
    <>
      <SnackToast
        onClose={handleCloseToast}
        openSnack={err.openSnack}
        message={err.errMsg}
        severity={err.severity}
      />
      <Box width={"90%"} margin={"13vh auto 0 auto"}>
        <Button
          onClick={handleGoBack}
          startIcon={<ArrowBack />}
          variant="contained"
          style={{ marginBottom: 20 }}
        >
          GO BACK
        </Button>

        <Box display={"flex"}>
          <StyledTypography variant="subtitle1" weight={700}>
            Application ID: {appId}
          </StyledTypography>

        {customerDetails.length > 0 &&  <Button
            disabled={
              applicantData[0]?.status === "cluster" ||
              process.env.REACT_APP_DISABLED === "TRUE"
            }
            onClick={updateStatusDataApi}
            variant="outlined"
            style={{ marginBottom: 20, marginLeft: "auto" }}
          >
            {applicantData[0]?.status === "md_phase"
              ? "Sanction"
              : applicantData[0]?.status === "cluster"
              ? "Approved"
              :  "Forward" }
          </Button>}
        </Box>

        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
              gap: "1rem",
            }}
          >
            <Button
              disabled={process.env.REACT_APP_DISABLED === "TRUE"}
              style={{
                backgroundColor:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.12)"
                    : theme.palette.primary.main,
                color:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.26)"
                    : theme.palette.white.main,
              }}
              onClick={() => handleNavigate("/applicant/loan")}
            >
              Loan Details
            </Button>
            <Button
              disabled={process.env.REACT_APP_DISABLED === "TRUE"}
              style={{
                backgroundColor:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.12)"
                    : theme.palette.primary.main,
                color:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.26)"
                    : theme.palette.white.main,
              }}
              onClick={() => handleNavigate("/applicant/document/uploads")}
            >
              Document Upload
            </Button>
            <Button
              disabled={process.env.REACT_APP_DISABLED === "TRUE"}
              style={{
                backgroundColor:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.12)"
                    : theme.palette.primary.main,
                color:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.26)"
                    : theme.palette.white.main,
              }}
              onClick={() => handleNavigate("/applicant/photographs/uploads")}
            >
              Photograph Upload
            </Button>
            <Button
              disabled={process.env.REACT_APP_DISABLED === "TRUE"}
              style={{
                backgroundColor:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.12)"
                    : theme.palette.primary.main,
                color:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.26)"
                    : theme.palette.white.main,
              }}
              onClick={() => handleNavigate("/applicant/collateral")}
            >
              Collateral Details
            </Button>
            <Button
              disabled={process.env.REACT_APP_DISABLED === "TRUE"}
              style={{
                backgroundColor:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.12)"
                    : theme.palette.primary.main,
                color:
                  process.env.REACT_APP_DISABLED === "TRUE"
                    ? "rgba(0, 0, 0, 0.26)"
                    : theme.palette.white.main,
              }}
              onClick={() => handleNavigate("/applicant/customer/application")}
            >
              Customer Application Form
            </Button>
          </div>
        </Box>
        <Box>
          <Button
            onClick={addForm}
            variant="outlined"
            style={{ marginBottom: 20 }}
          >
            Add Customer
          </Button>
        </Box>
      </Box>

      <Paper
        style={{
          width: "90%",
          overflowX: "auto",
          height: 400,
          margin: "auto",
          position: "relative",
          marginBottom: "1rem",
        }}
      >
        <Grid
          container
          style={{
            backgroundColor: "#f5f5f5",
            padding: 10,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}>
            <Typography variant="subtitle1">Customer Id</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1">Role</Typography>
          </Grid>
        
        </Grid>
        <div>
          {customerDetails &&
            customerDetails.length > 0 &&
            customerDetails?.map((item, index) => (
              <Grid
                key={item.uuid}
                container
                style={{
                  padding: 10,
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f9f9f9" : "#ffffff")
                }
                onClick={() => editForm(item)}
              >
                <Grid item xs={2}>
                  <Typography variant="body1">{item?.cif_id}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">
                    {item?.firstName} {item?.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="subtitle1"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.role}
                  </Typography>
                </Grid>
                
              </Grid>
            ))}
        </div>
      </Paper>

      <Box width={"90%"} margin={"auto"}>
        <Stack spacing={2}>
          <Pagination
            style={{ margin: "0 0 2rem auto" }}
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
          />
        </Stack>
      </Box>
    </>
  );
};
