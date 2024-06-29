import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Paper, Grid,  Pagination,Stack } from "@mui/material";
import PDFGenerator from '../components/PDFgenerator'; // Adjust path as necessary
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {pdf } from '@react-pdf/renderer';
import { StyledTypography, pdfData } from "../components/Common";
import { theme } from "../theme";
import SnackToast from "../components/Snackbar";
import { saveAs } from "file-saver";
import { checkTokenExpired } from "../components/Common";
import { removeStore } from "../redux/reducers/dashboard/dashboard-reducer";
import {fetchApplicantDataThunk, fetchCustomersByApplicantIdDataThunk,fetchPdfDataThunk,fileForwardedThunk,removeCustomer,setCustomer} from "../redux/reducers/dashboard/dashboard-reducer"
import MyDocument from "../components/MyDocument";

// Import JSON data using require()
// const jsonData = require("../mocks/customers.json");

export const Customers = () => {
 
  const token = useSelector((state) => state.authReducer.access_token);
  const { appId } = useSelector((state) => state.authReducer);
  const { customerDetails,applicantData} = useSelector((state) => state.dashboardReducer);

  const { pdfDetails } = useSelector((state) => state.dashboardReducer);

const data = applicantData.find((item) => {
   if(item.application_id == appId){
    return item
   }
  // return item
})
//  console.log(pdfDetails.loan_details)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    if (appId && token) {
      dispatch(fetchPdfDataThunk({ appId, token }));
    }
  }, [appId, token]);
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
      const { code,results, error, message ,count} = response.payload;
     
      if(code){
       checkTokenExpired(
         message,
         response,
         setErrState,
         dispatch,
         removeStore,
         navigate
       );
      }else if (error) {
       return setErrState(false, message, true, "error");
     }
 
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

  const downloadPdf = async () => {
console.log(pdfDetails)
    const fileName = "loan.pdf";
    const blob = await pdf(<MyDocument data={pdfDetails} />).toBlob();
    saveAs(blob, fileName);
  };
  
  const updateStatusDataApi = async () => {

    if (data.status === "sanctioned") {
      const payload = { appId, token };
      try {
        console.log(response.payload);
        setErrState(true, "", false, "");
        const response = await dispatch(fetchPdfDataThunk(payload));
        const { error, message, code } = response.payload;

        if (code) {
          return setErrState(
            false,
            response.payload.response.data.message,
            true,
            "error"
          );
        } else {
          downloadPdf();
          setErrState(false, message, true, "success");
        }
      } catch (error) {
        setErrState(false, "", false, "success");
        console.error("error: ", error);
      }
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append("applications_ids", JSON.stringify([appId]));
      const payload = { bodyFormData, token, appId };
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
        } else {
          getApplicantsApi();
          setErrState(false, message, true, "success");
        }
      } catch (error) {
        setErrState(false, "", false, "success");
        console.error("error: ", error);
      }
    }
  };

  const getApplicantsApi = async () => {
    setErrState(true, "", false, "");
    const payload = { application_id: appId, token }; 
    try {
     const response= await dispatch(fetchApplicantDataThunk(payload));
     
     const { error, message,code } = response.payload;
     if(code){
      checkTokenExpired(
        message,
        response,
        setErrState,
        dispatch,
        removeStore,
        navigate
      );
     }else if (error) {
      return setErrState(false, message, true, "error");
    }

    } catch (error) {

    }
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

        <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          Application ID: {appId}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent="flex-end" spacing={1}>
        {data.status === "sanctioned" && (
          <Grid item>
            <PDFGenerator data={pdfDetails} />
          </Grid>
        )}

        {customerDetails.length > 0 && (
          <Grid item>
            <Button
              disabled={
                data.status === "sanctioned" ||
                err.loading ||
                pdfDetails.loan_details.length === 0
              }
              onClick={updateStatusDataApi}
              variant="outlined"
              style={{ marginBottom: 20 }}
            >
              {data.status === "ro_phase"
                ? "Move to DO"
                : data.status === "do_phase"
                ? "Move to Technical Officer"
                : data.status === "technicalofficer"
                ? "Move to Branch Manager"
                : data.status === "bm_phase"
                ? "Move to Credit Manager"
                : data.status === "cluster"
                ? "Sanction"
                : data.status === "sanctioned"
                ? "Sanctioned"
                : ""}
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>

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