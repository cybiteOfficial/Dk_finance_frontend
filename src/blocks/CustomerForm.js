import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Input,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { ArrowBack, ExpandLess, ExpandMore, Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  fetchCustomerByApplicantIdDataThunk,
  removeCustomer,
  removeCustomerData,
  updateCustomerDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import {
  capitalize,
  errText,
  hasErrors,
  logFormData,
} from "../components/Common";
import InputValidation from "../components/InputValidation";
import SnackToast from "../components/Snackbar";

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
  "description",
  "comment",
  "role",
];
const excludedFields = [
  "profile_photo",
  "created_at",
  "updated_at",
  "uuid",
  "cif_id",
  "applicant",
  "current_address",
  "permanent_address",
  "description",
  "comment",
  "is_current",
  "is_permanent",
  "customer",
];
const residenceStateOptions = [
  { value: "owned", label: "Owned" },
  { value: "rented", label: "Rented" },
  { value: "parented", label: "Parented" },
  { value: "spouseOwned", label: "Spouse Owned" },
  { value: "company", label: "Company" },
  { value: "govtProvided", label: "Govt Provided" },
];

const residenceTypeOptions = [
  { value: "independentHouse", label: "Independent House" },
  { value: "flat", label: "Flat" },
  { value: "slum", label: "Slum" },
  { value: "chawl", label: "Chawl" },
  { value: "kuchaHouse", label: "Kucha House" },
  { value: "others", label: "Others (Specify)" },
];
const CustomerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.authReducer.access_token);
  const { selectedCustomer, selectedCustomerData, customerDetails } =
    useSelector((state) => state.dashboardReducer);
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

  const [role, setRole] = useState(personInformation.role);

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

  const [errObject, setErrObject] = useState({
    current: {},
    permanent: {},
  });

  useEffect(() => {
    if (permanentAddressSameAsCurrent) {
      setAddressFields((prevState) => ({
        ...prevState,
        permanent: {
          ...prevState.current,
        },
      }));
      // Copy errors for permanent address fields
      setErrObject((prevState) => ({
        ...prevState,
        permanent: {
          address_line_1: prevState.current.address_line_1,
          address_line_2: prevState.current.address_line_2,
          address_line_3: prevState.current.address_line_3,
          state: prevState.current.state,
          district: prevState.current.district,
          city: prevState.current.city,
          tehsil_or_taluka: prevState.current.tehsil_or_taluka,
          pincode: prevState.current.pincode,
          landmark: prevState.current.landmark,
          residence_state: prevState.current.residence_state,
          residence_type: prevState.current.residence_type,
          stability_at_residence: prevState.current.stability_at_residence,
          distance_from_branch: prevState.current.distance_from_branch,
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

  // Function to check for missing fields
  const checkMissingFields = (fields, data) => {
    return fields.filter((field) => !data[field]);
  };
  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    // Check if any mandatory fields are empty
    const mandatoryFields = [
      "firstName",
    
    
      "dateOfBirth",
      "age",
      "gender",
    ];

    const addressMandatoryFields = [
      "address_line_1",
      "address_line_2",
      "state",
      "city",
      "pincode",
    ];

    // Check missing fields in personal information
    const missingPersonalFields = checkMissingFields(
      mandatoryFields,
      personInformation
    );

    // Check missing fields in current address
    const missingCurrentAddressFields = checkMissingFields(
      addressMandatoryFields,
      addressFields.current
    );

    // Check missing fields in permanent address
    const missingPermanentAddressFields = checkMissingFields(
      addressMandatoryFields,
      addressFields.permanent
    );
    if (
      missingPersonalFields.length > 0 ||
      missingCurrentAddressFields.length > 0 ||
      missingPermanentAddressFields.length > 0
    ) {
      // Set errObject to indicate missing fields
      setErrObject((prevState) => ({
        ...prevState,
        ...missingPersonalFields.reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {}
        ),
        current: {
          ...prevState.current,
          ...missingCurrentAddressFields.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {}
          ),
        },
        permanent: {
          ...prevState.permanent,
          ...missingPermanentAddressFields.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {}
          ),
        },
      }));
      setErrState(false, "Please fill mandatory fields", true, "error");
      return; // Stop further processing
    }

    // // Clear error for mandatory fields
    // setErrObject((prevState) => ({
    //   ...prevState,
    //   ...missingFields.reduce((acc, field) => ({ ...acc, [field]: false }), {}),
    // }));

    if (!selectedCustomer?.cif_id) {
      delete personInformation.created_at;
      delete personInformation.updated_at;
      delete personInformation.comment;
      delete personInformation.description;
      delete personInformation.cif_id;
      delete personInformation.applicant;
      delete personInformation.current_address;
      delete personInformation.permanent_address;
      delete personInformation.uuid;

      delete addressFields.current.created_at;
      delete addressFields.current.updated_at;
      delete addressFields.current.uuid;
      delete addressFields.current.is_current;
      delete addressFields.current.is_permanent;
      delete addressFields.current.customer;

      delete addressFields.permanent.created_at;
      delete addressFields.permanent.updated_at;
      delete addressFields.permanent.uuid;
      delete addressFields.permanent.is_current;
      delete addressFields.permanent.is_permanent;
      delete addressFields.permanent.customer;
    }

    const bodyFormData = new FormData();
    personInformation.role = role;
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
    logFormData(bodyFormData);

    const payload = { bodyFormData, token, cif_id: selectedCustomer?.cif_id };
    try {
      const response = await dispatch(updateCustomerDataThunk(payload));

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

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
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
  const handleCloseToast = () => {
    setErrState(false, "", false, ""); // Resetting the error state to close the toast
  };
  const fieldsMapped = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      value: personInformation.firstName,
      error: errObject.firstName,
      helperText: errObject.firstName
        ? "Please enter alphabetical characters"
        : "",
      mandatory: true,
    },
    {
      label: "Middle Name",
      name: "middle_name",
      type: "text",
      value: personInformation.middle_name,
      error: errObject.middle_name,
      helperText: errObject.middle_name
        ? "Please enter alphabetical characters"
        : "",
      mandatory: false,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      value: personInformation.lastName,
      error: errObject.lastName,
      helperText: errObject.lastName ? errText.alphabetical : "",
      mandatory: false,
    },
    {
      label: "DOB",
      name: "dateOfBirth",
      type: "date",
      value: personInformation.dateOfBirth,
      error: errObject.dateOfBirth,
      helperText: errObject.dateOfBirth
        ? "Date should be b/w 1900 & current year"
        : "",
      mandatory: true,
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      value: personInformation.age,
      error: errObject.age,
      helperText: errObject.age ? "Please enter 2 digit value" : "",
      mandatory: true,
    },
    {
      label: "Source of Income",
      name: "sourceOfIncome",
      type: "text",
      value: personInformation.sourceOfIncome,
      error: errObject.sourceOfIncome,
      helperText: errObject.sourceOfIncome ? errText.alphabetical : "",
      mandatory: false,
    },
    {
      label: "Monthly Income",
      name: "monthlyIncome",
      type: "number",
      value: personInformation.monthlyIncome,
      error: errObject.monthlyIncome,
      helperText: errObject.monthlyIncome ? errText.numerical : "",
      mandatory: false,
    },
    {
      label: "Monthly Family Income",
      name: "monthlyFamilyIncome",
      type: "number",
      value: personInformation.monthlyFamilyIncome,
      error: errObject.monthlyFamilyIncome,
      helperText: errObject.monthlyFamilyIncome ? errText.numerical : "",
      mandatory: false,
    },
  ];
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={"1rem"}
          mb={1}
        >
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="user role"
          >
            <ToggleButton value="applicant" aria-label="applicant">
              Applicant
            </ToggleButton>
            <ToggleButton value="co_applicant" aria-label="co-applicant">
              Co-Applicant
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
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
                  {/* <FormControl fullWidth> */}
                  <InputValidation
                    type="select"
                    value={personInformation.title}
                    name="title"
                    label="Title"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.title}
                    helperText={errObject.title ? errText.alphabetical : ""}
                    mandatory={false}
                    fullWidth={true}
                    selectOptions={[
                      { value: "ms", label: "MS" },
                      { value: "miss", label: "Miss" },
                      { value: "mrs", label: "Mrs" },
                      { value: "mr.", label: "Mr" },
                    ]}
                  />
                  {/* </FormControl> */}
                </Grid>

                {fieldsMapped.map((item) => {
                  return (
                    <Grid item xs={12} sm={6}>
                      <InputValidation
                        type={item.type}
                        label={item.label}
                        fullWidth={true}
                        value={item.value}
                        name={item.name}
                        setPersonalInformation={setPersonalInformation}
                        setErrObject={setErrObject}
                        errObject={errObject}
                        error={item.error}
                        helperText={item.helperText}
                        mandatory={item.mandatory}
                      />
                    </Grid>
                  );
                })}
                <Grid item xs={12} sm={6}>
                  {/* <FormControl fullWidth> */}
                  <InputValidation
                    type="select"
                    value={personInformation.residenceOwnership}
                    name="residenceOwnership"
                    label="Residence Ownership"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.residenceOwnership}
                    helperText={
                      errObject.residenceOwnership ? errText.alphabetical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                    selectOptions={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  {/* </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <FormControl fullWidth> */}
                  <InputValidation
                    type="select"
                    value={personInformation.agriculturalLand}
                    name="agriculturalLand"
                    label="Agricultural Land"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.agriculturalLand}
                    helperText={
                      errObject.agriculturalLand ? errText.alphabetical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                    selectOptions={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                  {/* </FormControl> */}
                </Grid>
                {personInformation.agriculturalLand === "yes" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <InputValidation
                        type="number"
                        label="Tentative Value of Total Agricultural Land"
                        value={personInformation.valueOfAgriculturalLand}
                        name="valueOfAgriculturalLand"
                        setPersonalInformation={setPersonalInformation}
                        setErrObject={setErrObject}
                        errObject={errObject}
                        error={errObject.valueOfAgriculturalLand}
                        helperText={
                          errObject.valueOfAgriculturalLand
                            ? errText.numerical
                            : ""
                        }
                        mandatory={false}
                        fullWidth={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputValidation
                        type="number"
                        label="Tentative Earnings from Agricultural Land"
                        value={personInformation.earningsFromAgriculturalLand}
                        name="earningsFromAgriculturalLand"
                        setPersonalInformation={setPersonalInformation}
                        setErrObject={setErrObject}
                        errObject={errObject}
                        error={errObject.earningsFromAgriculturalLand}
                        helperText={
                          errObject.earningsFromAgriculturalLand
                            ? errText.numerical
                            : ""
                        }
                        mandatory={false}
                        fullWidth={true}
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={6}>
                  {/* <FormControl fullWidth> */}
                  <InputValidation
                    type="select"
                    value={personInformation.educationQualification}
                    name="educationQualification"
                    label="Education Qualification"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.educationQualification}
                    helperText={
                      errObject.educationQualification
                        ? errText.alphabetical
                        : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                    selectOptions={[
                      { label: "Uneducated", value: "uneducated" },
                      { label: "Below 10th", value: "below10th" },
                      { label: "Secondary", value: "secondary" },
                      { label: "M.Tech", value: "mtech" },
                      { label: "Senior Secondary", value: "seniorsecondary" },
                      { label: "ITI Technical Degree", value: "iti" },
                      { label: "Graduation", value: "graduation" },
                      { label: "Post Graduation", value: "postgraduation" },
                    ]}
                  />
                  {/* </FormControl> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="number"
                    label="Number of Dependents"
                    value={personInformation.numberOfDependents}
                    name="numberOfDependents"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.numberOfDependents}
                    helperText={
                      errObject.numberOfDependents ? errText.numerical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="select"
                    label="Gender"
                    value={personInformation.gender}
                    name="gender"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.gender}
                    helperText={errObject.gender ? errText.numerical : ""}
                    mandatory={true}
                    fullWidth={true}
                    selectOptions={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <FormControl fullWidth> */}
                  <InputValidation
                    type="select"
                    label="Customer Segment"
                    value={personInformation.customerSegment}
                    name="customerSegment"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.customerSegment}
                    helperText={
                      errObject.customerSegment ? errText.alphabetical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                    selectOptions={[
                      {
                        value: "self_employee",
                        label: "Self-Employment Professional",
                      },
                      // Add other options here if needed
                    ]}
                  />
                  {/* </FormControl> */}
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
                {Object.keys(addressFields.current)
                  .filter((field) => !excludedFields.includes(field))
                  .map((field) => (
                    <Grid item xs={12} sm={6}>
                      <InputValidation
                        fieldState="address"
                        section={"current"}
                        key={field}
                        type={
                          field === "pincode" || field.includes("number")
                            ? "number"
                            : field === "residence_state" ||
                              field === "residence_type"
                            ? "select"
                            : "text"
                        }
                        label={capitalize(field)}
                        value={addressFields.current[field]}
                        name={field}
                        setAddressFields={setAddressFields}
                        setErrObject={setErrObject}
                        errObject={errObject}
                        error={errObject.current[field]}
                        helperText={
                          errObject.current[field]
                            ? field === "pincode"
                              ? errText.pinCode
                              : field === "distance_from_branch"
                              ? errText.alphaNumeric
                              : field === "address_line_1" ||
                                field === "address_line_2" ||
                                field === "address_line_3"
                              ? errText.validAddress
                              : field === "state" || field === "city"
                              ? errText.alphabetical
                              : ""
                            : ""
                        }
                        fullWidth={true}
                        selectOptions={
                          field === "residence_state"
                            ? residenceStateOptions
                            : field === "residence_type"
                            ? residenceTypeOptions
                            : []
                        }
                        mandatory={
                          field === "address_line_1" ||
                          field === "address_line_2" ||
                          field === "state" ||
                          field === "city" ||
                          field === "pincode"
                        }
                      />
                    </Grid>
                  ))}
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
                  {Object.keys(addressFields.current)
                    .filter((field) => !excludedFields.includes(field))
                    .map((field) => (
                      <Grid item xs={12} sm={6}>
                        <InputValidation
                          fieldState="address"
                          section={"permanent"}
                          key={field}
                          type={
                            field === "pincode" || field.includes("number")
                              ? "number"
                              : field === "residence_state" ||
                                field === "residence_type"
                              ? "select"
                              : "text"
                          }
                          label={capitalize(field)}
                          value={addressFields.permanent[field]}
                          name={field}
                          setAddressFields={setAddressFields}
                          setErrObject={setErrObject}
                          errObject={errObject}
                          error={errObject.permanent[field]}
                          helperText={
                            errObject.current[field]
                              ? field === "pincode"
                                ? errText.pinCode
                                : field === "distance_from_branch"
                                ? errText.alphaNumeric
                                : field === "address_line_1" ||
                                  field === "address_line_2" ||
                                  field === "address_line_3"
                                ? errText.validAddress
                                : field === "state" || field === "city"
                                ? errText.alphabetical
                                : ""
                              : ""
                          }
                          fullWidth={true}
                          selectOptions={
                            field === "residence_state"
                              ? residenceStateOptions
                              : field === "residence_type"
                              ? residenceTypeOptions
                              : []
                          }
                          mandatory={
                            field === "address_line_1" ||
                            field === "address_line_2" ||
                            field === "state" ||
                            field === "city" ||
                            field === "pincode"
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </AccordionDetails>
            <Divider />
          </Accordion>
        </form>
        <Box display={"flex"} alignSelf={"flex-end"}>
          <Button
            disabled={hasErrors(errObject)}
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
