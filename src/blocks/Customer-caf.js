import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, TextField, Typography, Box, Grid ,Select,FormControl,InputLabel,MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logFormData} from "../components/Common"
import SnackToast from "../components/Snackbar";
import mockCustomers from"../mocks/allcustomers.json"
import { fetchAllCustomersByApplicantIdDataThunk, fetchCafDataThunk, updateCafDataThunk } from "../redux/reducers/dashboard/dashboard-reducer";

const CustomerCaf = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.access_token);
  const {appId} = useSelector((state) => state.authReducer);
  const dashboardReducer = useSelector((state) => state.dashboardReducer);


  useEffect(() => {
    async function fetchData() {
      fetchAllCustomersDataApi();
      fetchCafDataApi();
    }
    fetchData();
    return () => {
      // dispatch(removeLoan({ payload: {}, type: "removeLoan" }));
    };
  }, []);

  const [cafDetails, setCafDetails] = useState({
    tentative_amt: "",
    pdWith: "",
    placeOfPdAddress: "",
    location: "",
    description: "",
    comment: "",
  });
  const [extra_data, setExtraData] = useState([]);
  const[isRemarks,setIsRemarks]=useState(false)
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });
  

  
  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({
      loading,
      errMsg,
      openSnack,
      severity,
    });
  };
useEffect(()=>{
  console.log("caf",cafDetails);
},[cafDetails])
  const handleExtractFormValues = (dataObject) => {
    const updatedFormValues = { ...cafDetails };

    for (const key in dataObject) {
      updatedFormValues[key] = dataObject[key];
    }
   
    setCafDetails(updatedFormValues);
    setExtraData(updatedFormValues.extra_data)
  };
  const handleGoBack = () => {
    navigate("/applicant/customers");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCafDetails({ ...cafDetails, [name]: value });
  };

  const handleCloseToast = () => {
    setErrState(false, "", false, ""); // Resetting the error state to close the toast
  };

  // Function to update value of a text field
  const handleTextFieldChange = (index, value, key) => {
    const updatedPairs = [...extra_data];
    if (key == "key") {
      updatedPairs[index].key = value;
    } else {
      updatedPairs[index].value = value;
    }
    setExtraData(updatedPairs);
  };

  // Function to add a new key-value pair
  const addKeyValuePair = () => {
    setExtraData([...extra_data, { key: "", value: "" }]);
  };

  const fetchCafDataApi = async () => {
    const payload = {application_id:appId,token}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchCafDataThunk(payload));
      const { data, error, message,code } = response.payload;
      if (code) {
        return setErrState(
          false,
          response.payload.response.data.message,
          true,
          "error"
        );
      } else if (error) {
        return setErrState(false, message, true, "error");
      }
      
      if (data ) {
        handleExtractFormValues(data)
        setErrState(false, "", false, "success");
      }
    } catch (error) {
      setErrState(false, "", false, "success");
      console.error('error: ', error);
    }
  };
  const fetchAllCustomersDataApi = async () => {
    const payload = {application_id:appId,token}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchAllCustomersByApplicantIdDataThunk(payload));
      const { data, error, message } = response.payload;
      if (error) {
        return setErrState(false, message, true, "error");
      }
      
      if (data && data.length > 0) {
        setErrState(false, "", false, "success");
      }
    } catch (error) {
      setErrState(false, "", false, "success");
      console.error('error: ', error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isRemarks){
      if (!cafDetails.comment.trim()) {
      
        setErrState(false, "Please add a remark", true, "warning");
        return;
      }
      delete cafDetails.id
      delete cafDetails.applicant;
      delete cafDetails.extra_data
      delete cafDetails.created_at
      delete cafDetails.updated_at
      delete cafDetails.uuid
      const bodyFormData = new FormData();

      bodyFormData.append("extra_data", JSON.stringify(extra_data));
      bodyFormData.append("applicant_id",appId)
      for(let caf in cafDetails){
        bodyFormData.append(`${caf}`,cafDetails[`${caf}`])
      }
      logFormData(bodyFormData)
      const payload = { bodyFormData, token };
      try {
        const response = await dispatch(updateCafDataThunk(payload));
      
        const { error, message, code } = response.payload;
        if (code) {
          return setErrState(
            false,
            response.payload.response.data.message,
            true,
            "error"
          );
        } else if (error) {
          return setErrState(false, message, true, "error");
        } else {
          setIsRemarks(false);
          setErrState(false, message, true, "success");
          // navigate("/applicant/customers");
        }
        
      } catch (error) {
        setIsRemarks(false);
        console.error("error: ", error);
      }
    }else {
     
      setErrState(false, "Please add a remark", true, "warning");
      setIsRemarks(true);
      return;
    }
  
  };

  return (
    <>
      <SnackToast
        onClose={handleCloseToast}
        openSnack={err.openSnack}
        message={err.errMsg}
        severity={err.severity}
      />
      <Box width={"90%"} margin={"13vh auto 0 auto"}>
        <Button
          onClick={handleGoBack}
          startIcon={<ArrowBack />}
          variant="contained"
          style={{ marginBottom: 20 }}
        >
          GO BACK
        </Button>
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
          Application ID: {appId}
        </Typography>

        <Typography variant="h5">Customer CAF</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tentative Amount"
            name="tentative_amt"
            value={cafDetails.tentative_amt}
            onChange={handleInputChange}
            margin="normal"
          />

          <FormControl fullWidth>
            <InputLabel>PD with (Applicant Name with ID)</InputLabel>
            <Select
              label="PD with (Applicant Name with ID)"
              name="pdWith"
              value={cafDetails.pdWith}
              onChange={handleInputChange}  
              margin="normal"
            >
              {dashboardReducer.allCustomers?.length > 0 &&
                dashboardReducer.allCustomers?.map((item) => {
                  return (
                    <MenuItem key={item.cif_id} value={item.cif_id}>
                      {item?.firstName}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
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

          {extra_data.map((pair, index) => (
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
          {isRemarks && (
            <TextField
              label="Remarks"
              fullWidth
              margin="normal"
              name="comment"
              value={cafDetails.comment}
              onChange={handleInputChange}
            />
          )}
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
    </>
  );
};

export default CustomerCaf;
