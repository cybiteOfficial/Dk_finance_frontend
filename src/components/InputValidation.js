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
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  const minDate = "1900-01-01";
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

  const handleInput = (event) => {
    const inputDate = event.target.value;
    const selectedDate = new Date(inputDate);
    const isBeforeMinDate = selectedDate < new Date(minDate);
    const isAfterMaxDate = selectedDate > today;

    if (isAfterMaxDate) {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate if the value is a number and not negative
    if (type === "number" && parseInt(value) < 0) {
      return; // Prevent negative values
    }
    if (type === "date" && label === "DOB") {
      const selectedDate = new Date(value);
      const isBeforeMinDate = selectedDate < new Date(minDate);
      const isAfterMaxDate = selectedDate > today;

      if ( isAfterMaxDate) {
        e.preventDefault();
        return; // Prevent updating state if date is out of range
      }
    }
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
      } else if (type === "date" && label === "DOB") {
        const selectedDate = new Date(value);
        isError = selectedDate > today || isNaN(selectedDate.getTime()) || selectedDate < new Date(minDate);
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
  const handleKeyPress = (event) => {
    if (event.key === "-") {
      event.preventDefault();
    }
  };
  return type === "select" ? (
    <>
      <InputLabel>
        {label} {mandatory && <span style={{ color: "#d32f2f" }}>*</span>}
      </InputLabel>
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
      <InputLabel>
        {label} {mandatory && <span style={{ color: "#d32f2f" }}>*</span>}
      </InputLabel>
      <TextField
        type={type}
        InputProps={{
          style: {
            borderColor: mandatory ? "red" : "", // Apply red border color if mandatory and empty
          },
        }}
        // label={label}
        fullWidth={fullWidth}
        inputProps={
          type === "date" && label === "DOB" ? { min: minDate, max: maxDate } : {}
        }
        value={value}
        onChange={(e) => handleChange(e)}
        InputLabelProps={{
          shrink: true, // Ensure that the label moves to the top when the input has a value
        }}
        name={name}
        onBlur={handleBlur}
        onInput={type === "date" ? handleInput : undefined}
        onKeyPress={type === "number" ? handleKeyPress : undefined}
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
