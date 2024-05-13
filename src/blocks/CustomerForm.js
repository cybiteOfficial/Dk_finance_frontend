import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Divider,
  Input,
} from "@mui/material";

import { ArrowBack, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  fetchCustomerByApplicantIdDataThunk,
  removeCustomer,
  removeCustomerData,
  updateCustomerDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import { logFormData } from "../components/Common";

const fieldsToExtract = [
  "title",
  "firstName",
  "middle_name",
  "lastName",
  "dateOfBirth",
  "age",
  "sourceOfIncome",
  "monthlyIncome",
  "monthlyFamilyIncome",
  "residenceOwnership",
  "agriculturalLand",
  "valueOfAgriculturalLand",
  "earningsFromAgriculturalLand",
  "educationQualification",
  "numberOfDependents",
  "gender",
  "customerSegment",
  "profile_photo",
  "created_at",
  "updated_at",
  "uuid",
  "cif_id",
  "applicant",
  "current_address",
  "permanent_address",
  "applicant",
  "description",
  "comment"
];

const CustomerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.access_token);
  const { selectedCustomer, selectedCustomerData ,customerDetails} = useSelector(
    (state) => state.dashboardReducer
  );
  const { appId } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (selectedCustomer.cif_id) {
      async function fetchData() {
        fetchCustomerDataApi();
      }
      fetchData();
    }

    return () => {
      dispatch(removeCustomerData({ payload: {}, type: "removeCustomerData" }));
    };
  }, []);

  useEffect(() => {
    handleExtractFormValues();
  }, [selectedCustomerData]);

 

  const personalInformation = Object.fromEntries(
    fieldsToExtract.map((field) => [
      field,
      selectedCustomer[field] !== undefined ? selectedCustomer[field] : "",
    ])
  );
  const [personalInfoFilled, setPersonalInfoFilled] = useState(false);
  const [addressInfoFilled, setAddressInfoFilled] = useState(false);

  const [personInformation, setPersonalInformation] = useState({
    ...personalInformation,
  });

  const [addressFields, setAddressFields] = useState({
    current: {
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      state: "",
      district: "",
      city: "",
      tehsil_or_taluka: "",
      pincode: "",
      landmark: "",
      residence_state: "",
      residence_type: "",
      stability_at_residence: "",
      distance_from_branch: "",
    },
    permanent: {
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      state: "",
      district: "",
      city: "",
      tehsil_or_taluka: "",
      pincode: "",
      landmark: "",
      residence_state: "",
      residence_type: "",
      stability_at_residence: "",
      distance_from_branch: "",
    },
  });
  const [permanentAddressSameAsCurrent, setPermanentAddressSameAsCurrent] =
    useState(false);


  // State for cropped image
  const [croppedImage, setCroppedImage] = useState(
    selectedCustomer?.profile_photo
  );
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });


  useEffect(() => {
    if (permanentAddressSameAsCurrent) {
      setAddressFields((prevState) => ({
        ...prevState,
        permanent: {
          ...prevState.current,
        },
      }));
    } else
      setAddressFields((prevState) => ({
        ...prevState,
        permanent: {
          address_line_1: "",
          address_line_2: "",
          address_line_3: "",
          state: "",
          district: "",
          city: "",
          tehsil_or_taluka: "",
          pincode: "",
          landmark: "",
          residence_state: "",
          residence_type: "",
          stability_at_residence: "",
          distance_from_branch: "",
        },
      }));
    {
    }
  }, [permanentAddressSameAsCurrent]);

  // Define keys to discard
  const keysToDiscard = [
    "uuid",
    "created_at",
    "updated_at",
    "is_current",
    "is_permanent",
    "customer",
  ];

  // Function to filter out keys to discard
  const filterKeys = (obj) => {
    const filteredObj = {};
    Object.keys(obj).forEach((key) => {
      // if (!keysToDiscard.includes(key)) {
        filteredObj[key] = obj[key];
      // }
    });
    return filteredObj;
  };

  const handleExtractFormValues = () => {
    setAddressFields((prevState) => ({
      ...prevState,
      current: selectedCustomerData?.current_address
        ? {
            ...prevState.current,
            ...filterKeys(selectedCustomerData?.current_address),
          }
        : prevState.current,
      permanent: selectedCustomerData?.permanent_address
        ? {
            ...prevState.permanent,
            ...filterKeys(selectedCustomerData?.permanent_address),
          }
        : prevState.permanent,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({
      loading,
      errMsg,
      openSnack,
      severity,
    });
  };

  const fetchCustomerDataApi = async () => {
    const payload = { customer_id: selectedCustomer?.cif_id, token };
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(
        fetchCustomerByApplicantIdDataThunk(payload)
      );
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
      }

      setErrState(false, "", false, "success");
    } catch (error) {
      setErrState(false, "", false, "success");
      console.error("error: ", error);
    }
  };
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    if(!selectedCustomer?.cif_id){
     
      delete personInformation.created_at
      delete personInformation.updated_at
      delete personInformation.comment
      delete personInformation.description
      delete personInformation.cif_id
      delete personInformation.applicant
      delete personInformation.current_address
      delete personInformation.permanent_address
      delete personInformation.uuid

      delete addressFields.current.created_at
      delete addressFields.current.updated_at
      delete addressFields.current.uuid
      delete addressFields.current.is_current
      delete addressFields.current.is_permanent
      delete addressFields.current.customer

      delete addressFields.permanent.created_at
      delete addressFields.permanent.updated_at
      delete addressFields.permanent.uuid
      delete addressFields.permanent.is_current
      delete addressFields.permanent.is_permanent
      delete addressFields.permanent.customer
      personInformation.role =
      customerDetails.length === 0 ? "applicant" : "co_applicant";

    }
    const bodyFormData = new FormData();
    bodyFormData.append("profile_photo", personInformation.profile_photo);
  

    
    const customer_data = { ...personInformation, application_id: appId };
  

    bodyFormData.append("customer_data", JSON.stringify(customer_data));
    bodyFormData.append(
      "current_address",
      JSON.stringify(addressFields.current)
    );
    bodyFormData.append(
      "permanent_address",
      JSON.stringify(addressFields.permanent)
    );
    bodyFormData.append("is_permanent", permanentAddressSameAsCurrent);
    logFormData(bodyFormData)
   
   
    const payload = { bodyFormData, token, cif_id: selectedCustomer?.cif_id };
    try {
      const response = await dispatch(updateCustomerDataThunk(payload));
     
      const { error, message,code } = response.payload;
      if (code) {
        return setErrState(
          false,
          response.payload.response.data.message,
          true,
          "error"
        );
      } else if (error) {
        return setErrState(false, message, true, "error");
      }else{
        setErrState(false, message, false, "success");
        navigate("/applicant/customers");
      }
     
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handlePermanentAddressSameAsCurrent = () => {
    setPermanentAddressSameAsCurrent(!permanentAddressSameAsCurrent);
  };
  const handlePermanentAddressChange = (fieldName) => (event) => {
    const { value } = event.target;
    setAddressFields((prevState) => ({
      ...prevState,
      permanent: {
        ...prevState.permanent,
        [fieldName]: value,
      },
    }));
  };

  // Function to handle file drop and set cropped image
  const handleDrop = (e) => {
    if (e.target.files[0]) {
      setPersonalInformation((prevState) => ({
        ...prevState,
        profile_photo: e.target.files[0],
      }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setCroppedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Box width={"90%"} margin={"13vh auto 0 auto"}>
        <Button
          onClick={() => navigate("/applicant/customers")}
          variant="contained"
          startIcon={<ArrowBack />}
          style={{ marginBottom: 20 }}
        >
          Go Back
        </Button>
        <Box display={"flex"} gap={"1rem"} justifyContent={"space-between"}>
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            Application ID: {appId}
          </Typography>

          {selectedCustomer?.cif_id && (
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              Customer ID : {selectedCustomer.cif_id}
            </Typography>
          )}
        </Box>
      </Box>

      <Paper style={{ width: "90%", padding: 20, margin: "auto" }}>
        <form onSubmit={handlePersonalSubmit}>
          <Accordion style={{ marginBottom: 20 }}>
            <AccordionSummary
              expandIcon={personalInfoFilled ? <ExpandLess /> : <ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box>
                <Typography variant="h6">Personal Information</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={2} sm={7}>
                  <Box ml={"auto"}>
                    <Input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="file"
                      onChange={handleDrop}
                    />
                    <label htmlFor="file">
                      <Button
                        fullWidth
                        style={{ margin: "16px 0 8px 0" }}
                        variant="outlined"
                        component="span"
                        startIcon={<AttachFileIcon />}
                      >
                        Choose Photo
                      </Button>
                    </label>
                  </Box>
                  {croppedImage && (
                    <Grid item xs={12}>
                      <img
                        src={croppedImage}
                        alt="Selected Photo"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Title</InputLabel>
                    <Select
                      value={personInformation.title}
                      onChange={handleChange}
                      name="title"
                      label="Title"
                    >
                     
                      <MenuItem value="ms">MS</MenuItem>
                      <MenuItem value="miss">Miss</MenuItem>
                      <MenuItem value="mrs">Mrs</MenuItem>
                      <MenuItem value="mr.">Mr.</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="First Name"
                    fullWidth
                    value={personInformation.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Middle Name"
                    fullWidth
                    value={personInformation.middle_name}
                    onChange={handleChange}
                    name="middle_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Last Name"
                    fullWidth
                    value={personInformation.lastName}
                    onChange={handleChange}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                   
                    fullWidth
                    value={personInformation.dateOfBirth}
                    onChange={handleChange}
                    name="dateOfBirth"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Age"
                    fullWidth
                    value={personInformation.age}
                    onChange={handleChange}
                    name="age"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Source of Income"
                    fullWidth
                    value={personInformation.sourceOfIncome}
                    onChange={handleChange}
                    name="sourceOfIncome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Monthly Income"
                    fullWidth
                    value={personInformation.monthlyIncome}
                    onChange={handleChange}
                    name="monthlyIncome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Monthly Family Income"
                    fullWidth
                    value={personInformation.monthlyFamilyIncome}
                    onChange={handleChange}
                    name="monthlyFamilyIncome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Residence Ownership</InputLabel>
                    {/* TODO:  */}
                    <Select
                      value={personInformation.residenceOwnership}
                      onChange={handleChange}
                      name="residenceOwnership"
                      label="Residence Ownership"
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Agricultural Land</InputLabel>
                    <Select
                      value={personInformation.agriculturalLand}
                      onChange={handleChange}
                      name="agriculturalLand"
                      label="Agricultural Land"
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {personInformation.agriculturalLand === "Yes" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        label="Tentative Value of Total Agricultural Land"
                        fullWidth
                        value={personInformation.valueOfAgriculturalLand}
                        onChange={handleChange}
                        name="valueOfAgriculturalLand"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="number"
                        label="Tentative Earnings from Agricultural Land"
                        fullWidth
                        value={personInformation.earningsFromAgriculturalLand}
                        onChange={handleChange}
                        name="earningsFromAgriculturalLand"
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Education Qualification</InputLabel>
                    <Select
                      value={personInformation.educationQualification}
                      onChange={handleChange}
                      name="educationQualification"
                      label="Education Qualification"
                    >
                      <MenuItem value="uneducated">Uneducated</MenuItem>
                      <MenuItem value="below10th">Below 10th</MenuItem>
                      <MenuItem value="secondary">Secondary</MenuItem>
                      <MenuItem value="mtech">M.Tech</MenuItem>
                      <MenuItem value="seniorsecondary">
                        Senior Secondary
                      </MenuItem>
                      <MenuItem value="iti">ITI Technical Degree</MenuItem>
                      <MenuItem value="graduation">Graduation</MenuItem>
                      <MenuItem value="postgraduation">
                        Post Graduation
                      </MenuItem>
                      {/* TODO: what should be the values selct hingi ya direct text filds */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Number of Dependents"
                    fullWidth
                    value={personInformation.numberOfDependents}
                    onChange={handleChange}
                    name="numberOfDependents"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={personInformation.gender}
                      onChange={handleChange}
                      name="gender"
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Customer Segment</InputLabel>
                    <Select
                      value={personInformation.customerSegment}
                      onChange={handleChange}
                      name="customerSegment"
                      label="Customer Segment"
                    >
                      {/* TODO: values or kya ?? */}
                      <MenuItem value="self_employee">
                        Self-Employment Professional
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </AccordionDetails>
            <Divider />
          </Accordion>
        </form>
        <form onSubmit={handlePersonalSubmit}>
          <Accordion style={{ marginBottom: 20 }}>
            <AccordionSummary
              expandIcon={addressInfoFilled ? <ExpandLess /> : <ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h6">Address Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1" gutterBottom>
                Current Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Address Line 1"
                    fullWidth
                    value={addressFields.current.address_line_1}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          address_line_1: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address Line 2"
                    type="text"
                    fullWidth
                    value={addressFields.current.address_line_2}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          address_line_2: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Address Line 3"
                    fullWidth
                    value={addressFields.current.address_line_3}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          address_line_3: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="State"
                    fullWidth
                    value={addressFields.current.state}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          state: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="District"
                    fullWidth
                    value={addressFields.current.district}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          district: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="City"
                    fullWidth
                    value={addressFields.current.city}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: { ...prevState.current, city: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Tehsil/Taluka"
                    fullWidth
                    value={addressFields.current.tehsil_or_taluka}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          tehsil_or_taluka: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="number"
                    label="Pin Code"
                    fullWidth
                    value={addressFields.current.pincode}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          pincode: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  type="text"
                    label="Landmark"
                    fullWidth
                    value={addressFields.current.landmark}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          landmark: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Residence Status</InputLabel>
                    <Select
                      value={addressFields.current.residence_state}
                      onChange={(e) =>
                        setAddressFields((prevState) => ({
                          ...prevState,
                          current: {
                            ...prevState.current,
                            residence_state: e.target.value,
                          },
                        }))
                      }
                      label="Residence Status"
                    >
                      <MenuItem value="owned">Owned</MenuItem>
                      <MenuItem value="rented">Rented</MenuItem>
                      <MenuItem value="parented">Parented</MenuItem>
                      <MenuItem value="spouseOwned">Spouse Owned</MenuItem>
                      <MenuItem value="company">Company</MenuItem>
                      <MenuItem value="govtProvided">Govt Provided</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Residence Type</InputLabel>
                    <Select
                      value={addressFields.current.residence_type}
                      onChange={(e) =>
                        setAddressFields((prevState) => ({
                          ...prevState,
                          current: {
                            ...prevState.current,
                            residence_type: e.target.value,
                          },
                        }))
                      }
                      label="Residence Type"
                    >
                      <MenuItem value="bungalow">Bungalow</MenuItem>
                      <MenuItem value="independentHouse">
                        Independent House
                      </MenuItem>
                      <MenuItem value="flat">Flat</MenuItem>
                      <MenuItem value="slum">Slum</MenuItem>
                      <MenuItem value="chawl">Chawl</MenuItem>
                      <MenuItem value="kuchaHouse">Kucha House</MenuItem>
                      <MenuItem value="others">Others (Specify)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="Stability at Residence"
                    fullWidth
                    value={addressFields.current.stability_at_residence}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          stability_at_residence: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    label="Distance from Branch"
                    fullWidth
                    value={addressFields.current.distance_from_branch}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          distance_from_branch: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
            <AccordionDetails>
              <Box width="100%">
                <Typography variant="subtitle1" gutterBottom>
                  Permanent Address
                </Typography>
                <Button
                  onClick={handlePermanentAddressSameAsCurrent}
                  variant="outlined"
                  style={{ marginBottom: 10 }}
                >
                  {permanentAddressSameAsCurrent
                    ? "Change Permanent Address"
                    : "Same as Current Address"}
                </Button>
                <Grid container spacing={2}>
                  {/* Add permanent address fields here */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent Address Line 1"
                      value={addressFields.permanent.address_line_1}
                      onChange={handlePermanentAddressChange("address_line_1")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent Address Line 2"
                      value={addressFields.permanent.address_line_2}
                      onChange={handlePermanentAddressChange("address_line_2")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent Address Line 3"
                      value={addressFields.permanent.address_line_3}
                      onChange={handlePermanentAddressChange("address_line_3")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent State"
                      value={addressFields.permanent.state}
                      onChange={handlePermanentAddressChange("state")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent District"
                      value={addressFields.permanent.district}
                      onChange={handlePermanentAddressChange("district")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent City"
                      value={addressFields.permanent.city}
                      onChange={handlePermanentAddressChange("city")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent Tehsil/Taluka"
                      value={addressFields.permanent.tehsil_or_taluka}
                      onChange={handlePermanentAddressChange(
                        "tehsil_or_taluka"
                      )}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label="Permanent Pin Code"
                      value={addressFields.permanent.pincode}
                      onChange={handlePermanentAddressChange("pincode")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Permanent Landmark"
                      value={addressFields.permanent.landmark}
                      onChange={handlePermanentAddressChange("landmark")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Permanent Residence Status</InputLabel>
                      <Select
                        onChange={handlePermanentAddressChange(
                          "residence_state"
                        )}
                        value={addressFields.permanent.residence_state}
                        defaultValue=""
                        label="Permanent Residence Status"
                      >
                        <MenuItem value="owned">Owned</MenuItem>
                        <MenuItem value="rented">Rented</MenuItem>
                        <MenuItem value="parented">Parented</MenuItem>
                        <MenuItem value="spouseOwned">Spouse Owned</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                        <MenuItem value="govtProvided">Govt Provided</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Permanent Residence Type</InputLabel>
                      <Select
                        onChange={handlePermanentAddressChange(
                          "residence_type"
                        )}
                        value={addressFields.permanent.residence_type}
                        defaultValue=""
                        label="Permanent Residence Type"
                      >
                        <MenuItem value="bungalow">Bungalow</MenuItem>
                        <MenuItem value="independentHouse">
                          Independent House
                        </MenuItem>
                        <MenuItem value="flat">Flat</MenuItem>
                        <MenuItem value="slum">Slum</MenuItem>
                        <MenuItem value="chawl">Chawl</MenuItem>
                        <MenuItem value="kuchaHouse">Kucha House</MenuItem>
                        <MenuItem value="others">Others (Specify)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      onChange={handlePermanentAddressChange(
                        "stability_at_residence"
                      )}
                      value={addressFields.permanent.stability_at_residence}
                      label="Permanent Stability at Residence"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      onChange={handlePermanentAddressChange(
                        "distance_from_branch"
                      )}
                      value={addressFields.permanent.distance_from_branch}
                      label="Permanent Distance from Branch"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
            <Divider />
          </Accordion>
        </form>
        <Box display={"flex"} alignSelf={"flex-end"}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20, marginLeft: "auto" }}
            onClick={handlePersonalSubmit}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default CustomerForm;
