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
