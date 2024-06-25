import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginPage } from "./blocks/Login";
import { Header } from "./components/Header";
import { useSelector } from "react-redux";
import DashboardPage from "./blocks/Dashboard";
import { Customers } from "./blocks/Customer";
import CustomerForm from "./blocks/CustomerForm";
import LoanDetails from "./blocks/Loan-details";
import DocumentUpload from "./blocks/Document-upload";
import PhotoUpload from "./blocks/Photo-upload";
import Collateral from "./blocks/Collateral";
import CustomerCaf from "./blocks/Customer-caf";
import Container from '@mui/material/Container';
import MyDocument from "./components/MyDocument";


function App() {
  // Use useSelector hook to get the loggedIn state from Redux store
  const isLoggedIn = useSelector((state) => state.authReducer.loggedIn);

  return (
    <BrowserRouter>
      { <Header />} 
      <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/applicant/customers" element={<Customers />} />
        <Route path="/applicant/customer/details" element={<CustomerForm />} />
        <Route path="/applicant/loan" element={<LoanDetails />} />
        <Route path="/applicant/document/uploads" element={<DocumentUpload />} />
        <Route path="/applicant/photographs/uploads" element={<PhotoUpload />} />
        <Route path="/applicant/collateral" element={<Collateral />} />
        <Route path="/applicant/customer/application" element={<CustomerCaf />} />
        <Route path="/pdf" element={<MyDocument/>} />
      </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
