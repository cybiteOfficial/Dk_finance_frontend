import React, { useState,useEffect } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, Box, Typography, Grid, TextField, Input,IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import SnackToast from "../components/Snackbar";
import { checkTokenExpired, extractFileName, logFormData } from "../components/Common";
import { fetchPhotographDataThunk, removeStore, updateDocumentDataThunk, updatePhotographDataThunk } from "../redux/reducers/dashboard/dashboard-reducer";

const PhotoUpload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
     fetchPhotographDataApi()
    }
    fetchData();
    return () => {
      // dispatch(removeLoan({ payload: {}, type: "removeLoan" }));
    };
  }, []);

  const token = useSelector((state) => state.authReducer.access_token);
  const {appId} = useSelector((state) => state.authReducer);
  const dashboardReducer = useSelector((state) => state.dashboardReducer);

  const [data,setData]=useState({
    description:"",
    comment:""
  })
  const[isRemarks,setIsRemarks]=useState(false)
  const [files,setFiles]= useState([]);
  const [prevfiles,setPrevFiles]= useState([])
  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    openSnack: false,
    severity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleGoBack = () => {
    navigate("/applicant/customers");
  };

  const handleDeleteKeyValuePair = (index) => {
    const updatedPairs = [...files];
    updatedPairs.splice(index, 1);
    setFiles(updatedPairs);
  };

  const handleTextFieldChange = (e) => {
    if (e.target.files[0]) {
      const objectURL = URL.createObjectURL(e.target.files[0]);
      setPrevFiles([...prevfiles,objectURL])
      setFiles([...files, e.target.files[0]]);
    }
  };

  const setErrState = (loading, errMsg, openSnack, severity) => {
    setErr({ loading, errMsg, openSnack, severity });
  };


  const handleExtractFormValues = (dataObject) => {
    const keyValuePairs = dataObject.map((item) => {
      return {
        file: extractFileName(item.file),
      };
    });

    const data = {
      description: dataObject[0]?.description,
      comment: dataObject[0]?.comment,
    };

    setData(data);
    setFiles(keyValuePairs);
  };


  const fetchPhotographDataApi = async () => {
    const payload = {application_id:appId,token}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchPhotographDataThunk(payload));
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


      const bodyFormData = new FormData();

      bodyFormData.append("document_type", "photos");
      bodyFormData.append("application_id", appId);
      files.forEach((file) => {
        bodyFormData.append('file', file);
      });

      logFormData(bodyFormData);
      const payload = { bodyFormData, token };
      try {
        const response = await dispatch(updatePhotographDataThunk(payload));

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

        <Typography variant="h5">Photograph Upload</Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              <Box ml={"auto"}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleTextFieldChange(e)}
                  style={{ display: "none" }}
                  id="file"
                />
                <label htmlFor="file">
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
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {files?.map((item, index) => (
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid item xs={10}>
                <img
                    src={prevfiles[index]}
                    alt="Preview"
                    style={{ width: "200px", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => handleDeleteKeyValuePair(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>

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
            style={{ marginBottom: 10, marginTop: 10, marginLeft: "auto" }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default PhotoUpload
