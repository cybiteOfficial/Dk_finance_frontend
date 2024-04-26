import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, TextField, Typography, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchLoanDataThunk, updateLoanDataThunk} from "../redux/reducers/dashboard/dashboard-reducer"
import SnackToast from "../components/Snackbar";
import { StyledTypography, logFormData } from "../components/Common";



const LoanDetails = () => {
  const token = useSelector((state) => state.authReducer.access_token);
  const {appId} = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      fetchLoanDataApi();
    }
    fetchData();
  }, []);

  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    isErr: false,
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
    // preEmi: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // carePACIInsurance: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // gpaHospitalCare: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // gpaHospicashChola: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // gpaHospicashABHI: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // sblHDFCLifeCreditProtectPlus: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
    // abhiGroupCIInsurance: {
    //   applicable_rate: "",
    //   charge_amount: "",
    //   tax_amount: "",
    //   total_amount: "",
    // },
  });

 const setErrState = (loading,errMsg,isErr)=>{
    setErr({
      loading,
      errMsg,
      isErr,
    });
  }

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
      }
     else {
        // Update other fields directly
        updatedFormValues[key] = dataObject[key];
      }
    }
      setFormValues(updatedFormValues)
    
  };

  const fetchLoanDataApi = async () => {
    const payload = {application_id:appId,token}
    try {
      setErrState(true, "", false, "");
      const response = await dispatch(fetchLoanDataThunk(payload));
      const { data, error, message } = response.payload;
      if (error) {
        return setErrState(false, message, true, "error");
      }
      if(data.length >0 ){
        handleExtractFormValues(data[data.length-1]);
      }
    
      
      if (data && data.length > 0) {
        setErrState(false, message, true, "success");
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    delete formValues?.id;
    delete formValues?.loan_id;
    delete formValues?.applicant;

    console.log("loan", formValues);
    const bodyFormData = new FormData();
    for (const key in formValues) {
      if (typeof formValues[key] === 'object') {
        // If the value is an object, loop through its key-value pairs and append them
        for (const nestedKey in formValues[key]) {
          bodyFormData.append(key, JSON.stringify(formValues[key]));
        }
      } else {
        // If the value is not an object, append it directly
        bodyFormData.append(key, formValues[key]);
      }
    }
   
    bodyFormData.append("applicant_id",appId)
    logFormData(bodyFormData)
    const payload = { bodyFormData, token };
    try {
      const response = await dispatch(updateLoanDataThunk(payload));
      const { error, message } = response.payload;
      if (error) {
        return setErrState(false, message, true, "error");
      }
      setErrState(false, message, true, "success");
      navigate("/applicant/customers")
    } catch (error) {
      console.error('error: ', error);

    }
  };

  const handleGoBack = () => {
    navigate("/applicant/customers");
  };
  return (
    < >
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
        style={{ marginBottom: 20,  }}
      >
        GO BACK
      </Button>
      <StyledTypography variant="subtitle1" weight={700}>
            Application ID: {appId}
          </StyledTypography>
      <Typography variant="h6">Loan Details</Typography>
      <Divider style={{ marginBottom: 10 }} />

      <TextField
        label="Product type (normal)"
        fullWidth
        margin="normal"
        value={formValues.product_type}
        onChange={(e) =>
          setFormValues({ ...formValues, product_type: e.target.value })
        }
      />
      <TextField
        label="Transaction type"
        fullWidth
        margin="normal"
        value={formValues.transaction_type}
        onChange={(e) =>
          setFormValues({ ...formValues, transaction_type: e.target.value })
        }
      />
      <TextField
        label="Case tag"
        fullWidth
        margin="normal"
        value={formValues.case_tag}
        onChange={(e) =>
          setFormValues({ ...formValues, case_tag: e.target.value })
        }
      />
      <TextField
        label="Applied loan amount"
        fullWidth
        margin="normal"
        value={formValues.applied_loan_amount}
        onChange={(e) =>
          setFormValues({ ...formValues, applied_loan_amount: e.target.value })
        }
      />
      <TextField
        label="Applied tenure"
        fullWidth
        margin="normal"
        value={formValues.applied_tenure}
        onChange={(e) =>
          setFormValues({ ...formValues, applied_tenure: e.target.value })
        }
      />
      <TextField
        label="Applied ROI"
        fullWidth
        margin="normal"
        value={formValues.applied_ROI}
        onChange={(e) =>
          setFormValues({ ...formValues, applied_ROI: e.target.value })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charges type (Processing Fees)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />

      <TextField   value={formValues.processing_fees.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            processing_fees: {
              ...formValues.processing_fees,
              applicable_rate: e.target.value,
            },
          })
        }  label="Applicable rate %" fullWidth margin="normal" />
      <TextField  value={formValues.processing_fees.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            processing_fees: {
              ...formValues.processing_fees,
              charge_amount: e.target.value,
            },
          })
        } label="Change amount" fullWidth margin="normal" />
      <TextField  value={formValues.processing_fees.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            processing_fees: {
              ...formValues.processing_fees,
              tax_amount: e.target.value,
            },
          })
        } label="Tax amount" fullWidth margin="normal" />
      <TextField  value={formValues.processing_fees.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            processing_fees: {
              ...formValues.processing_fees,
              total_amount: e.target.value,
            },
          })
        } label="Total amount" fullWidth margin="normal" />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charges type (Valuation charges)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {/* Charges type (Valuation charges) */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.valuation_charges.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuation_charges: {
              ...formValues.valuation_charges,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.valuation_charges.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuation_charges: {
              ...formValues.valuation_charges,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.valuation_charges.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuation_charges: {
              ...formValues.valuation_charges,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.valuation_charges.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuation_charges: {
              ...formValues.valuation_charges,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charges type (Legal and incidental fee)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />

      {/* Charges type (Legal and incidental fee) */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.legal_and_incidental_fee.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legal_and_incidental_fee: {
              ...formValues.legal_and_incidental_fee,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.legal_and_incidental_fee.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legal_and_incidental_fee: {
              ...formValues.legal_and_incidental_fee,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.legal_and_incidental_fee.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legal_and_incidental_fee: {
              ...formValues.legal_and_incidental_fee,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.legal_and_incidental_fee.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legal_and_incidental_fee: {
              ...formValues.legal_and_incidental_fee,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: Stamp Duty
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {/* Charge type: Stamp Duty */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.stamp_duty_applicable_rate.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamp_duty_applicable_rate: {
              ...formValues.stamp_duty_applicable_rate,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.stamp_duty_applicable_rate.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamp_duty_applicable_rate: {
              ...formValues.stamp_duty_applicable_rate,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.stamp_duty_applicable_rate.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamp_duty_applicable_rate: { ...formValues.stamp_duty_applicable_rate, tax_amount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.stamp_duty_applicable_rate.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamp_duty_applicable_rate: { ...formValues.stamp_duty_applicable_rate, total_amount: e.target.value },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: Rcu Charges
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {/* Charge type: Rcu Charges */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.rcu_charges_applicable_rate.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcu_charges_applicable_rate: {
              ...formValues.rcu_charges_applicable_rate,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.rcu_charges_applicable_rate.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcu_charges_applicable_rate: {
              ...formValues.rcu_charges_applicable_rate,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.rcu_charges_applicable_rate.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcu_charges_applicable_rate: { ...formValues.rcu_charges_applicable_rate, tax_amount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.rcu_charges_applicable_rate.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcu_charges_applicable_rate: {
              ...formValues.rcu_charges_applicable_rate,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: Stampping expenses
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {/* Charge type: Stampping expenses */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.stamping_expenses_applicable_rate.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamping_expenses_applicable_rate: {
              ...formValues.stamping_expenses_applicable_rate,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.stamping_expenses_applicable_rate.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamping_expenses_applicable_rate: {
              ...formValues.stamping_expenses_applicable_rate,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.stamping_expenses_applicable_rate.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamping_expenses_applicable_rate: {
              ...formValues.stamping_expenses_applicable_rate,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.stamping_expenses_applicable_rate.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stamping_expenses_applicable_rate: {
              ...formValues.stamping_expenses_applicable_rate,
              total_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        name="description"
        value={formValues.description}
        onChange={(e)=>setFormValues({
          ...formValues,
          description: e.target.value,
        })}
      />
      <TextField
        label="Remarks"
        fullWidth
        margin="normal"
        name="comment"
        value={formValues.comment}
        onChange={(e)=>setFormValues({
          ...formValues,
          comment: e.target.value,
        })}
      />
      {/* <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: PRE EMI
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.preEmi.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, applicable_rate: e.target.value },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, charge_amount: e.target.value },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, tax_amount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, total_amount: e.target.value },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: care PA and CI Insurance
      </Typography> */}
      {/* <Divider style={{ marginBottom: 10 }} />
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: gpa and Hospital_care
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              total_amount: e.target.value,
            },
          })
        }
      />
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: GPA and Hospicash_Chola
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
     
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: GPA and Hospicash_ABHI
      </Typography>
      <Divider style={{ marginBottom: 10 }} /> */}
      {/* Charge type: GPA and Hospicash_ABHI */}
      {/* <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              total_amount: e.target.value,
            },
          })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: SBL_HDFC Life Credit Protect Plus
      </Typography>
      <Divider style={{ marginBottom: 10 }} />

      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              total_amount: e.target.value,
            },
          })
        }
      />
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charge type: ABHIGroup and CI Incurance
      </Typography>
      <Divider style={{ marginBottom: 10 }} /> */}
      {/* Charge type: ABHIGroup and CI Insurance */}
      {/* <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.applicable_rate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              applicable_rate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.charge_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              charge_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.tax_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              tax_amount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.total_amount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              total_amount: e.target.value,
            },
          })
        }
      /> */}
      <Box display={"flex"} alignSelf={"flex-end"}>
        <Button
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
