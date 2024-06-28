import React, { useEffect, useState } from "react";
import InputValidation from "../components/InputValidation";
import { ArrowBack } from "@mui/icons-material";
import {
	Button,
	TextField,
	Typography,
	Divider,
	Box,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchLoanDataThunk,
	removeLoan,
	updateLoanDataThunk,
	fetchApplicantDataThunk,
	removeStore,
} from "../redux/reducers/dashboard/dashboard-reducer";
import { checkTokenExpired } from "../components/Common";

import SnackToast from "../components/Snackbar";
import { StyledTypography, logFormData } from "../components/Common";

const LoanDetails = () => {
	const token = useSelector((state) => state.authReducer.access_token);
	const { appId } = useSelector((state) => state.authReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	useEffect(() => {
		const fetchApplicants = async () => getApplicantsApi();
		fetchApplicants();
	}, [page]);
	const getApplicantsApi = async (event) => {
		setErrState(true, "", false, "");
		const payload = { token, page };

		try {
			const response = await dispatch(fetchApplicantDataThunk(payload));

			// where is err and msg
			const { results, count, code, message } = response.payload;
			if (code) {
				checkTokenExpired(
					message,
					response,
					setErrState,
					dispatch,
					removeStore,
					navigate
				);
			}
		} catch (error) {
			console.error("error: ", error);
		}
	};

	useEffect(() => {
		async function fetchData() {
			fetchLoanDataApi();
		}
		fetchData();
		return () => {
			dispatch(removeLoan({ payload: {}, type: "removeLoan" }));
		};
	}, []);

	const [isRemarks, setIsRemarks] = useState(false);
	const [err, setErr] = useState({
		loading: false,
		errMsg: "",
		openSnack: false,
		severity: "",
	});

	const [formValues, setFormValues] = useState({
		product_type: "",
		transaction_type: "",
		case_tag: "",
		applied_loan_amount: "",
		applied_tenure: "",
		applied_ROI: "",
		description: "",
		comment: "",
		processing_fees: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
		valuation_charges: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
		legal_and_incidental_fee: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
		stamp_duty_applicable_rate: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
		rcu_charges_applicable_rate: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
		stamping_expenses_applicable_rate: {
			applicable_rate: "",
			charge_amount: "",
			tax_amount: "",
			total_amount: "",
		},
	});

	const setErrState = (loading, errMsg, openSnack, severity) => {
		setErr({
			loading,
			errMsg,
			openSnack,
			severity,
		});
	};
	const [errors, setErrors] = useState({
		applied_loan_amount: false,
		applied_tenure: false,
		applied_ROI: false,
		description: false,
		comment: false,
		// processing_fees: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },
		// valuation_charges: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },
		// legal_and_incidental_fee: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },
		// stamp_duty_applicable_rate: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },

		// rcu_charges_applicable_rate: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },
		// stamping_expenses_applicable_rate: {
		//   applicable_rate: false,
		//   charge_amount: false,
		//   tax_amount: false,
		//   total_amount: false,
		// },
	});

	const handleExtractFormValues = (dataObject) => {
		const updatedFormValues = { ...formValues };

		for (const key in dataObject) {
			if (
				key === "processing_fees" ||
				key === "valuation_charges" ||
				key === "legal_and_incidental_fee" ||
				key === "stamp_duty_applicable_rate" ||
				key === "rcu_charges_applicable_rate" ||
				key === "stamping_expenses_applicable_rate"
			) {
				// Handle nested objects separately
				updatedFormValues[key] = { ...formValues[key], ...dataObject[key] };
			} else {
				// Update other fields directly
				updatedFormValues[key] = dataObject[key];
			}
		}
		setFormValues(updatedFormValues);
	};

	const fetchLoanDataApi = async () => {
		const payload = { application_id: appId, token };
		try {
			setErrState(true, "", false, "");
			const response = await dispatch(fetchLoanDataThunk(payload));
			const { data, error, message } = response.payload;
			if (error) {
				return setErrState(false, message, true, "error");
			}

			if (data && data.length > 0) {
				handleExtractFormValues(data[data.length - 1]); //TODO: must be 0 index later
				setErrState(false, "Fetched successfully", true, "success");
			}
		} catch (error) {
			setErrState(false, "", false, "success");
			console.error("error: ", error);
		}
	};
	const handleRoi = (e) => {
		if (e.target.value > 999) {
			setErr({
				loading: false,
				errMsg: "Value must be less than 1000",
				openSnack: true,
				severity: "error",
			});
		} else {
			setErr({
				loading: false,
				errMsg: "Value must be less than 1000",
				openSnack: false,
				severity: "error",
			});
		}

		setFormValues({ ...formValues, applied_ROI: e.target.value });
	};

	const handleLoanSubmit = async (e) => {
		const errorObj = checkForErrors(formValues);
		setErrors(errorObj);
		if (hasErrors(errorObj)) {
			// setIsRemarks(true);
			setErrState(false, "please fill all required fields", true, "warning");
			return;
		}

		e.preventDefault();
		if (isRemarks) {
			// Check if the comment field is filled
			if (!formValues.comment.trim()) {
				// If comment field is empty, show a warning toast
				setErrState(false, "Please add a remark", true, "warning");
				return;
			}

			delete formValues.id;
			delete formValues.applicant;

			const bodyFormData = new FormData();
			for (const key in formValues) {
				if (typeof formValues[key] === "object") {
					for (const nestedKey in formValues[key]) {
						bodyFormData.append(key, JSON.stringify(formValues[key]));
					}
				} else {
					bodyFormData.append(key, formValues[key]);
				}
			}

			bodyFormData.append("applicant_id", appId);

			logFormData(bodyFormData);
			const payload = { bodyFormData, token };
			try {
				const response = await dispatch(updateLoanDataThunk(payload));
				const { error, message } = response.payload;
				if (error) {
					return setErrState(false, message, true, "error");
				}
				setIsRemarks(false);
				setErrState(false, message, true, "success");
				navigate("/applicant/customers");
			} catch (error) {
				setIsRemarks(false);
				console.error("error: ", error);
			}
		} else {
			// If remarks are not shown, show them and return
			setErrState(false, "Please add a remark", true, "warning");
			setIsRemarks(true);
			return;
		}
	};
	const checkForErrors = (values) => {
		const errors = {
			applied_loan_amount: false,
			applied_tenure: false,
			applied_ROI: false,
			description: false,
			comment: false,
			// processing_fees: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },
			// valuation_charges: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },
			// legal_and_incidental_fee: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },

			// stamp_duty_applicable_rate: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },
			// rcu_charges_applicable_rate: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },
			// stamping_expenses_applicable_rate: {
			//   applicable_rate: false,
			//   charge_amount: false,
			//   tax_amount: false,
			//   total_amount: false,
			// },
		};

		for (const [key, value] of Object.entries(values)) {
			// if (typeof value === 'object' && value !== null) {
			//     for (const [nestedKey, nestedValue] of Object.entries(value)) {
			//         if (nestedValue === "") {
			//             errors[key][nestedKey] = true;
			//         }
			//     }
			// } else {
			console.log("descrip", key, value);
			if (value === null) {
				errors[key] = true;
			}
			// }
		}

		return errors;
	};

	const hasErrors = (errorObj) => {
		for (const key in errorObj) {
			if (typeof errorObj[key] === "object") {
				for (const nestedKey in errorObj[key]) {
					if (errorObj[key][nestedKey]) {
						return true;
					}
				}
			} else {
				if (errorObj[key]) {
					return true;
				}
			}
		}
		return false;
	};
	const handleGoBack = () => {
		navigate("/applicant/customers");
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
				<StyledTypography variant="subtitle1" weight={700}>
					Application ID: {appId}
				</StyledTypography>
				<Typography variant="h6">Loan Details</Typography>
				<Divider style={{ marginBottom: 10 }} />

				<FormControl fullWidth required>
					<InputLabel>Product type</InputLabel>
					<Select
						style={{ marginBottom: "1rem" }}
						label="Product type (normal)"
						fullWidth
						margin="normal"
						value={formValues.product_type}
						onChange={(e) =>
							setFormValues({ ...formValues, product_type: e.target.value })
						}
					>
						<MenuItem value="normal">normal</MenuItem>
					</Select>
				</FormControl>

				<FormControl fullWidth required>
					<InputLabel>Transaction type</InputLabel>
					<Select
						style={{ marginBottom: "1rem" }}
						label="Transaction type"
						value={formValues.transaction_type}
						onChange={(e) =>
							setFormValues({ ...formValues, transaction_type: e.target.value })
						}
						margin="normal"
					>
						<MenuItem value="purchase">Purchase</MenuItem>
						<MenuItem value="construction">Refinance</MenuItem>
						<MenuItem value="refinance">Construction</MenuItem>
					</Select>
				</FormControl>

				<FormControl fullWidth required>
					<InputLabel>Case tag</InputLabel>
					<Select
						label="Case tag"
						fullWidth
						margin="normal"
						value={formValues.case_tag}
						onChange={(e) =>
							setFormValues({ ...formValues, case_tag: e.target.value })
						}
					>
						<MenuItem value="normal">normal</MenuItem>
					</Select>
				</FormControl>

				<TextField
					required
					error={errors.applied_loan_amount}
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					label="Applied loan amount"
					fullWidth
					margin="normal"
					value={formValues.applied_loan_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								applied_loan_amount: value,
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					required
					error={errors.applied_tenure}
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					label="Applied tenure"
					fullWidth
					margin="normal"
					value={formValues.applied_tenure}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								applied_tenure: value,
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					error={errors.applied_ROI}
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					label="Applied ROI *"
					fullWidth
					margin="normal"
					value={formValues.applied_ROI}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value) && value <= 1000 && value >= 0) {
							setFormValues({
								...formValues,
								applied_ROI: value,
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charges type (Processing Fees)
				</Typography>
				<Divider style={{ marginBottom: 10 }} />

				<TextField
					// error={errors.processing_fees.applicable_rate}
					value={formValues.processing_fees.applicable_rate}
					onChange={(e) =>
						e.target.value <= 100 && e.target.value >= 0
							? setFormValues({
									...formValues,
									processing_fees: {
										...formValues.processing_fees,
										applicable_rate: e.target.value,
									},
							  })
							: setErrState(false, "Enter a valid number", true, "warning")
					}
					label="Applicable rate %"
					fullWidth
					margin="normal"
				/>
				<TextField
					value={formValues.processing_fees.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								processing_fees: {
									...formValues.processing_fees,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Charge amount"
					fullWidth
					margin="normal"
				/>

				<TextField
					value={formValues.processing_fees.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								processing_fees: {
									...formValues.processing_fees,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
				/>

				<TextField
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					value={formValues.processing_fees.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								processing_fees: {
									...formValues.processing_fees,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Total amount"
					fullWidth
					margin="normal"
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charges type (Valuation charges)
				</Typography>
				<Divider style={{ marginBottom: 10 }} />
				<TextField
					// error={errors.valuation_chargesv.applicable_rate}
					value={formValues.valuation_charges.applicable_rate}
					onChange={(e) =>
						e.target.value <= 100 && e.target.value >= 0
							? setFormValues({
									...formValues,
									valuation_charges: {
										...formValues.valuation_charges,
										applicable_rate: e.target.value,
									},
							  })
							: setErrState(false, "Enter a valid number", true, "warning")
					}
					label="Applicable rate %"
					fullWidth
					margin="normal"
				/>
				<TextField
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					value={formValues.valuation_charges.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								valuation_charges: {
									...formValues.valuation_charges,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Charge amount"
					fullWidth
					margin="normal"
				/>

				<TextField
					value={formValues.valuation_charges.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								valuation_charges: {
									...formValues.valuation_charges,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
				/>

				<TextField
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					value={formValues.valuation_charges.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								valuation_charges: {
									...formValues.valuation_charges,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
					label="Total amount"
					fullWidth
					margin="normal"
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charges type (Legal and incidental fee)
				</Typography>
				<Divider style={{ marginBottom: 10 }} />

				{/* Charges type (Legal and incidental fee) */}
				<TextField
					label="Applicable rate %"
					// error={errors.legal_and_incidental_fee.applicable_rate}
					fullWidth
					margin="normal"
					value={formValues.legal_and_incidental_fee.applicable_rate}
					onChange={(e) => {
						const value = parseFloat(e.target.value);
						if (value <= 100 && value >= 0) {
							setFormValues({
								...formValues,
								legal_and_incidental_fee: {
									...formValues.legal_and_incidental_fee,
									applicable_rate: e.target.value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Charge amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.legal_and_incidental_fee.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								legal_and_incidental_fee: {
									...formValues.legal_and_incidental_fee,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.legal_and_incidental_fee.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								legal_and_incidental_fee: {
									...formValues.legal_and_incidental_fee,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Total amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.legal_and_incidental_fee.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								legal_and_incidental_fee: {
									...formValues.legal_and_incidental_fee,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charge type: Stamp Duty
				</Typography>
				<Divider style={{ marginBottom: 10 }} />

				{/* Charge type: Stamp Duty */}
				<TextField
					label="Applicable rate %"
					// error={errors.stamp_duty_applicable_rate.applicable_rate}
					fullWidth
					margin="normal"
					value={formValues.stamp_duty_applicable_rate.applicable_rate}
					onChange={(e) => {
						const value = parseFloat(e.target.value);
						if (value <= 100 && value >= 0) {
							setFormValues({
								...formValues,
								stamp_duty_applicable_rate: {
									...formValues.stamp_duty_applicable_rate,
									applicable_rate: e.target.value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Charge amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamp_duty_applicable_rate.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamp_duty_applicable_rate: {
									...formValues.stamp_duty_applicable_rate,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamp_duty_applicable_rate.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamp_duty_applicable_rate: {
									...formValues.stamp_duty_applicable_rate,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Total amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamp_duty_applicable_rate.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamp_duty_applicable_rate: {
									...formValues.stamp_duty_applicable_rate,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charge type: Rcu Charges
				</Typography>
				<Divider style={{ marginBottom: 10 }} />

				{/* Charge type: Rcu Charges */}
				<TextField
					label="Applicable rate %"
					// error={errors.rcu_charges_applicable_rate.applicable_rate}
					fullWidth
					margin="normal"
					value={formValues.rcu_charges_applicable_rate.applicable_rate}
					onChange={(e) => {
						const value = parseFloat(e.target.value);
						if (value <= 100 && value >= 0) {
							setFormValues({
								...formValues,
								rcu_charges_applicable_rate: {
									...formValues.rcu_charges_applicable_rate,
									applicable_rate: e.target.value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Charge amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.rcu_charges_applicable_rate.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								rcu_charges_applicable_rate: {
									...formValues.rcu_charges_applicable_rate,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.rcu_charges_applicable_rate.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								rcu_charges_applicable_rate: {
									...formValues.rcu_charges_applicable_rate,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Total amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.rcu_charges_applicable_rate.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								rcu_charges_applicable_rate: {
									...formValues.rcu_charges_applicable_rate,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<Typography variant="h6" style={{ marginTop: 20 }}>
					Charge type: Stamping expenses
				</Typography>
				<Divider style={{ marginBottom: 10 }} />

				{/* Charge type: Stamping expenses */}
				<TextField
					label="Applicable rate %"
					// error={errors.stamping_expenses_applicable_rate.applicable_rate}
					fullWidth
					margin="normal"
					value={formValues.stamping_expenses_applicable_rate.applicable_rate}
					onChange={(e) => {
						const value = parseFloat(e.target.value);
						if (value <= 100 && value >= 0) {
							setFormValues({
								...formValues,
								stamping_expenses_applicable_rate: {
									...formValues.stamping_expenses_applicable_rate,
									applicable_rate: e.target.value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Charge amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamping_expenses_applicable_rate.charge_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamping_expenses_applicable_rate: {
									...formValues.stamping_expenses_applicable_rate,
									charge_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Tax amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamping_expenses_applicable_rate.tax_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamping_expenses_applicable_rate: {
									...formValues.stamping_expenses_applicable_rate,
									tax_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					label="Total amount"
					onFocus={(e) =>
						e.target.addEventListener(
							"wheel",
							function (e) {
								e.preventDefault();
							},
							{ passive: false }
						)
					}
					fullWidth
					margin="normal"
					value={formValues.stamping_expenses_applicable_rate.total_amount}
					onChange={(e) => {
						const value = e.target.value;
						// Regex to allow digits and optionally a decimal point
						if (/^\d*\.?\d*$/.test(value)) {
							setFormValues({
								...formValues,
								stamping_expenses_applicable_rate: {
									...formValues.stamping_expenses_applicable_rate,
									total_amount: value,
								},
							});
						} else {
							setErrState(false, "Enter a valid number", true, "warning");
						}
					}}
				/>

				<TextField
					required
					error={errors.description}
					label="Description"
					fullWidth
					multiline
					rows={4}
					margin="normal"
					name="description"
					value={formValues.description}
					onChange={(e) =>
						setFormValues({
							...formValues,
							description: e.target.value,
						})
					}
				/>
				{isRemarks ? (
					<TextField
						label="Remarks"
						fullWidth
						margin="normal"
						name="comment"
						value={formValues.comment}
						onChange={(e) =>
							setFormValues({
								...formValues,
								comment: e.target.value,
							})
						}
					/>
				) : null}
				<Box display={"flex"} alignSelf={"flex-end"}>
					<Button
						disabled={process.env.REACT_APP_DISABLED === "TRUE"}
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						style={{ marginTop: 20, marginBottom: 20, marginLeft: "auto" }}
						onClick={handleLoanSubmit}
					>
						Save
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default LoanDetails;
