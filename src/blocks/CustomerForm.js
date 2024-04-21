import React, { useState } from "react";

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
  AccordionActions,
  IconButton,
  Input,
} from "@mui/material";

import {
  ArrowBack,
  ExpandLess,
  ExpandMore,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const CustomerForm = () => {
  const navigate = useNavigate();
  const [personalInfoFilled, setPersonalInfoFilled] = useState(false);
  const [addressInfoFilled, setAddressInfoFilled] = useState(false);

  const [personInformation, setPersonalInformation] = useState({
    existingCustomer: "",
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    sourceOfIncome: "",
    monthlyIncome: "",
    monthlyFamilyIncome: "",
    residenceOwnership: "",
    agriculturalLand: "",
    valueOfAgriculturalLand: "",
    earningsFromAgriculturalLand: "",
    educationQualification: "",
    numberOfDependents: "",
    gender: "",
    customerSegment: "",
  });
  const [addressFields, setAddressFields] = useState({
    current: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      state: "",
      district: "",
      city: "",
      tehsilOrTaluka: "",
      pinCode: "",
      landmark: "",
      residenceStatus: "",
      residenceType: "",
      stabilityAtResidence: "",
      distanceFromBranch: "",
    },
    permanent: {
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      state: "",
      district: "",
      city: "",
      tehsilOrTaluka: "",
      pinCode: "",
      landmark: "",
      residenceStatus: "",
      residenceType: "",
      stabilityAtResidence: "",
      distanceFromBranch: "",
    },
  });
  const [permanentAddressSameAsCurrent, setPermanentAddressSameAsCurrent] =
    useState(false);
  // State for cropped image
  const [croppedImage, setCroppedImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setPersonalInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    console.log("=====", personInformation);
    console.log("=====", addressFields);
    // Handle form submission logic here
  };

  const handlePermanentAddressSameAsCurrent = () => {
    console.log("calling");
    setAddressFields((prevState) => ({
      ...prevState,
      permanent: {
        ...prevState.current,
      },
    }));
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
      const reader = new FileReader();
      reader.onload = (event) => {
        setCroppedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Box width={"90%"} margin={"0 auto"}>
        <Box display={"flex"} gap={"1rem"} justifyContent={"space-between"}>
          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Applicant ID: 1245
          </Typography>

          <Typography variant="h6" style={{ marginBottom: 20 }}>
            Customer ID : 1235
          </Typography>
        </Box>
        <Button
          onClick={() => navigate("/applicant/customers")}
          variant="contained"
          startIcon={<ArrowBack />}
          style={{ marginBottom: 20 }}
        >
          Go Back
        </Button>
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
                <Grid item xs={2} sm={7} >
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
                    <InputLabel>Existing Customer</InputLabel>
                    <Select
                      value={personInformation.existingCustomer}
                      onChange={handleChange}
                      name="existingCustomer"
                      label="Existing Customer"
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
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
                      <MenuItem value="md">MD</MenuItem>
                      <MenuItem value="ms">MS</MenuItem>
                      <MenuItem value="miss">Miss</MenuItem>
                      <MenuItem value="mrs">Mrs</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={personInformation.firstName}
                    onChange={handleChange}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Middle Name"
                    fullWidth
                    value={personInformation.middleName}
                    onChange={handleChange}
                    name="middleName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                    label="Date of Birth"
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
                    <Select
                      value={personInformation.residenceOwnership}
                      onChange={handleChange}
                      name="residenceOwnership"
                      label="Residence Ownership"
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
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
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                      <MenuItem value="selfEmploymentProfessional">
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
        <form onSubmit={handleAddressSubmit}>
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
                    label="Address Line 1"
                    fullWidth
                    value={addressFields.current.addressLine1}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          addressLine1: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address Line 2"
                    fullWidth
                    value={addressFields.current.addressLine2}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          addressLine2: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address Line 3"
                    fullWidth
                    value={addressFields.current.addressLine3}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          addressLine3: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                    label="Tehsil/Taluka"
                    fullWidth
                    value={addressFields.current.tehsilOrTaluka}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          tehsilOrTaluka: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pin Code"
                    fullWidth
                    value={addressFields.current.pinCode}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          pinCode: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                      value={addressFields.current.residenceStatus}
                      onChange={(e) =>
                        setAddressFields((prevState) => ({
                          ...prevState,
                          current: {
                            ...prevState.current,
                            residenceStatus: e.target.value,
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
                      value={addressFields.current.residenceType}
                      onChange={(e) =>
                        setAddressFields((prevState) => ({
                          ...prevState,
                          current: {
                            ...prevState.current,
                            residenceType: e.target.value,
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
                    label="Stability at Residence"
                    fullWidth
                    value={addressFields.current.stabilityAtResidence}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          stabilityAtResidence: e.target.value,
                        },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Distance from Branch"
                    fullWidth
                    value={addressFields.current.distanceFromBranch}
                    onChange={(e) =>
                      setAddressFields((prevState) => ({
                        ...prevState,
                        current: {
                          ...prevState.current,
                          distanceFromBranch: e.target.value,
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
                  Same as Current Address
                </Button>
                <Grid container spacing={2}>
                  {/* Add permanent address fields here */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent Address Line 1"
                      value={addressFields.permanent.addressLine1}
                      onChange={handlePermanentAddressChange("addressLine1")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent Address Line 2"
                      value={addressFields.permanent.addressLine2}
                      onChange={handlePermanentAddressChange("addressLine2")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent Address Line 3"
                      value={addressFields.permanent.addressLine3}
                      onChange={handlePermanentAddressChange("addressLine3")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent State"
                      value={addressFields.permanent.state}
                      onChange={handlePermanentAddressChange("state")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent District"
                      value={addressFields.permanent.district}
                      onChange={handlePermanentAddressChange("district")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent City"
                      value={addressFields.permanent.city}
                      onChange={handlePermanentAddressChange("city")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent Tehsil/Taluka"
                      value={addressFields.permanent.tehsilOrTaluka}
                      onChange={handlePermanentAddressChange("tehsilOrTaluka")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Permanent Pin Code"
                      value={addressFields.permanent.pinCode}
                      onChange={handlePermanentAddressChange("pinCode")}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
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
                          "residenceStatus"
                        )}
                        value={addressFields.permanent.residenceStatus}
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
                        onChange={handlePermanentAddressChange("residenceType")}
                        value={addressFields.permanent.residenceType}
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
                      onChange={handlePermanentAddressChange(
                        "stabilityAtResidence"
                      )}
                      value={addressFields.permanent.stabilityAtResidence}
                      label="Permanent Stability at Residence"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={handlePermanentAddressChange(
                        "distanceFromBranch"
                      )}
                      value={addressFields.permanent.distanceFromBranch}
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
    </div>
  );
};

export default CustomerForm;
