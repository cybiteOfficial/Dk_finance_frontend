import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { logout, loginUserThunk } from "../redux/reducers/auth/auth-reducer";
import SnackToast from "../components/Snackbar";
import theme from "../theme";
import LoginImage from "../assets/images/login_image.png";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({theme})=>({
 
  '& .MuiInputBase-input':{
    borderRadius:"8px",
    height:"16px",
    border:`1px solid ${theme.palette.primary.main}`,
    fontFamily:theme.typography.fontFamily,
    color:theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-notchedOutline':{
    borderRadius:"8px",
  }
}))


export const LoginPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    isErr: false,
    severity: "",
  });

 
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    console.log("====", err);
  }, [err]);

  const setErrState = (loading, errMsg, isErr, severity) => {
    console.log("isErr", isErr);
    setErr({
      loading,
      errMsg,
      isErr,
      severity,
    });
  };
  //onchange
  const handleLoginChange = (event) => {
    const { value, name } = event.target;
    setLoggedInUser({
      [name]: value,
    });
  };

  const navigateToDashboardPage = async (event) => {
    event.preventDefault();
    setErrState(true, "", false, "");

    // Dispatch the loginUserThunk action and wait for the Promise to resolve
    try {
      const response = await dispatch(loginUserThunk(loggedInUser));

      if (response.payload) {
        setErrState(false, "Login successfull", true, "success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Login failed:", error);
      setErrState(false, "Login failed", true, "error");
      // Optionally, display error message to the user
    }
  };

  return (
    <>
      <SnackToast
        openSnack={err.isErr}
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
          height:"65%",
          borderRadius: "40px",
          boxShadow: theme.shadows[5],

        }}
      >
        <Grid container style={{ display: "flex", height:"100%" , alignItems:"center", justifyContent:"center"}}>
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
              <img
                style={{  }}
                src={LoginImage}
                width={"90%"}
               
              />{" "}
              <Typography style={{  }} variant="semi">
                Welcome Back !
              </Typography>
              <Typography style={{ color:"#4C4C4C" }} align="center" variant="regular">
                Log in to access your account and manage your loan details.
              </Typography>
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
              display:"flex",
              alignItems:"center",
              height:"100%",
              justifyContent:"center"
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              p={"1rem"}
            >
              <Typography  variant="bold">
                Login
              </Typography>
              <form
                onSubmit={navigateToDashboardPage}
                style={{ marginTop: "1rem" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box gap={"0.5rem"} display={"flex"} flexDirection={"column"}>
                    <Typography variant="regularMedium"color={theme.palette.primary.main}>Email</Typography>
                    <StyledTextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                     
                      name="email"
                      onChange={handleLoginChange}
                    />
                    </Box>
                   
                  </Grid>
                  <Grid item xs={12}>
                  <Box gap={"0.5rem"} display={"flex"} flexDirection={"column"}>
                  <Typography variant="regularMedium"color={theme.palette.primary.main}>Password</Typography>
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
                  style={{borderRadius:"8px", marginTop:"2rem",}}
                  onClick={navigateToDashboardPage}
                >
                  <Typography variant="regularMedium">Login</Typography>
                 
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
