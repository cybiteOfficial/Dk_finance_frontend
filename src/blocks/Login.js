import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import {
  logout,
  loginUserThunk,
} from "../redux/reducers/auth/auth-reducer";

export const LoginPage = () => {
  const dispatch = useDispatch(); // Initialize dispatch function
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  //onchange
  const handleLoginChange = (event) => {
    const { value, name } = event.target;
    setLoggedInUser({
      [name]: value,
    });
  };

  const navigateToDashboardPage = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Dispatch the loginUserThunk action and wait for the Promise to resolve
    try {
      const response = await dispatch(loginUserThunk(loggedInUser));
      
      if (response.payload) {
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle any errors here
      console.error("Login failed:", error);
      // Optionally, display error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: "100vh",
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
  );
};
