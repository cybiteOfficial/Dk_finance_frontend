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
  removeStore,
  updateDocumentDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";
import { checkTokenExpired, extractFileName, logFormData } from "../components/Common";

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

  const [prevkeyValuePairs, setprevKeyValuePairs] = useState([]);
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [updateItem,setUpdateItem] = useState([])
  const[isRemarks,setIsRemarks]=useState(false);
  const[files,setFiles]=useState([]);
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
    const attachMents = [...files];
    const uuid = updatedPairs[index].uuid; // Get the UUID from keyValuePairs

    // Find the updateItem entry for the given UUID
    let updateItems = [...updateItem];
    let updateItemIndex = updateItems.findIndex((item) => item.uuid === uuid);
    if (updateItemIndex === -1) {
      updateItems.push({ uuid });
      updateItemIndex = updateItems.length - 1;
    }

    // Update keyValuePairs and track changes
    if (key === "document_name") {
      updatedPairs[index].document_name = value;
      if (prevkeyValuePairs[index]?.document_name !== value) {
        updateItems[updateItemIndex].document_name = value;
        updateItems[updateItemIndex].file_updated = false;
      } else {
        delete updateItems[updateItemIndex].document_name;
      }
    } else if (key === "document_id") {
      updatedPairs[index].document_id = value;
      if (prevkeyValuePairs[index]?.document_id !== value) {
        updateItems[updateItemIndex].document_id = value;
        updateItems[updateItemIndex].file_updated = false;
      } else {
        delete updateItems[updateItemIndex].document_id;
      }
    } else if (key === "file") {
      updatedPairs[index].fileName = value?.name;
      attachMents[index] = value;

      // Check if the file selection is the same as the previous one
      if (value?.name === prevkeyValuePairs[index]?.fileName) {
        updateItems[updateItemIndex].file_updated = false;
      } else {
        updatedPairs[index].fileName = value?.name; // Update fileName in keyValuePairs
        attachMents[index] = value; // Update attachments
        updateItems[updateItemIndex].file_updated = true;
      }
      // Handle image preview using createObjectURL
      if (value && value.type.startsWith('image/')) {
        const objectURL = URL.createObjectURL(value);
        updatedPairs[index].filePreview = objectURL;
        console.log('Object URL:', objectURL); // Logging the URL
      } else {
        updatedPairs[index].filePreview = '';
      }
    }

    // Remove the updateItem if it only contains the uuid and no changes
    if (Object.keys(updateItems[updateItemIndex]).length === 1) {
      updateItems.splice(updateItemIndex, 1);
    }

    setKeyValuePairs(updatedPairs);
    setFiles(attachMents);
    setUpdateItem(updateItems);
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

  const handleDeleteKeyValuePair = (index,uuid) => {
    const updatedPairs = [...keyValuePairs];
    const attachMents = [...files];
    updatedPairs.splice(index, 1);
    attachMents.splice(index, 1);
    setKeyValuePairs(updatedPairs);
    setFiles(attachMents);
    const deleteUpdatedItem = updateItem.filter((item) => item.uuid !== uuid);
    setUpdateItem(deleteUpdatedItem);
  };

  const handleExtractFormValues = (dataObject) => {
    const keyValuePairs = dataObject.map((item) => {
      return {
        uuid: item.uuid,
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
    const deepCopyKeyValuePairs = keyValuePairs.map((item) => ({ ...item }));
    setprevKeyValuePairs(deepCopyKeyValuePairs);
  };

  const fetchDocumentDataApi = async () => {
    const payload = {application_id:appId,token, document_type:"other"}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchDocumentDataThunk(payload));
      const { data, error, message,code } = response.payload;
      if (code) {
        checkTokenExpired(
          message,
          response,
          setErrState,
          dispatch,
          removeStore,
          navigate
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
        };
      });
    const isNew =  prevkeyValuePairs.length < keyValuePairs.length
  
    const api = updateItem.length > 0  && isNew===false? "put": isNew && "post"

      const bodyFormData = new FormData();
      bodyFormData.append(
        "documents",
        updateItem.length > 0
          ? JSON.stringify(updateItem)
          : JSON.stringify(modifiedKeyValuePairs)
      );
      bodyFormData.append("document_type", "other");
      files.forEach((file) => {
        bodyFormData.append("file", file);
      });
      bodyFormData.append("application_id", appId);
     

      logFormData(bodyFormData);
      const payload = { bodyFormData, token,api };
      try {
        const response = await dispatch(updateDocumentDataThunk(payload));
       

        const { error, message, code } = response.payload;
        if (code) {
          checkTokenExpired(
            message,
            response,
            setErrState,
            dispatch,
            removeStore,
            navigate
          );
        } else if (error) {
          setUpdateItem([])
          return setErrState(false, message, true, "error");
        } else {
          setIsRemarks(false);
          setErrState(false, message, true, "success");
          setUpdateItem([])
          navigate("/applicant/customers");
        }
      } catch (error) {
        setUpdateItem([])
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
          <Button variant="contained" type="button" onClick={addKeyValuePair}>
            Add More
          </Button>

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
              <Grid item xs={3}>
                {/* <TextField
                  fullWidth
                  label="Uploaded File"
                  margin="normal"
                  name="uploadedFile"
                  value={pair.fileName}
                /> */}
              
                  <img
                    src={pair.filePreview || pair.fileName}
                    alt="Preview"
                    style={{ width: "200px", height: "100px" }}
                  />
              
              </Grid>
              <Grid item xs={2}>
                <Box ml={"auto"}>
                  <Input
                    type="file"
                       accept="image/*"
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
                <IconButton
                  onClick={() => handleDeleteKeyValuePair(indexer, pair.uuid)}
                >
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

          <Button
            disabled={process.env.REACT_APP_DISABLED === "TRUE"}
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
