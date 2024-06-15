import { Typography, styled, Chip, TextField } from "@mui/material";
import { theme } from "../theme";

export const errText = {
  alphabetical: "Please enter alphabetical characters",
  numerical: "Please enter numerical character",
  twoDigit: "Please enter 2 digit value",
  pinCode: "Invalid pincode format",
  alphaNumeric: "Please enter alphanumeric characters",
  validAddress : "Invalid address format"
};

export const checkTokenExpired = (message, response,setErrState,dispatch,removeStore,navigate) => {
  if (message === "Request failed with status code 401") {
    setErrState(false, "Token expired, please log in again.", true, "error");
    return setTimeout(() => {
      dispatch(removeStore({}));
      navigate("/");
    }, 500);
  } else {
    setErrState(false, response.payload.response.data.message, true, "error");
  }
};

export const capitalize = (str) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
export const hasErrors = (obj) => {
  // Helper function to check if an object has any true values
  const checkObject = (object) => {
    for (const key in object) {
      if (object[key] === true) return true;
      if (typeof object[key] === 'object' && checkObject(object[key])) return true;
    }
    return false;
  };

  return checkObject(obj);
};

const StyledChip = styled(Chip)(
  ({
    theme,
    propColor,
    propFontSize,
    propFontWeight,
    propWidth,
    propHeight,
    propBorderRadius,
    propBackgroundColor,
    textTransform,
  }) => ({
    "&.MuiChip-root": {
      width: propWidth,
      height: propHeight,
      borderRadius: propBorderRadius,
      backgroundColor: propBackgroundColor,
      color: propColor,
      fontSize: propFontSize,
      fontWeight: propFontWeight,
      textTransform: textTransform,
    },
  })
);
export const logFormData = (bodyFormData) => {
  for (const [key, value] of bodyFormData?.entries()) {
    console.log(`${key}: ${value}`);
  }
};

export const extractFileName = (url) => {
  if (url) {
    const pathname = new URL(url).pathname;

    // Using string manipulation to extract the filename with extension
    const filenameWithExtension = pathname.split("/").pop();
    return filenameWithExtension;
  } else {
    return "";
  }
};

export const CommonChip = (props) => {
  return (
    <StyledChip
      {...props}
      textTransform={props.textTransform}
      propFontSize={props.propFontSize}
      propFontWeight={props.propFontWeight}
      propColor={props.propColor}
      label={props.label}
      propWidth={props.propWidth}
      propHeight={props.propHeight}
      propBorderRadius={props.propBorderRadius}
      propBackgroundColor={props.propBackgroundColor}
      onClick={props.handleClick}
    />
  );
};

export const StyledTypography = ({
  color,
  align,
  variant,
  weight,
  children,
  capitalize,
}) => {
  return (
    <Typography
      align={align && align}
      variant={variant}
      style={{
        fontWeight: weight ? weight : 400,
        color: color ? color : theme.palette.black.main,
        textTransform: capitalize,
      }}
    >
      {children}
    </Typography>
  );
};

export const sortingFilter = [
  {
    id: "1",
    label: "Newest to oldest",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
  {
    id: "2",
    label: "Oldest to newest",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
  {
    id: "3",
    label: "Sort by date",
    selectedBgColor: theme.palette.primary.main,
    selectedColor: theme.palette.white.main,
    bgColor: theme.palette.lightSecondaryV3.main,
    color: theme.palette.primary.main,
  },
];
export const pdfData = {
  loan_details: [
    {
     
      loan_id: "ln_37446823",
      product_type: "normal",
      transaction_type: "purchase",
      case_tag: "normal",
      applied_loan_amount: "133.00",
      applied_tenure: 12,
      applied_ROI: "12.00",
      description: "test",
      processing_fees: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      valuation_charges: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      legal_and_incidental_fee: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      stamp_duty_applicable_rate: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      rcu_charges_applicable_rate: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      stamping_expenses_applicable_rate: {
        tax_amount: "",
        total_amount: "",
        charge_amount: "",
        applicable_rate: "",
      },
      applicant: "app_63429322",
      comment: "test",
    },
  ],
  caf_details: [
    {
      uuid: "550dfbb6-20ee-4f73-bd51-c7854d55f3f9",
      caf_id: "caf_90770823",
      tentative_amt: 344.0,
      placeOfPdAddress: "",
      location: "",
      extra_data: [
        {
          key: "aadhar",
          value: "1234",
        },
      ],
      description: "sasa",
      pdWith: "cif_60278707",
      applicant: "app_63429322",
      comment: "ass",
    },
  ],
  collateral_details: [
    {
      uuid: "2b3d2087-b01c-43dc-8629-8fa814eaf059",
      
      collateral_id: "cltrl_28060338",
      collateralType: "automobile",
      collateralName: "Masss",
      primarySecondary: "",
      valuationRequired: "edw",
      relationshipWithLoan: "",
      propertyOwner: "abc",
      propertyCategory: "plot",
      propertyType: "plot",
      occupationStatus: "engineer",
      propertyStatus: "good",
      propertyTitle: "asdasd",
      houseFlatShopNo: "2",
      khasraPlotNo: "2",
      locality: "indai",
      village: "",
      state: "Madhya Pradesh",
      district: "",
      city: "Indore",
      taluka: "",
      pincode: "453331",
      landmark: "",
      estimatedPropertyValue: null,
      documentName: "",
      documentUpload: "",
      description: "testt",
      isExisting: "",
      applicant: "33ff435a-4336-44b1-b8d7-97bc96155e60",
      comment: "remaek",
    },
  ],
  document_details_other: [],
  document_details_photos: [],
};
{
  /* <Grid item xs={12} sm={6}>
                  <InputValidation
                    label="First Name"
                    name="firstName"
                    type="text"
                    fullWidth={true}
                    value={personInformation.firstName}
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.firstName}
                    helperText={
                      errObject.firstName
                        ? "Please enter alphabetical characters"
                        : ""
                    }
                    mandatory={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="text"
                    label="Middle Name"
                    fullWidth={true}
                    value={personInformation.middle_name}
                    name="middle_name"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.middle_name}
                    helperText={
                      errObject.middle_name
                        ? "Please enter alphabetical characters"
                        : ""
                    }
                    mandatory={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="text"
                    label="Last Name"
                    fullWidth={true}
                    value={personInformation.lastName}
                    name="lastName"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.lastName}
                    helperText={
                      errObject.lastName
                        ? "Please enter alphabetical characters"
                        : ""
                    }
                    mandatory={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="date"
                    label={"DOB"}
                    value={personInformation.dateOfBirth}
                    name="dateOfBirth"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.dateOfBirth}
                    helperText={
                      errObject.dateOfBirth
                        ? "Please enter alphabetical characters"
                        : ""
                    }
                    mandatory={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="number"
                    label="Age"
                    value={personInformation.age}
                    name="age"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.age}
                    helperText={
                      errObject.age ? "Please enter 2 digit value" : ""
                    }
                    mandatory={true}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="text"
                    label="Source of Income"
                    value={personInformation.sourceOfIncome}
                    name="sourceOfIncome"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.sourceOfIncome}
                    helperText={
                      errObject.sourceOfIncome ? errText.alpabetical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="number"
                    label="Monthly Income"
                    value={personInformation.monthlyIncome}
                    name="monthlyIncome"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.monthlyIncome}
                    helperText={
                      errObject.monthlyIncome ? errText.numerical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputValidation
                    type="number"
                    label="Monthly Family Income"
                    value={personInformation.monthlyFamilyIncome}
                    onChange={handleChange}
                    name="monthlyFamilyIncome"
                    setPersonalInformation={setPersonalInformation}
                    setErrObject={setErrObject}
                    errObject={errObject}
                    error={errObject.monthlyFamilyIncome}
                    helperText={
                      errObject.monthlyFamilyIncome ? errText.numerical : ""
                    }
                    mandatory={false}
                    fullWidth={true}
                  />
                </Grid> */
}
