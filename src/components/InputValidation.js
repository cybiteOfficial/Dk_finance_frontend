import React, { useState, useEffect } from "react";
import { TextField, MenuItem, InputLabel } from "@mui/material";

const InputValidation = ({
  label,
  value,
  type,
  name,
  setPersonalInformation,
  setErrObject,
  errObject,
  error,
  helperText,
  fullWidth,
  mandatory,
  selectOptions,
  section,
  fieldState,
  setAddressFields,
}) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched && label === "Gender" && value === "") {
      setErrObject((prevState) => ({
        ...prevState,
        [name]: true,
      }));
    }
  }, [touched]);

  const handleTouched = () => {
    if (mandatory && !touched && value.trim() === "") {
      setTouched(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (fieldState === "address") {
      setAddressFields((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [name]: value,
        },
      }));
    } else {
      setPersonalInformation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    let isError = false;

    if (mandatory && value.trim() === "") {
      isError = true;
    } else {
      if (type === "text") {
        isError =
          name === "distance_from_branch"
            ? !/^[a-zA-Z0-9 ]*$/.test(value)
            : !/^[a-zA-Z ]*$/.test(value);
      } else if (type === "number" && label === "Age") {
        isError = !/^\d{2}$/.test(value);
      } else if (type === "number" && name === "pincode") {
        isError = !/^\d{6}$/.test(value);
      } else if (type === "number") {
        isError = parseInt(value) < 0;
      }
    }
    if (fieldState === "address") {
      setErrObject((prevState) => ({
        ...prevState,
        [section]: {
          [name]: isError,
        },
      }));
    } else {
      setErrObject((prevState) => ({
        ...prevState,
        [name]: isError,
      }));
    }
  };
  const handleBlur = () => {
    if (mandatory && value.trim() === "") {
      if (fieldState === "address") {
        setErrObject((prevState) => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            [name]: false,
          },
        }));
      } else {
        setErrObject((prevState) => ({
          ...prevState,
          [name]: true,
        }));
      }
    }
  };

  return type === "select" ? (
    <>
      <InputLabel>{label} {mandatory && <span style={{color:"#d32f2f"}}>*</span>}</InputLabel>
      <TextField
        select
        // label={label}
        fullWidth={fullWidth}
        value={value}
        onChange={(e) => handleChange(e)}
        onClick={handleTouched}
        name={name}
        onBlur={handleBlur}
        InputLabelProps={{
          shrink: true, // Ensure that the label moves to the top when the input has a value
        }}
        error={error}
        helperText={
          error
            ? mandatory && value.trim() === ""
              ? `${label} is required`
              : helperText
            : ""
        }
      >
        {selectOptions?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  ) : (
    <>
      <InputLabel>{label} {mandatory && <span style={{color:"#d32f2f"}}>*</span>}</InputLabel>
      <TextField
        type={type}
        InputProps={{
          style: {
            borderColor: mandatory ? "red" : "", // Apply red border color if mandatory and empty
          },
        }}
        // label={label}
        fullWidth={fullWidth}
        value={value}
        onChange={(e) => handleChange(e)}
        InputLabelProps={{
          shrink: true, // Ensure that the label moves to the top when the input has a value
        }}
        name={name}
        onBlur={handleBlur}
        error={error}
        helperText={
          error
            ? mandatory && value.trim() === ""
              ? `${label} is required`
              : helperText
            : ""
        }
      />
    </>
  );
};

export default InputValidation;
