import React from 'react';
import { Button } from '@mui/material';
import {pdf } from '@react-pdf/renderer';
import MyDocument from "./MyDocument"; // Adjust path as necessary
import { saveAs } from "file-saver";

const PDFGenerator = ({ data }) => {
  const downloadPdf = async () => {
    const fileName = "loan.pdf";
    console.log(data)
    const blob = await pdf(<MyDocument data={data} />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <>
      <Button
        onClick={downloadPdf}
        variant="outlined"
        style={{ marginBottom: 20, marginLeft: "auto" }}
      >
        Download PDF
      </Button>
    </>
  );
};

export default PDFGenerator;
