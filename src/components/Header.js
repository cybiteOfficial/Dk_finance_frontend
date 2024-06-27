import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../redux/reducers/auth/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/dk_finance_logo.png";

import { removeStore } from "../redux/reducers/dashboard/dashboard-reducer";
import { theme } from "../theme";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.authReducer.loggedIn);
  const [anchorEl, setAnchorEl] = useState(null);

  // Define your custom styles with theme
  const CustomAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.white.main,
    color: isLoggedIn ? theme.palette.primary.main : theme.palette.white.main,
    position: "absolute",
    top: 0,
   
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    handleClose(); // Close the menu after logout
    dispatch(logout());
    dispatch(removeStore());
    navigate("/");
  };

  return (
    <Box style={{
      backgroundColor: theme.palette.white.main,
      color: isLoggedIn ? theme.palette.primary.main : theme.palette.white.main,
      position: "absolute",
      top: 0,
      width:"100%"
    }} >
      <Toolbar style={{ height: "10vh" , display:"flex", justifyContent:"space-between"}}>
        <Box>
          {" "}
          <img src={Logo} width={"199px"} height={"64px"} />
        </Box>

        {isLoggedIn && (
          <>
            <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom", // Position the menu below the IconButton
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top", // Align the top of the menu with the bottom of the IconButton
                horizontal: "right",
              }}
            >
              <MenuList>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Toolbar>
     </Box >
  );
};
