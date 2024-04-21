import React from "react";
import { Toolbar, Typography, Avatar } from "@mui/material";
import {theme} from "../theme"

export const Header = () => {
  return (
    <Toolbar sx={{ backgroundColor: '#f4f4f4', color: theme.palette.primary }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Avatar sx={{ bgcolor: "#f9f9f9", color: '#006341', ml: 2 }}> {/* Profile Icon */}
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>U</Typography>
      </Avatar>
    </Toolbar>
  );
};
