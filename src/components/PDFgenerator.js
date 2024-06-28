import React, { useState } from 'react';
import { Button } from '@mui/material';
import {pdf } from '@react-pdf/renderer';
import MyDocument from "./MyDocument"; // Adjust path as necessary
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfDataThunk } from '../redux/reducers/dashboard/dashboard-reducer';

const PDFGenerator = ({ data }) => {
  const token = useSelector((state) => state.authReducer.access_token);
  const { appId } = useSelector((state) => state.authReducer);
  const { pdfDetails } = useSelector((state) => state.dashboardReducer);
 
  const [ loading,setLoading] = useState(false)

  const dispatch = useDispatch()
  
  const downloadPdf = async () => {
    const fileName = "loan.pdf";
    console.log(data)
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
        downloadPdf();
      }
    } catch (error) {
      setLoading(false);
      console.error("error: ", error);
    }
  };

  return (
    <>
      <Button
        disabled={loading}
        onClick={updateStatusDataApi}
        variant="outlined"
        style={{ marginBottom: 20, marginLeft: 1000 }}
      >
        Download PDF
      </Button>
    </>
  );
};

export default PDFGenerator;
