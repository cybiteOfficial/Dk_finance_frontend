import React, { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, Box, Typography, Grid, TextField, Input,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
const PhotoUpload = () => {
  const {appId} = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [data,setData]=useState({
    description:"",
    remarks:""
  })
  const [files,setFiles]= useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
   console.log("files",files, data);
    // Add your submit logic here
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleGoBack = () => {
    navigate("/applicant/customers");
  };

  const handleDeleteKeyValuePair = (index) => {
    const updatedPairs = [...files];
    updatedPairs.splice(index, 1);
    setFiles(updatedPairs);
  };
  const handleTextFieldChange = (e) => {
    if (e.target.files[0]) {
      setFiles([...files, e.target.files[0]]);
    }
  };
  return (
    <div >
    <Box width={"90%"} margin={"0 auto"}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>
          Application ID: {appId}
        </Typography>
      <Button
        onClick={handleGoBack}
        startIcon={<ArrowBack />}
        variant="contained"
        style={{ marginBottom: 20 }}
      >
        GO BACK
      </Button>
      <Typography variant="h5">Photograph Upload</Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12}>
            <Box ml={"auto"}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleTextFieldChange(e)}
                style={{ display: "none" }}
                id="file"
              />
              <label htmlFor="file">
                <Button
                  fullWidth
                  style={{ margin: "16px 0 8px 0" }}
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFileIcon />}
                >
                  Choose File
                </Button>
              </label>
            </Box>
          </Grid>
        </Grid>
        <Grid   container style={{
            display: "flex",
            alignItems: "center",
            gap:"1rem"
          }}>
        {files?.map((item,index) => (
          <Grid
           item 
           xs={3}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={10}>
              <TextField
              fullWidth
                label="Uploaded File"
                margin="normal"
                name="uploadedFile"
                value={item?.name}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton   onClick={() => handleDeleteKeyValuePair(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        </Grid>
       
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="description"
          value={data.description}
          onChange={handleInputChange}
        />
        <TextField
          label="Remarks"
          fullWidth
          margin="normal"
          name="remarks"
          value={data.remarks}
          onChange={handleInputChange}
        />
        <Button
          style={{ marginBottom: 10, marginTop: 10, marginLeft: "auto" }}
          variant="contained"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
    </div>
  );
}

export default PhotoUpload
