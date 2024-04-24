import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { Button, TextField, Typography, Divider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchLoanDataThunk, updateLoanDataThunk} from "../redux/reducers/dashboard/dashboard-reducer"

const LoanDetails = () => {
  const {appId} = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // fetchLoanDataApi();
    }
    fetchData();
  }, []);

  const [err, setErr] = useState({
    loading: false,
    errMsg: "",
    isErr: false,
  });
  
  const [formValues, setFormValues] = useState({
    productType: "",
    transactionType: "",
    caseTag: "",
    appliedLoanAmount: "",
    appliedTenure: "",
    appliedROI: "",
    description: "",
    remark: "",
    processingFees: {
      applicableRate: "",
      changeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    valuationCharges: {
      applicableRate: "",
      chargeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    legalAndIncidentalFee: {
      applicableRate: "",
      chargeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    stampDuty: {
      applicableRate: "",
      chargeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    rcuCharges: {
      applicableRate: "",
      chargeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    stampingExpenses: {
      applicableRate: "",
      chargeAmount: "",
      taxAmount: "",
      totalAmount: "",
    },
    // preEmi: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // carePACIInsurance: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // gpaHospitalCare: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // gpaHospicashChola: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // gpaHospicashABHI: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // sblHDFCLifeCreditProtectPlus: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
    // abhiGroupCIInsurance: {
    //   applicableRate: "",
    //   chargeAmount: "",
    //   taxAmount: "",
    //   totalAmount: "",
    // },
  });

 const setErrState = (loading,errMsg,isErr)=>{
    setErr({
      loading,
      errMsg,
      isErr,
    });
  }

  const fetchLoanDataApi = async () => {
    const payload = {};
    try {
      setErrState(true, "", false);
      const response = await dispatch(fetchLoanDataThunk(payload));
      setErrState(false, "", false);
    } catch (error) {
      setErrState(false, "", true);
    }
  };

  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    console.log("loan", formValues);
    const payload = formValues;
    try {
      const response = await dispatch(updateLoanDataThunk(payload));
    } catch (error) {}
  };

  const handleGoBack = () => {
    navigate("/applicant/customers");
  };
  return (
    < >
    <Box width={"90%"} margin={"13vh auto 0 auto"}>
        <Typography variant="h6" style={{ marginBottom: 20 }}>
          Application ID: {appId}
        </Typography>
      <Button
        onClick={handleGoBack}
        startIcon={<ArrowBack />}
        variant="contained"
        style={{ marginBottom: 20,  }}
      >
        GO BACK
      </Button>
      <Typography variant="h6">Loan Details</Typography>
      <Divider style={{ marginBottom: 10 }} />

      <TextField
        label="Product type (normal)"
        fullWidth
        margin="normal"
        value={formValues.productType}
        onChange={(e) =>
          setFormValues({ ...formValues, productType: e.target.value })
        }
      />
      <TextField
        label="Transaction type"
        fullWidth
        margin="normal"
        value={formValues.transactionType}
        onChange={(e) =>
          setFormValues({ ...formValues, transactionType: e.target.value })
        }
      />
      <TextField
        label="Case tag"
        fullWidth
        margin="normal"
        value={formValues.caseTag}
        onChange={(e) =>
          setFormValues({ ...formValues, caseTag: e.target.value })
        }
      />
      <TextField
        label="Applied loan amount"
        fullWidth
        margin="normal"
        value={formValues.appliedLoanAmount}
        onChange={(e) =>
          setFormValues({ ...formValues, appliedLoanAmount: e.target.value })
        }
      />
      <TextField
        label="Applied tenure"
        fullWidth
        margin="normal"
        value={formValues.appliedTenure}
        onChange={(e) =>
          setFormValues({ ...formValues, appliedTenure: e.target.value })
        }
      />
      <TextField
        label="Applied ROI"
        fullWidth
        margin="normal"
        value={formValues.appliedROI}
        onChange={(e) =>
          setFormValues({ ...formValues, appliedROI: e.target.value })
        }
      />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charges type (Processing Fees)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />

      <TextField label="Applicable rate %" fullWidth margin="normal" />
      <TextField label="Change amount" fullWidth margin="normal" />
      <TextField label="Tax amount" fullWidth margin="normal" />
      <TextField label="Total amount" fullWidth margin="normal" />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Charges type (Valuation charges)
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {/* Charges type (Valuation charges) */}
      <TextField
        label="Applicable rate"
        fullWidth
        margin="normal"
        value={formValues.valuationCharges.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuationCharges: {
              ...formValues.valuationCharges,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.valuationCharges.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuationCharges: {
              ...formValues.valuationCharges,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.valuationCharges.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuationCharges: {
              ...formValues.valuationCharges,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.valuationCharges.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            valuationCharges: {
              ...formValues.valuationCharges,
              totalAmount: e.target.value,
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
        value={formValues.legalAndIncidentalFee.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legalAndIncidentalFee: {
              ...formValues.legalAndIncidentalFee,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.legalAndIncidentalFee.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legalAndIncidentalFee: {
              ...formValues.legalAndIncidentalFee,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.legalAndIncidentalFee.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legalAndIncidentalFee: {
              ...formValues.legalAndIncidentalFee,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.legalAndIncidentalFee.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            legalAndIncidentalFee: {
              ...formValues.legalAndIncidentalFee,
              totalAmount: e.target.value,
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
        value={formValues.stampDuty.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampDuty: {
              ...formValues.stampDuty,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.stampDuty.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampDuty: {
              ...formValues.stampDuty,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.stampDuty.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampDuty: { ...formValues.stampDuty, taxAmount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.stampDuty.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampDuty: { ...formValues.stampDuty, totalAmount: e.target.value },
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
        value={formValues.rcuCharges.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcuCharges: {
              ...formValues.rcuCharges,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.rcuCharges.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcuCharges: {
              ...formValues.rcuCharges,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.rcuCharges.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcuCharges: { ...formValues.rcuCharges, taxAmount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.rcuCharges.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            rcuCharges: {
              ...formValues.rcuCharges,
              totalAmount: e.target.value,
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
        value={formValues.stampingExpenses.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampingExpenses: {
              ...formValues.stampingExpenses,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.stampingExpenses.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampingExpenses: {
              ...formValues.stampingExpenses,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.stampingExpenses.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampingExpenses: {
              ...formValues.stampingExpenses,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.stampingExpenses.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            stampingExpenses: {
              ...formValues.stampingExpenses,
              totalAmount: e.target.value,
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
        name="remarks"
        value={formValues.remarks}
        onChange={(e)=>setFormValues({
          ...formValues,
          remark: e.target.value,
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
        value={formValues.preEmi.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, applicableRate: e.target.value },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, chargeAmount: e.target.value },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, taxAmount: e.target.value },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.preEmi.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            preEmi: { ...formValues.preEmi, totalAmount: e.target.value },
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
        value={formValues.carePACIInsurance.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.carePACIInsurance.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            carePACIInsurance: {
              ...formValues.carePACIInsurance,
              totalAmount: e.target.value,
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
        value={formValues.gpaHospitalCare.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospitalCare.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospitalCare: {
              ...formValues.gpaHospitalCare,
              totalAmount: e.target.value,
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
        value={formValues.gpaHospicashChola.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashChola.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashChola: {
              ...formValues.gpaHospicashChola,
              totalAmount: e.target.value,
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
        value={formValues.gpaHospicashABHI.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.gpaHospicashABHI.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            gpaHospicashABHI: {
              ...formValues.gpaHospicashABHI,
              totalAmount: e.target.value,
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
        value={formValues.sblHDFCLifeCreditProtectPlus.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.sblHDFCLifeCreditProtectPlus.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            sblHDFCLifeCreditProtectPlus: {
              ...formValues.sblHDFCLifeCreditProtectPlus,
              totalAmount: e.target.value,
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
        value={formValues.abhiGroupCIInsurance.applicableRate}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              applicableRate: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Charge amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.chargeAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              chargeAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Tax amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.taxAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              taxAmount: e.target.value,
            },
          })
        }
      />
      <TextField
        label="Total amount"
        fullWidth
        margin="normal"
        value={formValues.abhiGroupCIInsurance.totalAmount}
        onChange={(e) =>
          setFormValues({
            ...formValues,
            abhiGroupCIInsurance: {
              ...formValues.abhiGroupCIInsurance,
              totalAmount: e.target.value,
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
