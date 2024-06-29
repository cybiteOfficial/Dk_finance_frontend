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
import GetAppIcon from "@mui/icons-material/GetApp";

import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
	deleteDocumentDataThunk,
	fetchDocumentDataThunk,
	removeStore,
	updateDocumentDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";
import {
	checkTokenExpired,
	extractFileName,
	hasExtension,
	isImage,
	logFormData,
} from "../components/Common";

const DocumentUpload = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			fetchDocumentDataApi();
		}
		fetchData();
		return () => {
			// dispatch(removeLoan({ payload: {}, type: "removeLoan" }));
		};
	}, []);

	const token = useSelector((state) => state.authReducer.access_token);
	const { appId } = useSelector((state) => state.authReducer);
	const dashboardReducer = useSelector((state) => state.dashboardReducer);

	const [prevkeyValuePairs, setprevKeyValuePairs] = useState([]);
	const [keyValuePairs, setKeyValuePairs] = useState([]);
	const [updateItem, setUpdateItem] = useState([]);
	const [isRemarks, setIsRemarks] = useState(false);
	const [files, setFiles] = useState([]);
	const [loadingStates, setLoadingStates] = useState();

	const [data, setData] = useState({
		description: "",
		comment: "",
	});
	const [prevData, setPrevData] = useState({
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
		const updatedFiles = [...files];
		const uuid = updatedPairs[index].uuid; // Get the UUID from keyValuePairs
	  
		// Update keyValuePairs and track changes
		if (key === "document_name") {
		  updatedPairs[index].document_name = value;
		} else if (key === "document_id") {
		  updatedPairs[index].document_id = value;
		} else if (key === "file") {
		  updatedPairs[index].fileName = value?.name;
		  updatedFiles[index] = value;
	  
		  // Handle image preview using createObjectURL
		  if (value && value.type.startsWith("image/")) {
			const objectURL = URL.createObjectURL(value);
			updatedPairs[index].filePreview = objectURL;
		  } else if (value && value.name.endsWith(".pdf")) {
			updatedPairs[index].filePreview = value.name;
		  }
		}
	  
		// Update updateItem based on changes
		let updatedUpdateItems = [...updateItem];
		let updateItemIndex = updatedUpdateItems.findIndex((item) => item.uuid === uuid);
		if (updateItemIndex === -1) {
		  updatedUpdateItems.push({ uuid });
		  updateItemIndex = updatedUpdateItems.length - 1;
		}
	  
		if (key === "document_name" || key === "document_id") {
		  updatedUpdateItems[updateItemIndex][key] = value;
		  updatedUpdateItems[updateItemIndex].file_updated = "false";
		} else if (key === "file") {
		  if (value?.name === prevkeyValuePairs[index]?.fileName) {
			updatedUpdateItems[updateItemIndex].file_updated = "false";
		  } else {
			updatedUpdateItems[updateItemIndex].file_updated = "true";
		  }
		}
	  
		// Remove updateItem if no actual changes
		if (Object.keys(updatedUpdateItems[updateItemIndex]).length === 1) {
		  updatedUpdateItems.splice(updateItemIndex, 1);
		}
	  
		setKeyValuePairs(updatedPairs);
		setFiles(updatedFiles);
		setUpdateItem(updatedUpdateItems);
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

	const handleDeleteKeyValuePair = (index, uuid) => {
		const updatedPairs = [...keyValuePairs];
		const attachMents = [...files];
		updatedPairs.splice(index, 1);
		attachMents.splice(index, 1);
		setKeyValuePairs(updatedPairs);
		setFiles(attachMents);
		const deleteUpdatedItem = updateItem.filter((item) => item.uuid !== uuid);
		setUpdateItem(deleteUpdatedItem);
		handleDeleteApi(uuid);
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
		const deepCopyData = JSON.stringify(data);
		setprevKeyValuePairs(deepCopyKeyValuePairs);
		setPrevData(deepCopyData);
	};

	const handleDeleteApi = async (uuid) => {
		if (uuid) {
			setLoadingStates(true);
			const bodyFormData = new FormData();
			bodyFormData.append("document_uuid", uuid);
			const payload = { bodyFormData, token };

			try {
				const response = await dispatch(deleteDocumentDataThunk(payload));

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
					setLoadingStates(false);
					return setErrState(false, message, true, "error");
				} else {
					setLoadingStates(false);
					setErrState(false, message, true, "success");
				}
			} catch (error) {
				setLoadingStates(false);
				console.error("error: ", error);
			}
		}
	};

	const fetchDocumentDataApi = async () => {
		const payload = { application_id: appId, token, document_type: "other" };
		try {
			setErrState(true, "", false, "");
			const response = await dispatch(fetchDocumentDataThunk(payload));
			const { data, error, message, code } = response.payload;
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
			console.error("error: ", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isRemarks) {
			if (!data.comment?.trim()) {
				setErrState(false, "Please add a remark", true, "warning");
				return;
			}

			const modifiedKeyValuePairs = keyValuePairs.map((item) => {
				return {
					document_name: item.document_name,
					document_id: item.document_id,
				};
			});
			const isNew = prevkeyValuePairs.length < keyValuePairs.length;

			var api =
				updateItem.length > 0 && isNew === false ? "put" : isNew && "post";
			console.log("files", files);
			console.log("updateItem", updateItem);
			let filteredData;
			if (api === "post") {
				filteredData = updateItem.map(({ file_updated, ...rest }) => rest);
			} else {
				filteredData = updateItem;
			}
			// Check if only description or comment has been altered
			const isOnlyDescriptionOrCommentChanged =
				data.comment !== prevData.comment ||
				data.description !== prevData.description;

			const bodyFormData = new FormData();
			if (api === "put" || api === "post") {
				bodyFormData.append(
					"documents",
					updateItem.length > 0
						? JSON.stringify(filteredData)
						: JSON.stringify(modifiedKeyValuePairs)
				);
				bodyFormData.append("document_type", "other");
				files.forEach((file) => {
					bodyFormData.append("file", file);
				});
				bodyFormData.append("application_id", appId);
				bodyFormData.append("comment", data.comment);
				bodyFormData.append("description", data.description);
			} else if (isOnlyDescriptionOrCommentChanged) {
				bodyFormData.append("application_id", appId);
				bodyFormData.append("comment", data.comment);
				bodyFormData.append("description", data.description);
				api = "put";
			}

			// If no changes detected, return with a warning
			if (!api) {
				setErrState(false, "No changes to save", true, "warning");
				return;
			}

			logFormData(bodyFormData);
			let payload;
			let query = "other";
			if (api === "post") {
				payload = { bodyFormData, token, api };
			} else {
				payload = { bodyFormData, token, api, query };
			}

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
					return setErrState(false, message, true, "error");
				} else {
					setIsRemarks(false);
					setFiles([]);
					setErrState(false, message, true, "success");
					setUpdateItem([]);
					navigate("/applicant/customers");
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
					{loadingStates && <CircularProgress />}
					{keyValuePairs.map((pair, indexer) => {
						return (
							<Grid
								container
								spacing={2}
								key={indexer}
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Grid item xs={12} sm={6} md={2}>
									<TextField
										margin="normal"
										fullWidth
										required
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
								<Grid item xs={12} sm={6} md={2}>
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

								<Grid
  item
  xs={12}
  sm={6}
  md={3}
  style={{
    textAlign: "center",
    maxHeight: "100px",
    overflow: "hidden",
  }}
>
  {pair.filePreview ? (
    typeof pair.filePreview === "string" ? (
      // Display image preview if filePreview is a string (URL)
      <img
        src={pair.filePreview}
        alt="preview"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    ) : (
      // Display PDF preview with file name and download button
      <div
        style={{
          border: "1px solid #ccc",
          padding: "2px",
          textAlign: "center",
          maxHeight: "100px",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ flex: "1 0 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {extractFileName(pair.filePreview)} {/* Display PDF file name */}
          </p>
          <IconButton
            style={{ flex: "0 0 auto" }}
            href={pair.filePreview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GetAppIcon /> {/* Download button */}
          </IconButton>
        </div>
      </div>
    )
  ) : (
    // If no filePreview, show file name or "No file chosen"
    <div
      style={{
        border: "1px solid #ccc",
        padding: "2px",
        textAlign: "center",
        maxHeight: "100px",
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {pair.fileName ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p style={{ flex: "1 0 auto", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {pair.fileName} {/* Display file name */}
          </p>
          <IconButton
            style={{ flex: "0 0 auto" }}
            href={pair.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GetAppIcon /> {/* Download button */}
          </IconButton>
        </div>
      ) : (
        <p>No file chosen</p>
      )}
    </div>
  )}
</Grid>





								<Grid item xs={12} sm={6} md={2}>
									<Box ml={"auto"}>
										<Input
											type="file"
											accept="image/*"
											onChange={(e) =>
												handleTextFieldChange(
													indexer,
													e.target.files[0],
													"file"
												)
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

								<Grid
									item
									xs={12}
									sm={12}
									md={1}
									style={{ display: "flex", gap: "1rem" }}
								>
									<IconButton
										onClick={() => handleDeleteKeyValuePair(indexer, pair.uuid)}
									>
										<DeleteIcon />
										{/* {loadingStates && <CircularProgress />} */}
									</IconButton>
								</Grid>
							</Grid>
						);
					})}
					<Button variant="contained" type="button" onClick={addKeyValuePair}>
						Add More
					</Button>

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
