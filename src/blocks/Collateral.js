import React, { useState, useEffect } from "react";
import { ArrowBack } from "@mui/icons-material";
import {
	Button,
	TextField,
	Typography,
	Divider,
	Box,
	Input,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import SnackToast from "../components/Snackbar";
import {
	fetchCollateralDataThunk,
	removeCollateral,
	updateCollateralDataThunk,
} from "../redux/reducers/dashboard/dashboard-reducer";
import { logFormData, extractFileName } from "../components/Common";
var query = require("india-pincode-search");

const Collateral = () => {
	const token = useSelector((state) => state.authReducer.access_token);
	const { appId } = useSelector((state) => state.authReducer);
	const dashboardReducer = useSelector((state) => state.dashboardReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			fetchCollateralDataApi();
		}
		fetchData();
		return () => {
			dispatch(removeCollateral({ payload: {}, type: "removeCollateral" }));
		};
	}, []);

	const [preview, setPreview] = useState(null);
	const [collateralDetails, setCollateralDetails] = useState({
		isExisting: "",
		collateralType: "",
		collateralName: "",
		primarySecondary: "",
		valuationRequired: "",
		relationshipWithLoan: "",
		propertyOwner: "",
		propertyCategory: "",
		propertyType: "",
		occupationStatus: "",
		propertyStatus: "",
		propertyTitle: "",
		houseFlatShopNo: "",
		khasraPlotNo: "",
		locality: "",
		village: "",
		state: "",
		district: "",
		city: "",
		taluka: "",
		pincode: "",
		landmark: "",
		estimatedPropertyValue: "",
		documentName: "",
		documentUpload: null,
		documentUrl: "", // New field for the document URL
		description: "",
		comment: "",
	});

	const [isRemarks, setIsRemarks] = useState(false);
	const [err, setErr] = useState({
		loading: false,
		errMsg: "",
		openSnack: false,
		severity: "",
	});

	const setErrState = (loading, errMsg, openSnack, severity) => {
		setErr({
			loading,
			errMsg,
			openSnack,
			severity,
		});
	};

	const handleExtractFormValues = (dataObject) => {
		const updatedFormValues = { ...collateralDetails };
		for (const key in dataObject) {
			if (dataObject[key]) {
				updatedFormValues[key] = dataObject[key];
			} else {
				updatedFormValues[key] = "";
			}
		}
		setCollateralDetails(updatedFormValues);
	};

	const handleGoBack = () => {
		navigate("/applicant/customers");
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setCollateralDetails((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);

			setCollateralDetails((prevState) => ({
				...prevState,
				documentUpload: file,
				documentUrl: "", // Clear the URL when a new file is uploaded
			}));
		}
	};

	const fetchCollateralDataApi = async () => {
		const payload = { application_id: appId, token };
		try {
			setErrState(true, "", false, "");
			const response = await dispatch(fetchCollateralDataThunk(payload));
			const { data, error, message } = response.payload;
			if (error) {
				return setErrState(false, message, true, "error");
			}

			if (data && data.length > 0) {
				const collateralData = data[0];
				handleExtractFormValues(collateralData);
				setCollateralDetails((prevState) => ({
					...prevState,
					documentUrl: collateralData.documentUpload || "", // Set the document URL
				}));
				setErrState(false, "Fetched successfully", true, "success");
			}
		} catch (error) {
			setErrState(false, "", false, "");
			console.error("error: ", error);
		}
	};

	useEffect(() => {
		var vari = query.search(collateralDetails.pincode);

		if (vari[0]) {
			setCollateralDetails((prevState) => ({
				...prevState,
				state: vari[0].state,
				district: vari[0].district,
				village: vari[0].village,
				city: vari[0].city,
			}));
		}
		console.log(vari[0]);
	}, [collateralDetails.pincode]);

	const handleSave = async (e) => {
		e.preventDefault();
		if (isRemarks) {
			if (!collateralDetails.comment.trim()) {
				setErrState(false, "Please add a remark", true, "warning");
			} else {
				const bodyFormData = new FormData();
				for (const key in collateralDetails) {
					if (key !== "documentUrl") {
						// Exclude documentUrl from the payload
						bodyFormData.append(key, collateralDetails[key]);
					}
				}

				bodyFormData.append("applicant_id", appId);

				if (collateralDetails.documentUpload) {
					bodyFormData.append(
						"documentUpload",
						collateralDetails.documentUpload
					);
				}

				logFormData(bodyFormData);
				const payload = { bodyFormData, token };
				try {
					const response = await dispatch(updateCollateralDataThunk(payload));
					const { error, message, data } = response.payload;
					if (error) {
						return setErrState(false, message, true, "error");
					}
					setIsRemarks(false);
					setErrState(false, "Updated successfully", true, "success");
					setTimeout(() => {
						navigate("/applicant/customers");
					}, 500);
				} catch (error) {
					setIsRemarks(false);
					setErrState(false, "", false, "error");
					console.error("error: ", error);
				}
			}
		} else {
			setErrState(false, "Please add a remark", true, "warning");
			setIsRemarks(true);
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

				<Typography variant="h6">Collateral Details</Typography>
				<Divider style={{ marginBottom: 10 }} />
				<TextField
					label="Is existing collateral (YES/No)"
					fullWidth
					margin="normal"
					name="isExisting"
					value={collateralDetails.isExisting}
					onChange={handleInputChange}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel>Collateral Type</InputLabel>
					<Select
						value={collateralDetails.collateralType}
						onChange={handleInputChange}
						name="collateralType"
						label="Collateral Type"
					>
						<MenuItem value="">Select</MenuItem>
						<MenuItem value="property">Property</MenuItem>
						<MenuItem value="automobile">Automobile</MenuItem>
						<MenuItem value="deposite">Deposite</MenuItem>
						<MenuItem value="financialSecurity">Financial Security</MenuItem>
						<MenuItem value="plantAndMachinery">Plant And Machinery</MenuItem>
						<MenuItem value="insurance">Insurance</MenuItem>
						<MenuItem value="gold">Gold</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Collateral name"
					fullWidth
					margin="normal"
					name="collateralName"
					value={collateralDetails.collateralName}
					onChange={handleInputChange}
				/>
				<TextField
					label="Primary/Secondary Collateral"
					fullWidth
					margin="normal"
					name="primarySecondary"
					value={collateralDetails.primarySecondary}
					onChange={handleInputChange}
				/>
				<TextField
					label="Valuation Required"
					fullWidth
					margin="normal"
					name="valuationRequired"
					value={collateralDetails.valuationRequired}
					onChange={handleInputChange}
				/>
				<TextField
					label="Relationship with Loan Applicant"
					fullWidth
					margin="normal"
					name="relationshipWithLoan"
					value={collateralDetails.relationshipWithLoan}
					onChange={handleInputChange}
				/>
				<TextField
					label="Owner of Property"
					fullWidth
					margin="normal"
					name="propertyOwner"
					value={collateralDetails.propertyOwner}
					onChange={handleInputChange}
				/>
				<TextField
					label="Property Category"
					fullWidth
					margin="normal"
					name="propertyCategory"
					value={collateralDetails.propertyCategory}
					onChange={handleInputChange}
				/>
				<TextField
					label="Property Type"
					fullWidth
					margin="normal"
					name="propertyType"
					value={collateralDetails.propertyType}
					onChange={handleInputChange}
				/>
				<TextField
					label="Occupation Status"
					fullWidth
					margin="normal"
					name="occupationStatus"
					value={collateralDetails.occupationStatus}
					onChange={handleInputChange}
				/>
				<TextField
					label="Property Status"
					fullWidth
					margin="normal"
					name="propertyStatus"
					value={collateralDetails.propertyStatus}
					onChange={handleInputChange}
				/>
				<TextField
					label="Property Title"
					fullWidth
					margin="normal"
					name="propertyTitle"
					value={collateralDetails.propertyTitle}
					onChange={handleInputChange}
				/>
				<TextField
					label="House/Flat/Shop No."
					fullWidth
					margin="normal"
					name="houseFlatShopNo"
					value={collateralDetails.houseFlatShopNo}
					onChange={handleInputChange}
				/>
				<TextField
					label="Khasra/Plot No."
					fullWidth
					margin="normal"
					name="khasraPlotNo"
					value={collateralDetails.khasraPlotNo}
					onChange={handleInputChange}
				/>
				<TextField
					label="Locality"
					fullWidth
					margin="normal"
					name="locality"
					value={collateralDetails.locality}
					onChange={handleInputChange}
				/>
				<TextField
					label="Pincode"
					fullWidth
					margin="normal"
					name="pincode"
					value={collateralDetails.pincode}
					onChange={handleInputChange}
				/>
				<TextField
					label="Village"
					fullWidth
					margin="normal"
					name="village"
					value={collateralDetails.village}
					onChange={handleInputChange}
				/>
				<TextField
					label="State"
					fullWidth
					margin="normal"
					name="state"
					value={collateralDetails.state}
					onChange={handleInputChange}
				/>
				<TextField
					label="District"
					fullWidth
					margin="normal"
					name="district"
					value={collateralDetails.district}
					onChange={handleInputChange}
				/>
				<TextField
					label="City"
					fullWidth
					margin="normal"
					name="city"
					value={collateralDetails.city}
					onChange={handleInputChange}
				/>
				<TextField
					label="Taluka"
					fullWidth
					margin="normal"
					name="taluka"
					value={collateralDetails.taluka}
					onChange={handleInputChange}
				/>

				<TextField
					label="Landmark"
					fullWidth
					margin="normal"
					name="landmark"
					value={collateralDetails.landmark}
					onChange={handleInputChange}
				/>
				<TextField
					label="Estimated Property Value"
					fullWidth
					margin="normal"
					name="estimatedPropertyValue"
					value={collateralDetails.estimatedPropertyValue}
					onChange={handleInputChange}
				/>
				<TextField
					label="Document Name"
					fullWidth
					margin="normal"
					name="documentName"
					value={collateralDetails.documentName}
					onChange={handleInputChange}
				/>

				{/* File upload section */}
				<Box
					display="flex"
					flexDirection="column"
					alignItems="flex-start"
					marginTop="16px"
				>
					<Box display="flex" alignItems="center">
						<Button
							variant="contained"
							component="label"
							startIcon={<AttachFileIcon />}
							style={{ marginBottom: "16px" }}
						>
							Upload File
							<Input
								type="file"
								style={{ display: "none" }}
								onChange={handleFileChange}
							/>
						</Button>
						{collateralDetails.documentUrl && (
							<Typography marginLeft="16px">
								<a
									href={collateralDetails.documentUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{collateralDetails.documentUrl.endsWith(".pdf") ? (
										collateralDetails.documentUrl.split("/").pop()
									) : (
										<img
											src={collateralDetails.documentUrl}
											alt="Existing Document"
											style={{ maxWidth: "100px", maxHeight: "100px" }}
										/>
									)}
								</a>
							</Typography>
						)}
					</Box>
					{preview && (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							border="1px solid #ccc"
							padding="16px"
							borderRadius="4px"
							marginTop="16px"
							width="100%"
						>
							{collateralDetails.documentUpload.type === "application/pdf" ? (
								<Typography>{collateralDetails.documentUpload.name}</Typography>
							) : (
								<img
									src={preview}
									alt="Document Preview"
									style={{ maxWidth: "100%", maxHeight: "200px" }}
								/>
							)}
						</Box>
					)}
				</Box>

				<TextField
					label="Description"
					fullWidth
					margin="normal"
					name="description"
					value={collateralDetails.description}
					onChange={handleInputChange}
				/>

				{isRemarks && (
					<TextField
						label="Remarks"
						fullWidth
						margin="normal"
						name="comment"
						value={collateralDetails.comment}
						onChange={handleInputChange}
					/>
				)}

				<Button
					variant="contained"
					color="primary"
					onClick={handleSave}
					style={{ marginTop: 20 }}
				>
					Save
				</Button>
			</Box>
		</>
	);
};

export default Collateral;
