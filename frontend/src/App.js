import './App.css';
import { Hero } from './Pages/Hero';
import { Services } from './Pages/Services';
import { Reviews } from './Pages/Reviews';
import { Footer } from './Components/Footer';
import { Contact } from './Pages/Contact';
import { Hamburger } from './Components/Hamburger';
import { WhyUs } from './Components/WhyUs';
import { OurWork } from './Pages/OurWork';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from './Components/Navigation';
import UserLogin from './Components/Auth/Login';
import VendorLogin from './Components/Auth/VendorLogin';
import UserRegister from './Components/Auth/Register';
import VendorRegister from './Components/Vendor/VendorRegister';
import UserDashboard from './Components/User/UserDashboard';
import VendorDashboard from './Components/Vendor/VendorDashboard';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminLogin from './Components/Admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Registration Routes */}
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/vendor-register" element={<VendorRegister />} />

        {/* Dashboard Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

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
