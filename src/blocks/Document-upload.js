import React, { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, Box, Typography, Grid, TextField, Input,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const DocumentUpload = () => {
  const {appId} = useSelector((state) => state.authReducer);
  const navigate = useNavigate();

  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [data,setData]=useState({
    description:"",
    remarks:""
  })

  const handleGoBack = () => {
    navigate("/applicant/customers");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // Function to update value of a text field
  const handleTextFieldChange = (index, value, key) => {
    const updatedPairs = [...keyValuePairs];
    if (key == "key") {
      updatedPairs[index].key = value;
    } else if (key == "value") {
      updatedPairs[index].value = value;
    } else if (key === "file") {
      updatedPairs[index].fileName = value?.name;
      updatedPairs[index].file = value;
    }
    setKeyValuePairs(updatedPairs);
  };

  const addKeyValuePair = () => {
    setKeyValuePairs([
      ...keyValuePairs,
      { key: "", value: "", fileName: "", file: "" },
    ]);
  };
  const handleDeleteKeyValuePair = (index) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs.splice(index, 1);
    setKeyValuePairs(updatedPairs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("keyValuePairs", keyValuePairs);
    // Add your submit logic here
  };
  return (
    <div style={{ marginTop: 20 }}>
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
      <Typography variant="h5">Document Upload</Typography>
      <form onSubmit={handleSubmit}>
        {keyValuePairs.map((pair, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={3}>
              <TextField
                margin="normal"
                fullWidth
                label="Key"
                value={pair.key}
                onChange={(e) =>
                  handleTextFieldChange(index, e.target.value, "key")
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                margin="normal"
                fullWidth
                label="Value"
                value={pair.value}
                onChange={(e) =>
                  handleTextFieldChange(index, e.target.value, "value")
                }
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Uploaded File"
                margin="normal"
                name="uploadedFile"
                value={pair.fileName}
              />
            </Grid>
            <Grid item xs={2}>
              <Box ml={"auto"}>
                <Input
                  type="file"
                  onChange={(e) =>
                    handleTextFieldChange(index, e.target.files[0], "file")
                  }
                  style={{ display: "none" }}
                  id={`file-input${index}`}
                />
                <label htmlFor={`file-input${index}`}>
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
            <Grid item xs={1}>
              <IconButton onClick={() => handleDeleteKeyValuePair(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
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
        <Button variant="contained" type="button" onClick={addKeyValuePair}>
          Add More
        </Button>
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
};

export default DocumentUpload;
