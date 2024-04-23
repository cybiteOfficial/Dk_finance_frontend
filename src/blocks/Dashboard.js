import React,{useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setAppId} from "../redux/reducers/auth/auth-reducer"
import { Box ,IconButton} from "@mui/material";

const DashboardPage = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1); // State to manage current page

useEffect(()=>{
  console.log("page",page);
},[page])
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); // Decrement page, but not less than 1
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1)); // Increment page, but not more than total pages
  };

  const showCustomer = (item)=>{
    dispatch(setAppId({appId:item.id,type:"setAppId"}))
    navigate("/applicant/customers");
  };
   // Logic to display users based on current page
   const usersPerPage = 10; // Number of users to display per page
   const startIndex = (page - 1) * usersPerPage;
   const endIndex = startIndex + usersPerPage;
   const displayedUsers = userInfo?.slice(startIndex, endIndex);
  return (
    <div>
       <Box width={"100%"} margin={"0 auto"}>
       <Typography variant="h6" style={{ marginBottom: 20 }}>
          Applications
        </Typography>
      <Paper
        style={{
          width: "100%",
          overflowX: "auto",
          height: 400,
          margin: "auto",
          position: "relative",
          marginBottom:"1rem"
        }}
      >
        <Grid
          container
          style={{
            backgroundColor: "#f5f5f5",

            padding: 10,
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={2}>
            <Typography variant="subtitle1" >
              App Id
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="subtitle1" >
              Assignee
            </Typography>
          </Grid>
         
          
          <Grid item xs={2}>
            <Typography variant="subtitle1" >
              Status
            </Typography>
          </Grid>
         
        </Grid>
        <div>
          {userInfo?.map((item, index) => (
            <Grid
              key={item.id}
              container
              style={{
                padding: 10,
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor:"pointer"
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#f9f9f9" : "#ffffff")
              }
              onClick={()=>showCustomer(item)}
            >
              <Grid item xs={2}>
                <Typography variant="body1">{item.id}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{item.assignee}</Typography>
              </Grid>
             
           
              <Grid item xs={2}>
                <Chip
                  label={item.workflow}
                  color={
                    item.workflow === "In Progress"
                      ? "primary"
                      : item.workflow === "Done"
                      ? "secondary"
                      : "default"
                  }
                  style={{
                    backgroundColor:
                      item.workflow === "In Progress"
                        ? "primary"
                        : item.workflow === "Done"
                        ? "secondary"
                        : "#f0f0f0",
                  }}
                />
              </Grid>
             
            </Grid>
          ))}
        </div>
      </Paper>
      <Box display="flex" justifyContent="center">
          <IconButton onClick={handlePrevPage} >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton onClick={handleNextPage}>
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};

export default DashboardPage;
