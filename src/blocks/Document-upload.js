import React, { useEffect, useState } from "react";
import { ArrowBack, Upload } from "@mui/icons-material";
import {
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  Input,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  fetchDocumentDataThunk,
  updateDocumentDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";

const DocumentUpload = () => {
  const { appId, uuid } = useSelector((state) => state.authReducer);
  const token = useSelector((state) => state.authReducer.access_token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyValuePairs, setKeyValuePairs] = useState([]);
  // Define a loading state for each file
  const [loadingStates, setLoadingStates] = useState();

  const [data, setData] = useState({
    description: "",
    remarks: "",
  });
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });

  const handleGoBack = () => {
    navigate("/applicant/customers");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleTextFieldChange = (index, value, key) => {
    const updatedPairs = [...keyValuePairs];
    if (key === "document_name") {
      updatedPairs[index].key = value;
    } else if (key === "document_id") {
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
      { key: "", value: "", fileName: "", file: "", document_type: "others" },
    ]);
  };

  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({ loading, errMsg, openSnack, severity });
  };

  const handleDeleteKeyValuePair = (index) => {
    const updatedPairs = [...keyValuePairs];
    updatedPairs.splice(index, 1);
    setKeyValuePairs(updatedPairs);
  };

  const callApi = async (index) => {
    setErrState(true, "", false, "");
    const formData = new FormData();
    formData.append("document_name", keyValuePairs[index].key);
    formData.append("document_type", "other");
    formData.append("document_id", keyValuePairs[index].value);
    formData.append("file", keyValuePairs[index].file);

    formData.append("application", uuid);
    if (data.remarks) {
      formData.append("comment", data.remarks);
    } else {
      formData.append("comment", "");
    }

    if (data.description) {
      formData.append("description", data.description);
    } else {
      formData.append("description", "");
    }

    const payload = { formData, token };

    try {
      const response = await dispatch(updateDocumentDataThunk(payload));
      const { error, message } = response.payload;
      if (error) {
        setErrState(false, message, true, "error");
      } else {
        setErrState(false, message, true, "success");
      }
    } catch (error) {
      console.error("error: ", error);
      setErrState(false, "", false, "");
    }
  };


  const handleSubmit = async (indexer) => {

    if (!keyValuePairs[indexer].fileName) {
      setErrState(false, "No file selected", true, "warning");
      return;
    }

    // Set loading state for the clicked indexer to true
    setLoadingStates(indexer);

    try {
      await callApi(indexer);
    } finally {
      // Reset loading state for the clicked indexer
      setLoadingStates(null);
    }
  };

  return (
    <>
      <SnackToast
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
        <Typography variant="subtitle1" style={{ fontWeight:700 }}>
          Application ID: {appId}
        </Typography>
      
        <Typography variant="h5">Document Upload</Typography>
        <form>
          {keyValuePairs.map((pair, indexer) => (
            <Grid
              container
              spacing={2}
              key={indexer}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid item xs={2}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Document name"
                  value={pair.key}
                  onChange={(e) =>
                    handleTextFieldChange(
                      indexer,
                      e.target.value,
                      "document_name"
                    )
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Document ID"
                  value={pair.value}
                  onChange={(e) =>
                    handleTextFieldChange(
                      indexer,
                      e.target.value,
                      "document_id"
                    )
                  }
                />
              </Grid>
              <Grid item xs={2}>
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
                      handleTextFieldChange(indexer, e.target.files[0], "file")
                    }
                    style={{ display: "none" }}
                    id={`file-input${indexer}`}
                  />
                  <label htmlFor={`file-input${indexer}`}>
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
                <IconButton onClick={() => handleSubmit(indexer)}>
                  <Upload />
                </IconButton>
              </Grid>
              <Grid item xs={1} style={{ display: "flex", gap: "1rem" }}>
                <IconButton onClick={() => handleDeleteKeyValuePair(indexer)}>
                  <DeleteIcon />
                  {loadingStates === indexer && <CircularProgress />}
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
            fullWidth
            onClick={() => navigate("/applicant/customers")}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default DocumentUpload;
