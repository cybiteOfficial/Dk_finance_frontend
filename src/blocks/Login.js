import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import {
  logout,
  loginUserThunk,
} from "../redux/reducers/auth/auth-reducer";
import SnackToast  from "../components/Snackbar"

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
    severity:""
  });

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    console.log("====",err);
  }, [err]);
 

  const setErrState = (loading,errMsg,isErr,severity)=>{
    console.log("isErr",isErr);
    setErr({
      loading,
      errMsg,
      isErr,
      severity
    });
  }
  //onchange
  const handleLoginChange = (event) => {
    const { value, name } = event.target;
    setLoggedInUser({
      [name]: value,
    });
  };

  const navigateToDashboardPage = async (event) => {
    event.preventDefault();
    setErrState(true, "", false,"");

    // Dispatch the loginUserThunk action and wait for the Promise to resolve
    try {
      const response = await dispatch(loginUserThunk(loggedInUser));
     
    
      if (response.payload) {
        setErrState(false, "Login successfull", true,"success");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    } catch (error) {
      // Handle any errors here
      console.error("Login failed:", error);
      setErrState(false, "Login failed", true,"error");
      // Optionally, display error message to the user
    } 
  };

  return (
    <>
    <SnackToast openSnack={err.isErr} message={err.errMsg} severity={err.severity}/>
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Typography component="h1" variant="h5" color="primary">
          Login
        </Typography>
        <form onSubmit={navigateToDashboardPage} style={{ marginTop: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleLoginChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleLoginChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={navigateToDashboardPage}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
    </>
    
  );
};
