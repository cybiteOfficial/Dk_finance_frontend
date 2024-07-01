import React, { useState } from "react";
import { Button } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "./MyDocument"; // Adjust path as necessary
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfDataThunk } from "../redux/reducers/dashboard/dashboard-reducer";
import SnackToast from "../components/Snackbar";

const PDFGenerator = ({ data }) => {
	const token = useSelector((state) => state.authReducer.access_token);
	const { appId } = useSelector((state) => state.authReducer);
	const { pdfDetails } = useSelector((state) => state.dashboardReducer);

	const [loading, setLoading] = useState(false);

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

	const dispatch = useDispatch();

	const downloadPdf = async () => {
		console.log(pdfDetails);
		const fileName = "loan.pdf";
		const blob = await pdf(<MyDocument data={pdfDetails} />).toBlob();
		saveAs(blob, fileName);
	};

	const updateStatusDataApi = async () => {
		const payload = { appId, token };
		try {
			setLoading(true);
			const response = await dispatch(fetchPdfDataThunk(payload));
			const { error, message, code } = response.payload;
			if (code) {
				setLoading(false);
				return;
			} else {
				setLoading(false);
				const applicantExists = response.payload.data.customer_details.some(
					(customer) => customer.details.role === "applicant"
				);
				if (applicantExists) {
					downloadPdf();
				} else {
					setErrState(false, "Create an applicant first", true, "error");
				}
			}
		} catch (error) {
			setLoading(false);
			console.error("error: ", error);
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
			<Button
				disabled={loading}
				onClick={updateStatusDataApi}
				variant="outlined"
				style={{ marginBottom: 20 }}
			>
				Download PDF
			</Button>
		</>
	);
};

export default PDFGenerator;
