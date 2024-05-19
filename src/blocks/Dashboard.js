import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAppId } from "../redux/reducers/auth/auth-reducer";
import  {fetchApplicantDataThunk,  removeApplicant, removeStore, setApplicant} from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";
import {
  Search,
} from "@mui/icons-material";

import {
  Grid,
  Paper,
  TextField,
  Box,
  InputAdornment,
  styled,
  Pagination,Stack
} from "@mui/material";
import { theme } from "../theme";
import { CommonChip, StyledTypography, checkTokenExpired} from "../components/Common";

import DashedImg from "../assets/images/dashed.png";
const useStyles = makeStyles((theme) => ({
  dashedImg: {
    width: "1200px",
    marginLeft: "3rem",
    [theme.breakpoints.down("lg")]: {
      width: "850px",
      marginLeft: "2rem",
    },
  },
  appLicantRows: {
    padding: "1rem 0 1rem 80px",
    display: "flex",
    gap: "4rem",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 0 1rem 40px",
    },
  },
  appLicantHeader: {
    padding: "1rem 0 1rem 80px",
    backgroundColor: theme.palette.lightSecondaryV2.main,
    display: "flex",
    gap: "4rem",
    alignItems: "center",
    [theme.breakpoints.down("lg")]: {
      padding: "1rem 0 1rem 40px",
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    width: "320px",
    borderRadius: "8px",
    height: "40px",

    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.lightSecondaryV2.main,
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.lightSecondaryV2.main}`,
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
  },
}));

const DashboardPage = () => {
  const userInfo = useSelector((state) => state.dashboardReducer.applicantData);
  const token = useSelector((state) => state.authReducer.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Inside your component

  const [page, setPage] = useState(1); // State to manage current page
  const itemsPerPage = 20; // Assuming 20 items per page
  const [totalPages ,setTotalPages]=useState(0);

  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });

  useEffect(() => {
    const fetchApplicants = async () => getApplicantsApi();
    fetchApplicants();
   
  }, [page]);


  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({
      loading,
      errMsg,
      openSnack,
      severity,
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  const showCustomer = (item) => {
    dispatch(
      setAppId({
        appId: { app_id: item.application_id, uuid: item.uuid },
        type: "setAppId",
      })
     
    );

    dispatch(
      setApplicant({
        applicantData:[item],
        type:"setApplicantData"
      })
    )
    navigate("/applicant/customers");
  };


  const getApplicantsApi = async (event) => {
    setErrState(true, "", false, "");
    const payload = {token, page}
    
    try {
      const response = await dispatch(fetchApplicantDataThunk(payload));

      // where is err and msg
      const { results, count, code, message } = response.payload;
      if (code) {
        checkTokenExpired(
          message,
          response,
          setErrState,
          dispatch,
          removeStore,
          navigate
        );
      } else if (results && results.length > 0) {
        const totalPages = Math.ceil(count / itemsPerPage);
        setTotalPages(totalPages);
        setErrState(false, "Fetched successfully.", true, "success");
      }
    } catch (error) {
      console.error("error: ", error);
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
      <Box
        width={"90%"}
        margin={"17vh auto 0 auto"}
        height={"800px"}
        backgroundColor={theme.palette.white.main}
        borderRadius={"16px"}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box p={"2rem"}>
              <StyledTypography variant="subtitle1" weight={700}>
                Applications
              </StyledTypography>
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
            <Box pl={"80px"}>
              <StyledTextField
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid> */}

          <Grid item xs={12}>
            <Box pl={"80px"} mt={"24px"}></Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper
              style={{
                width: "100%",
                margin: "40px 0",
                position: "relative",
                borderRadius: "16px",
              }}
            >
              <Grid container className={classes.appLicantHeader}>
                <Grid item xs={2}>
                  <StyledTypography variant="body2" weight={600}>
                    Application ID
                  </StyledTypography>
                </Grid>
                {/* <Grid item xs={2}>
                  <StyledTypography variant="body2" weight={600}>
                    Name
                  </StyledTypography>
                </Grid> */}
              
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                  }}
                >
                  <Box>
                    <StyledTypography variant="body2" weight={600}>
                      Status
                    </StyledTypography>
                  </Box>
                </Grid>
              </Grid>
              <Box style={{ overflowY: "scroll" }} height={"583px"}>
                {userInfo &&
                  userInfo.length > 0 &&
                  userInfo?.map((item, index) => (
                    <div key={item.application_id}>
                      <Grid
                        container
                        className={classes.appLicantRows}
                        onClick={() => showCustomer(item)}
                      >
                        <Grid item xs={2}>
                          <StyledTypography
                            variant="body2"
                            capitalize="capitalize"
                            weight={600}
                          >
                            #{item?.application_id}
                          </StyledTypography>
                        </Grid>

                        {/* <Grid item xs={2}>
                          <StyledTypography variant="body2" weight={600}>
                            {item.lead}
                          </StyledTypography>
                        </Grid> */}
                      
                        <Grid
                          item
                          xs={2}
                          style={{
                            display: "flex",
                            marginLeft: "auto",
                            marginRight: "52px",
                          }}
                        >
                          <Box>
                            <CommonChip
                              propFontSize={theme.typography.body2.fontSize}
                              propFontWeight={
                                theme.typography.fontWeightRegular
                              }
                              propColor={
                                //TODO: need statuses
                                theme.palette.primary.main
                              }
                              propWidth={"160px"}
                              propHeight={"40px"}
                              propBorderRadius={"8px"}
                              propBackgroundColor={
                                theme.palette.lightSecondaryV3.main
                              }
                              textTransform={"capitalize"}
                              label={item.status==="cluster" ? "Approved":item.status}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <img src={DashedImg} className={classes.dashedImg} />
                    </div>
                  ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box>
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
      </Box>
    </>
  );
};

export default DashboardPage;
