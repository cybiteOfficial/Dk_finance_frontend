import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";

// Register fonts if necessary
Font.register({
  family: "Helvetica-Bold",
  src: "https://fonts.gstatic.com/s/helvetica/fontfile.woff2",
});



// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    fontFamily: "Helvetica-Bold",
    textAlign:"center"
  },
  subheading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Helvetica", // Use a default font or register as needed
  },
});

const MyDocument = ({data}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Loan Details Section */}
      <Text style={styles.heading}>Loan Details</Text>
      {data.loan_details.map((loan, index) => (
        <React.Fragment key={index}>
          <Text style={styles.subheading}>Loan ID: {loan.loan_id}</Text>
          <Text style={styles.text}>Product Type: {loan.product_type}</Text>
          <Text style={styles.text}>
            Transaction Type: {loan.transaction_type}
          </Text>
          <Text style={styles.text}>Case Tag: {loan.case_tag}</Text>
          <Text style={styles.text}>
            Applied Loan Amount: {loan.applied_loan_amount}
          </Text>
          <Text style={styles.text}>Applied Tenure: {loan.applied_tenure}</Text>
          <Text style={styles.text}>Applied ROI: {loan.applied_ROI}</Text>
          <Text style={styles.text}>Description: {loan.description}</Text>

          <Text style={styles.subheading}>Processing Fees</Text>
          <Text style={styles.text}>
            Tax Amount: {loan.processing_fees.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.processing_fees.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount: {loan.processing_fees.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate: {loan.processing_fees.applicable_rate}
          </Text>

          <Text style={styles.subheading}>Valuation Charges</Text>
          <Text style={styles.text}>
            Tax Amount: {loan.valuation_charges.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.valuation_charges.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount: {loan.valuation_charges.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate: {loan.valuation_charges.applicable_rate}
          </Text>

          {/* Legal and Incidental Fee */}
          <Text style={styles.subheading}>Legal and Incidental Fee</Text>
          <Text style={styles.text}>
            Tax Amount: {loan.legal_and_incidental_fee.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.legal_and_incidental_fee.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount: {loan.legal_and_incidental_fee.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate: {loan.legal_and_incidental_fee.applicable_rate}
          </Text>

          {/* Stamp Duty Applicable Rate */}
          <Text style={styles.subheading}>Stamp Duty Applicable Rate</Text>
          <Text style={styles.text}>
            Tax Amount: {loan.stamp_duty_applicable_rate.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.stamp_duty_applicable_rate.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount: {loan.stamp_duty_applicable_rate.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate: {loan.stamp_duty_applicable_rate.applicable_rate}
          </Text>

          {/* RCU Charges Applicable Rate */}
          <Text style={styles.subheading}>RCU Charges Applicable Rate</Text>
          <Text style={styles.text}>
            Tax Amount: {loan.rcu_charges_applicable_rate.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.rcu_charges_applicable_rate.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount: {loan.rcu_charges_applicable_rate.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate: {loan.rcu_charges_applicable_rate.applicable_rate}
          </Text>

          {/* Stamping Expenses Applicable Rate */}
          <Text style={styles.subheading}>
            Stamping Expenses Applicable Rate
          </Text>
          <Text style={styles.text}>
            Tax Amount: {loan.stamping_expenses_applicable_rate.tax_amount}
          </Text>
          <Text style={styles.text}>
            Total Amount: {loan.stamping_expenses_applicable_rate.total_amount}
          </Text>
          <Text style={styles.text}>
            Charge Amount:{" "}
            {loan.stamping_expenses_applicable_rate.charge_amount}
          </Text>
          <Text style={styles.text}>
            Applicable Rate:{" "}
            {loan.stamping_expenses_applicable_rate.applicable_rate}
          </Text>

          <Text style={styles.text}>Applicant ID: {loan.applicant}</Text>
          <Text style={styles.text}>Remarks: {loan.comment}</Text>
        </React.Fragment>
      ))}

      {/* CAF Details Section */}
      <Text style={styles.heading}>CAF Details</Text>
      {data.caf_details.map((caf, index) => (
        <React.Fragment key={index}>
          <Text style={styles.subheading}>CAF ID: {caf.caf_id}</Text>
          <Text style={styles.text}>UUID: {caf.uuid}</Text>
          <Text style={styles.text}>Tentative Amount: {caf.tentative_amt}</Text>
          <Text style={styles.text}>
            Place of PD Address: {caf.placeOfPdAddress}
          </Text>
          <Text style={styles.text}>Location: {caf.location}</Text>
          <Text style={styles.text}>
            Extra Data:{" "}
            {caf.extra_data.map((data, index) => (
              <Text key={index}>
                {data.key}: {data.value}{" "}
                {index !== caf.extra_data.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
          <Text style={styles.text}>Description: {caf.description}</Text>
          <Text style={styles.text}>PD With: {caf.pdWith}</Text>
          <Text style={styles.text}>Applicant ID: {caf.applicant}</Text>
          <Text style={styles.text}>Remarks: {caf.comment}</Text>
        </React.Fragment>
      ))}

      {/* Collateral Details Section */}
      <Text style={styles.heading}>Collateral Details</Text>
      {data.collateral_details.map((collateral, index) => (
        <React.Fragment key={index}>
          <Text style={styles.subheading}>
            Collateral ID: {collateral.collateral_id}
          </Text>
          <Text style={styles.text}>UUID: {collateral.uuid}</Text>
          <Text style={styles.text}>
            Collateral Type: {collateral.collateralType}
          </Text>
          <Text style={styles.text}>
            Collateral Name: {collateral.collateralName}
          </Text>
          <Text style={styles.text}>
            Primary Secondary: {collateral.primarySecondary}
          </Text>
          <Text style={styles.text}>
            Valuation Required: {collateral.valuationRequired}
          </Text>
          <Text style={styles.text}>
            Relationship with Loan: {collateral.relationshipWithLoan}
          </Text>
          <Text style={styles.text}>
            Property Owner: {collateral.propertyOwner}
          </Text>
          <Text style={styles.text}>
            Property Category: {collateral.propertyCategory}
          </Text>
          <Text style={styles.text}>
            Property Type: {collateral.propertyType}
          </Text>
          <Text style={styles.text}>
            Occupation Status: {collateral.occupationStatus}
          </Text>
          <Text style={styles.text}>
            Property Status: {collateral.propertyStatus}
          </Text>
          <Text style={styles.text}>
            Property Title: {collateral.propertyTitle}
          </Text>
          <Text style={styles.text}>
            House Flat Shop No: {collateral.houseFlatShopNo}
          </Text>
          <Text style={styles.text}>
            Khasra Plot No: {collateral.khasraPlotNo}
          </Text>
          <Text style={styles.text}>Locality: {collateral.locality}</Text>
          <Text style={styles.text}>Village: {collateral.village}</Text>
          <Text style={styles.text}>State: {collateral.state}</Text>
          <Text style={styles.text}>District: {collateral.district}</Text>
          <Text style={styles.text}>City: {collateral.city}</Text>
          <Text style={styles.text}>Taluka: {collateral.taluka}</Text>
          <Text style={styles.text}>Pincode: {collateral.pincode}</Text>
        </React.Fragment>
      ))}
    </Page>
  </Document>
);
export default MyDocument
