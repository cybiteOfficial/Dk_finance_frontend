import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const CustomerCaf = () => {
  const navigate = useNavigate();
  const {appId} = useSelector((state) => state.authReducer);
  const [cafDetails, setCafDetails] = useState({
    tentativeAmount: "",
    pdWith: "",
    placeOfPdAddress: "",
    location: "",
    description: "",
    remarks: "",
  });
  const [keyValuePairs, setKeyValuePairs] = useState([]);

  const handleGoBack = () => {
    navigate("/applicant/customers");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCafDetails({ ...cafDetails, [name]: value });
  };

  // Function to update value of a text field
  const handleTextFieldChange = (index, value, key) => {
    const updatedPairs = [...keyValuePairs];
    if (key == "key") {
      updatedPairs[index].key = value;
    } else {
      updatedPairs[index].value = value;
    }
    setKeyValuePairs(updatedPairs);
  };

  // Function to add a new key-value pair
  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
console.log("cafDetails",cafDetails);
console.log("key",keyValuePairs);
    // Add your submit logic here
  };

  return (
    <div >
    <Box width={"90%"}  margin={"0 auto"}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>
          Application ID: {appId}
        </Typography>
      <Button
        onClick={handleGoBack}
        startIcon={<ArrowBack />}
        variant="contained"
        style={{ marginBottom: 20,  }}
      >
        GO BACK
      </Button>
      <Typography variant="h5">Customer CAF</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tentative Amount"
          name="tentativeAmount"
          value={cafDetails.tentativeAmount}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="PD with (Applicant Name with ID)"
          name="pdWith"
          value={cafDetails.pdWith}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Place of PD Address"
          name="placeOfPdAddress"
          value={cafDetails.placeOfPdAddress}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={cafDetails.location}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={cafDetails.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Remarks"
          fullWidth
          margin="normal"
          name="remarks"
          value={cafDetails.remarks}
          onChange={handleInputChange}
        />
        {keyValuePairs.map((pair, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          </Grid>
        ))}

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

export default CustomerCaf;
