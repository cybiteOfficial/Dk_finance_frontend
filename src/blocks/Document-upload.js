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
import { extractFileName, logFormData } from "../components/Common";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      fetchDocumentDataApi()
    }
    fetchData();
    return () => {
      // dispatch(removeLoan({ payload: {}, type: "removeLoan" }));
    };
  }, []);

  const token = useSelector((state) => state.authReducer.access_token);
  const {appId} = useSelector((state) => state.authReducer);
  const dashboardReducer = useSelector((state) => state.dashboardReducer);


  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const[isRemarks,setIsRemarks]=useState(false)
  const [loadingStates, setLoadingStates] = useState();

  const [data, setData] = useState({
    description: "",
    comment: "",
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
      updatedPairs[index].document_name = value;
    } else if (key === "document_id") {
      updatedPairs[index].document_id = value;
    } else if (key === "file") {
      updatedPairs[index].fileName = value?.name;
      updatedPairs[index].file = value;
    }
    setKeyValuePairs(updatedPairs);
  };

  const addKeyValuePair = () => {
    setKeyValuePairs([
      ...keyValuePairs,
      { document_name: "", document_id: "", fileName: "", file: "" },
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

  const handleExtractFormValues = (dataObject) => {
    const keyValuePairs = dataObject.map((item) => {
      return {
        document_name: item.document_name,
        document_id: item.document_id,
        file: item.file,
        fileName: extractFileName(item.file),
      };
    });

    const data = {
      description: dataObject[0]?.description,
      comment: dataObject[0]?.comment,
    };

    setData(data);
    setKeyValuePairs(keyValuePairs);
  };

  const fetchDocumentDataApi = async () => {
    const payload = {application_id:appId,token, document_type:"other"}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchDocumentDataThunk(payload));
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
      
      if (data && data.length > 0) {
        handleExtractFormValues(data);
        setErrState(false, "", false, "success");
      }
    } catch (error) {
      setErrState(false, "", false, "success");
      console.error('error: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRemarks) {
      if (!data.comment.trim()) {
        setErrState(false, "Please add a remark", true, "warning");
        return;
      }

      const modifiedKeyValuePairs = keyValuePairs.map((item) => {
        return {
          document_name: item.document_name,
          document_id: item.document_id,
          file: item.file,
        };
      });
    
      const bodyFormData = new FormData();

      bodyFormData.append("document_type", "other");
      bodyFormData.append("applicant_id", appId);

      // modifiedKeyValuePairs.forEach((item,index)=>{
      //   bodyFormData.append(`document_name${index}`, item.document_name)
      //   bodyFormData.append(`document_id${index}`, item.document_id)
      //   bodyFormData.append(`file${index}`, item.file)
      // })
      bodyFormData.append("documents", modifiedKeyValuePairs);
     

      logFormData(bodyFormData);
      const payload = { bodyFormData, token };
      try {
        const response = await dispatch(updateDocumentDataThunk(payload));

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
    } else {
      setErrState(false, "Please add a remark", true, "warning");
      setIsRemarks(true);
      return;
    }
  };
  const handleCloseToast = () => {
    setErrState(false, "", false, ""); // Resetting the error state to close the toast
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

        <Typography variant="h5">Document Upload</Typography>
        <form>
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
                  value={pair.document_name}
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
                  value={pair.document_id}
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

              <Grid item xs={1} style={{ display: "flex", gap: "1rem" }}>
                <IconButton onClick={() => handleDeleteKeyValuePair(indexer)}>
                  <DeleteIcon />
                  {loadingStates === indexer && <CircularProgress />}
                </IconButton>
              </Grid>
            </Grid>
          ))}
       

          {isRemarks && (
            <TextField
              label="Remarks"
              fullWidth
              margin="normal"
              name="comment"
              value={data.comment}
              onChange={handleInputChange}
            />
          )}
          <Button variant="contained" type="button" onClick={addKeyValuePair}>
            Add More
          </Button>
          <Button
            type="submit"
            style={{ marginBottom: 10, marginTop: 10, marginLeft: "auto" }}
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default DocumentUpload;
