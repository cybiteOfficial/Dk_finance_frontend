import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Paper, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { StyledTypography } from "../components/Common";
import { theme } from "../theme";
import SnackToast from "../components/Snackbar";
import {fetchCustomersByApplicantIdDataThunk,setCustomer} from "../redux/reducers/dashboard/dashboard-reducer"

// Import JSON data using require()
const jsonData = require("../mocks/customers.json");

export const Customers = () => {
  const token = useSelector((state) => state.authReducer.access_token);
  const { appId } = useSelector((state) => state.authReducer);
  const { customerDetails} = useSelector((state) => state.dashboardReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch()

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

  const addForm = (item) => {
    dispatch(setCustomer({selectedCustomer:item,type:"setCustomer"}));
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
  }, [appId]);

  const getCustomersApi = async () => {
    
    setErrState(true, "", false, "");
    const payload = {application_id:appId,token}
    try {
      const response = await dispatch(
        fetchCustomersByApplicantIdDataThunk(payload)
      );
      // where is err and msg
      const { results, error, message } = response.payload;
      if (error) {
        return setErrState(false, message, true, "error");
      }
      if (results && results.length > 0) {
        setErrState(false, "Fetched successfully.", true, "success");
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };
  return (
    <>
     <SnackToast
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

          <Button
            variant="outlined"
            style={{ marginBottom: 20, marginLeft: "auto" }}
          >
            Forwarded to DM
          </Button>
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
            <Button  style={{backgroundColor:theme.palette.primary.main, color:theme.palette.white.main}} onClick={() => handleNavigate("/applicant/loan")}>
              Loan Details
            </Button>
            <Button
              style={{backgroundColor:theme.palette.primary.main, color:theme.palette.white.main}} onClick={() => handleNavigate("/applicant/document/uploads")}
            >
              Document Upload
            </Button>
            <Button
              style={{backgroundColor:theme.palette.primary.main, color:theme.palette.white.main}} onClick={() => handleNavigate("/applicant/photographs/uploads")}
            >
              Photograph Upload
            </Button>
            <Button style={{backgroundColor:theme.palette.primary.main, color:theme.palette.white.main}} onClick={() => handleNavigate("/applicant/collateral")}>
              Collateral Details
            </Button>
            <Button
              style={{backgroundColor:theme.palette.primary.main, color:theme.palette.white.main}} onClick={() => handleNavigate("/applicant/customer/application")}
            >
              Customer Application Form
            </Button>
          </div>
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
            <Typography variant="subtitle1">KYC</Typography>
          </Grid>
        </Grid>
        <div>
          {customerDetails && customerDetails.length>0 && customerDetails?.map((item, index) => (
            <Grid
              key={item.id}
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
              onClick={() => addForm(item)}
            >
              <Grid item xs={2}>
                <Typography variant="body1">{item?.cif_id}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{item?.firstName} {item?.lastName}</Typography>
              </Grid>

              <Grid item xs={2}>
                {/* TODO: need kyc in response */}
                <Chip
                  label={item.kyc ? "Verified" : "Not Verified"}
                  color={item.kyc ? "primary" : "default"}
                />
              </Grid>
            </Grid>
          ))}
        </div>
      </Paper>
    </>
  );
};
