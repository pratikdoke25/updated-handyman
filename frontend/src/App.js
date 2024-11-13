import './App.css';
import { Hero } from './Pages/Hero';
import { Services } from './Pages/Services';
import { Reviews } from './Pages/Reviews';
import { Footer } from './Components/Footer';
import { Contact } from './Pages/Contact';
import { Hamburger } from './Components/Hamburger';
import { WhyUs } from './Components/WhyUs';
import { OurWork } from './Pages/OurWork';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Navigation } from './Components/Navigation';
import UserLogin from './Components/Auth/Login';
import VendorLogin from './Components/Auth/VendorLogin';
import UserRegister from './Components/Auth/Register';
import VendorRegister from './Components/Vendor/VendorRegister';
import UserDashboard from './Components/User/UserDashboard';
import VendorDashboard from './Components/Vendor/VendorDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import BusinessLeadsScraper from './Components/Vendor/BusinessLeadsScraper'
// Example for logged-in status (replace with real auth logic)
const isUserLoggedIn = true; // Adjust based on real user auth logic
const isAdminLoggedIn = false; // Adjust based on real admin auth logic
const isVendorLoggedIn = true; // Adjust based on real vendor auth logic

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/user-login" element={!isUserLoggedIn ? <UserLogin /> : <Navigate to="/user-dashboard" />} />
        <Route path="/vendor-login" element={!isVendorLoggedIn ? <VendorLogin /> : <Navigate to="/vendor-dashboard" />} />
        <Route path="/admin-login" element={!isAdminLoggedIn ? <AdminLogin /> : <Navigate to="/admin-dashboard" />} />

        {/* Registration Routes */}
        <Route path="/user-register" element={!isUserLoggedIn ? <UserRegister /> : <Navigate to="/user-dashboard" />} />
        <Route path="/vendor-register" element={!isVendorLoggedIn ? <VendorRegister /> : <Navigate to="/vendor-dashboard" />} />

        {/* Dashboard Routes */}
        <Route path="/user-dashboard" element={isUserLoggedIn ? <UserDashboard /> : <Navigate to="/user-login" />} />
        <Route path="/admin-dashboard" element={isAdminLoggedIn ? <AdminDashboard /> : <Navigate to="/admin-login" />} />
        <Route path="/vendor-dashboard" element={isVendorLoggedIn ? <VendorDashboard /> : <Navigate to="/vendor-login" />} />
    <Route path="/business-lead" element={<BusinessLeadsScraper />} />
        {/* Main Pages */}
        <Route path="/" element={
          <div className='background-wrapper'>
            <Hamburger />
            <Hero />
            <Services />
            <OurWork />
            <WhyUs />
            <Contact />
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
