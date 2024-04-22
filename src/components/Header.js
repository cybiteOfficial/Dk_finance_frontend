import React, { useState } from "react";
import { Toolbar, Typography, AppBar, IconButton, Menu, MenuItem, MenuList, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../redux/reducers/auth/auth-reducer"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Define your custom styles with theme
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white', 
}));

export const Header = () => {
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate("/")

  };

  return (
    <CustomAppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          Dashboard
        </Typography>
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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom', // Position the menu below the IconButton
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top', // Align the top of the menu with the bottom of the IconButton
            horizontal: 'right',
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
      </Toolbar>
    </CustomAppBar>
  );
};
