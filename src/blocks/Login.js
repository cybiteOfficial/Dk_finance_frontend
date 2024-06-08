import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { logout, loginUserThunk } from "../redux/reducers/auth/auth-reducer";
import { removeStore } from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";
import { theme } from "../theme";
import LoginImage from "../assets/images/login_image.png";
import { styled } from "@mui/material/styles";
import { StyledTypography } from "../components/Common";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "8px",
    height: "16px",
    border: `1px solid ${theme.palette.primary.main}`,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
  },
}));

export const LoginPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });

  useEffect(() => {
    dispatch(logout());
    dispatch(removeStore())
  }, [dispatch]);

  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({
      loading,
      errMsg,
      openSnack,
      severity,
    });
  };
  //onchange
  const handleLoginChange = (event) => {
    const { value, name } = event.target;
   
    setLoggedInUser((prev) => ({
      ...prev,
      [name]: value 
  }));
  };

  const navigateToDashboardPage = async (event) => {
    event.preventDefault();
    setErrState(true, "", false, "");
  
    // Dispatch the loginUserThunk action and wait for the Promise to resolve
    try {
      const response = await dispatch(loginUserThunk(loggedInUser));
  
      const { Error, message } = response.payload;
      if (!Error) {
        setErrState(false, message, true, "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      const { message } = error;
      setErrState(false, message, true, "error");
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

      <Grid
        container
        style={{
          height: "auto", // Subtract header height
          padding: 0,
        }}
      >
        <>
          <Grid item xs={12}>
            <Box height={"55vh"} bgcolor={theme.palette.primary.main} />
          </Grid>
          <Grid item xs={12}>
            <Box
              height={"45vh"}
              bgcolor={theme.palette.lightSecondaryV2.main}
            />
          </Grid>
        </>
      </Grid>
      <Box
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          width: "80%",
          height: "696px",
          borderRadius: "40px",
          boxShadow: theme.shadows[5],
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              p={"1rem"}
              gap={"2rem"}
            >
              {" "}
              <img src={LoginImage} width={"90%"} />{" "}
              <StyledTypography variant="h4" weight={600}>
                Welcome Back !
              </StyledTypography>
              <StyledTypography
                color={theme.palette.blackFade.main}
                align="center"
                variant="body2"
                weight={400}
              >
                Log in to access your account and manage your loan details.
              </StyledTypography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              backgroundColor: theme.palette.lightSecondaryV4.main,
              borderTopRightRadius: "40px",
              borderBottomRightRadius: "40px",
              display: "flex",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              p={"1rem"}
            >
              <StyledTypography variant="h2" weight={600}>
                Login
              </StyledTypography>
              <form
                onSubmit={navigateToDashboardPage}
                style={{ marginTop: "1rem" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      gap={"0.5rem"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <StyledTypography
                        variant="body2"
                        color={theme.palette.primary.main}
                        weight={500}
                      >
                        Username
                      </StyledTypography>
                      <StyledTextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        name="username"
                        onChange={handleLoginChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      gap={"0.5rem"}
                      display={"flex"}
                      flexDirection={"column"}
                    >
                      <StyledTypography
                        variant="body2"
                        color={theme.palette.primary.main}
                        weight={500}
                      >
                        Password
                      </StyledTypography>
                      <StyledTextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        onChange={handleLoginChange}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  style={{
                    borderRadius: "8px",
                    marginTop: "2rem",
                    height: "48px",
                  }}
                  onClick={navigateToDashboardPage}
                >
                  <StyledTypography
                    variant="body2"
                    color={theme.palette.white.main}
                    weight={500}
                  >
                    Login
                  </StyledTypography>
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
{
}
