import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  page: {
    padding: 30,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 14,
    marginVertical: 5,  
    
    fontWeight: 'bold',
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "35%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#bdbdbd",
    padding: 5,
  },
  tableCol: {
    width: "65%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  text: {
    marginBottom: 5,
  },
  paragraph:{
fontSize:"15px",
margin:5,
fontWeight:"thin"
  },
  textFile: {
    fontSize: 10,
    color: 'blue',
    textDecoration: 'underline',
  },
});

const MyDocument = ({data: pdfDetails }) => {
  const loanDetail = pdfDetails?.loan_details?.[0];
  const applicant = loanDetail?.applicant;
  const loanAmount=loanDetail.applied_loan_amount;
  
  return(

  <Document>
    <Page size="A4" style={styles.page}>
<Text style={styles.heading}>Sanction Letter</Text>
<View style={styles.table}>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Borrower's Name</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Borrower's Permanent Address</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Borrower's Current Address</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Co-Borrower's Name </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Co-Borrower's Address</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Guarantor’s Name </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Guarantor's Address </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Mortgagor's Name </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Mortgagor's Address  </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>




</View>

{/* subject */}
<View>
  
<Text>
            <Text style={{fontWeight:"bold",fontSize:"15px",marginTop:"1px"}}>Subject: </Text>
            <Text style={{fontWeight:"thin",fontSize:"12px",marginTop:"1px"}}> Your application no. {applicant} for availing SBL Business Funding loan</Text>
          </Text>    </View>  {/* Loan Details Section */}
{/*  */}
<View>
<Text style={{fontWeight:"medium",fontSize:"12px"}}> Dear Sir/Madam,</Text>
<Text style={styles.paragraph}>

We, DK finance Bank  (herein after also referred to as the Bank ) are delighted to inform $applicantName (herein after referred to as Borrower ) that your application for sanction of SBL Business Funding loan, has been accepted by us. The grant of the loan
</Text>
<View style={styles.table}>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Loan Amount</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>{loanAmount}</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Effective Int. Rate</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>EMI </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Tenure(in Months) </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>EMI Due Date </Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>
<View style={styles.tableRow}>

  <View style={styles.tableColHeader}>
    <Text style={styles.tableCell}>Frequency</Text>
  </View>
  <View style={styles.tableCol}>
    <Text style={styles.tableCell}>NA</Text>
  </View>
</View>

</View>
</View>
<View>
<Text style={styles.paragraph}>
The sanction letter is forwarded in duplicate to enable you to confirm in writing that the terms and conditions mentioned in the sanction letter are
acceptable. Kindly sign & return the duplicate copy.
</Text>
</View>
<View>
<Text style={styles.paragraph}>
If you require any further clarification relation to your Loan Account, please feel free to call our Relationship Manager. Our Relationship Team
would be glad to assist you.
</Text>
</View>

 <Text style={styles.heading}>Loan Details</Text>
      {pdfDetails?.loan_details.map((loan, index) => (
        <View key={index} style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Loan ID</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.loan_id}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Product Type</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.product_type}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Transaction Type</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.transaction_type}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Case Tag</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.case_tag}</Text></View>
          </View>
          <Text style={styles.subheading}>Processing Fees</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.processing_fees.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.processing_fees.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.processing_fees.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.processing_fees.total_amount}</Text></View>
          </View>

          <Text style={styles.subheading}>Valuation Charges</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.valuation_charges.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.valuation_charges.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.valuation_charges.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.valuation_charges.total_amount}</Text></View>
          </View>

          <Text style={styles.subheading}>Legal and Incidental Fee</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.legal_and_incidental_fee.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.legal_and_incidental_fee.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.legal_and_incidental_fee.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.legal_and_incidental_fee.total_amount}</Text></View>
          </View>

          <Text style={styles.subheading}>Stamp Duty</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamp_duty_applicable_rate.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamp_duty_applicable_rate.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamp_duty_applicable_rate.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamp_duty_applicable_rate.total_amount}</Text></View>
          </View>

          <Text style={styles.subheading}>RCU Charges</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.rcu_charges_applicable_rate.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.rcu_charges_applicable_rate.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.rcu_charges_applicable_rate.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.rcu_charges_applicable_rate.total_amount}</Text></View>
          </View>

          <Text style={styles.subheading}>Stamping Expenses</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Applicable Rate %</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamping_expenses_applicable_rate.applicable_rate}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Charge Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamping_expenses_applicable_rate.charge_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tax Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamping_expenses_applicable_rate.tax_amount}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{loan.stamping_expenses_applicable_rate.total_amount}</Text></View>
          </View>

        </View>



      ))}

      {/* CAF Details Section */}
      <Text style={styles.heading}>CAF Details</Text>
      {pdfDetails?.caf_details.map((caf, index) => (
        <View key={index} style={styles.table}>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>CAF ID</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{caf.caf_id}</Text></View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Tentative Amount</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{caf.tentative_amt}</Text></View>
          </View>          

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>PD with</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{caf.pdWith}</Text></View>
          </View>          

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Place of PD Address</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{caf.placeOfPdAddress}</Text></View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Location</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{caf.location}</Text></View>
          </View>

        </View>
      ))}

      {/* Collateral Details Section */}
      <Text style={styles.heading}>Collateral Details</Text>
      {pdfDetails?.collateral_details.map((collateral, index) => (
        <View key={index} style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Collateral ID</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{collateral.collateral_id}</Text></View>
          </View>
          {/* Add other collateral fields in a similar manner */}
        </View>
      ))}

      {/* Document Details Other Section */}
      <Text style={styles.heading}>Documents</Text>
      {pdfDetails?.document_details_other.map((document, index) => (
        <View key={document.uuid} style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Document Name</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{document.document_name}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Document ID</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{document.document_id}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>File</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}><Link src={document.file}>Download Link</Link></Text></View>
          </View>
        </View>
      ))}

      {/* Photo Details Other Section */}
      <Text style={styles.heading}>Photographs</Text>
      {pdfDetails?.document_details_photos.map((document, index) => (
        <View key={document.uuid} style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCell}>Photo</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}><Link src={document.file}>Download Link</Link></Text></View>
          </View>
        </View>
      ))}
<View>
<Text style={styles.paragraph}> 
** Optional{'\n'}
*Pre EMI as Applicable{'\n'}

All other charges to be borne by the Borrower as per schedule of charges of the Bank mentioned on the Bank's website,

</Text>
<Text style={styles.paragraph}>

  All other charges to be borne by the Borrower as per schedule of charges of the Bank mentioned on the Bank's website,{'\n'}
  1. The sanctioned loan will be disbursed only after the scrutiny and clearance of proposed property by DK Finance Bank Limited and as per the rules of DK Finance Bank Limited.{'\n'}
  2. (a) Pre-EMI interest at the rate, at which the EMI has been calculated, shall be charged from the respective date(s) of disbursements to the date of commencement of EMI in respect of the loan.{'\n'}
     (b) The EMI comprises of principal and interest calculated on the basis of monthly / Yearly rest at the rate applicable, which is rounded off to the next higher rupee.{'\n'}
  3. The EMIs, Pre-EMI interests are to be paid on or before your cycle date of every month.{'\n'}
  4. Installment schedule is normally equated monthly installments (it could be quarterly or Half yearly in case of Tractor loans) subject to the bank accounts 2-3 days prior to due date of EMI, for clearance of EMI on due dates, to avoid penal Interest and other charges and avoid delinquency status.{'\n'}
  5. The Loan will be secured by first and exclusive mortgage of the property proposed for availing this loan and / or such other security, as DK Finance Bank Limited may find necessary and acceptable. Such documents/ reports/ evidence as may be required by DK Finance Bank Limited shall be produced to ascertain that the property to be mortgaged with DK Finance Bank Limited has a clear and marketable title. The original title deeds to the property proposed to be purchased shall be deposited by the borrower for securing the loan.{'\n'}
  6. Acceptance of premium does not make respective Insurance Company liable for acceptance of risk. Insurance cover is subject to satisfaction of the Insurance Company and submission of requisite documents, details and conduct of medical examinations at the instance of the Insurance Company and AU Small Finance Bank. Insurance cover shall commence after risk under the application is accepted in writing by respective Insurance Company and such writing communicated to the insured. Insurance Cover will be issued/extended by the respective insurance Company, and DK Finance Bank acts only as an intermediary.{'\n'}
  7. In case of additional limits, the existing mortgage shall be extended to cover the proposed additional limit and/ or as per the sanctioned conditions.{'\n'}
  8. DK Finance Bank Limited shall be informed in writing about any changes: In correspondence address/ contact details, Change of employment, Loss of job, business, profession, as the case maybe immediately after such change/ loss. Borrower shall notify the causes of delay, loss / damage to the property and also notify the additions / alterations to the property.{'\n'}
  9. We do not accept laminated title/ security documents. Therefore, the Borrower is required to inform us if the title/ security documents pertaining to the mortgage security are laminated. We further reserve our right to accept or reject any and/or such documents without assigning any reasons thereof. The decision of DK Finance Bank shall be final and binding on the Borrower.{'\n'}
  10. This sanction letter shall stand revoked and cancelled and shall be absolutely null and void if:{'\n'}
      (a) any material changes occur in the proposal for which this loan is, in principle sanctioned.{'\n'}
      (b) any material fact concerning income, or ability to repay or any other relevant aspect of the proposal or application for loan is withheld, suppressed, concealed or not made known to DK Finance Bank Limited.{'\n'}
      (c) Any statement made in the loan application is found to be incorrect or untrue.{'\n'}
  11. All stamp duty and registration charges, if any, as per State Stamp Act of any document executed by you in favour of DK Finance Bank Limited shall be payable by you in full.{'\n'}
  12. In the event of any non-compliance of legal and technical formalities required by DK Finance Bank Limited, all the fees paid to DK Finance Bank Limited will be non-refundable.{'\n'}
  13. The issuance of this sanction letter does not give/confer any legal rights and DK Finance Bank Limited will be at full liberty to revoke this sanction letter, due to any of the reasons mentioned above or otherwise.{'\n'}
  14. Due to changes in the rate of interest, the number of EMIs is liable to vary, from time to time.{'\n'}
  15. Any default, fraud, legal incompetence during the currency of limits, non-compliance of the agreed terms and conditions, non-submission of the required papers, over dues in the loan any other irregularities of the Borrower will enable the Bank to recall the loan immediately irrespective of any grace period/cure period mentioned in any other document.{'\n'}
  16. The Bank shall have right of lien and set off over the amount or deposits or any other asset of the Borrower and /or Mortgagor and/ or Co-Borrower and/or Guarantor lying with the Bank.{'\n'}
  17. The Bank has the right to substitute / change EBR / MCLR with any alternate rate or to change the spread over EBR/ MCLR or such rate, as per policy of the Bank or as may be required by RBI / statutory directive.{'\n'}
  18. The Sanction Letter is valid for a period of 90 days if loan amount is up to Rs. 100 lacs & if loan amount is more than Rs. 100 lacs then Sanction Letter is valid for period of 45 days from the date of sanction.{'\n'}
  19. Any amount paid by customer against Part Payment/ Excess amount during loan tenure, Part payment will be effected from next EMI date, after the deduction of applicable prepayment charges, if any.{'\n'}
  20. Please note that this sanction letter contains indicative terms and condition and do not create any obligation on the part of DK Finance Bank to disburse the loan.{'\n'}
  21. Further, this sanction does not vest in anyone; the right to claim any damage against DK Finance Bank Limited for any reasons whatsoever.{'\n'}
  22. The loan/facility sanctioned by the Bank shall be utilized by the Borrower exclusively for the purpose specified herein. In the event the loan/facility is utilized or found by the Bank to be utilized by the Borrower for any other purpose than specified herein, without the prior written permission of the Bank, the Bank shall be at liberty to recall the loan/facility or charge penal interest rate or increase the applicable interest rate as the Bank may deem fit.
</Text>

</View>


    </Page>
  </Document>
);}

export default MyDocument;