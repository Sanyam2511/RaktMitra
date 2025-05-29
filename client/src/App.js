import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BloodRequest from "./pages/BloodRequest";
import BloodBankDashboard from "./pages/BloodBankDashboard";
import UserProfile from "./pages/UserProfile"; // Import UserProfile
import EditProfile from "./pages/EditProfile"; // Import EditProfile
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
      <ToastContainer 
      position="top-center" // Try different positions like "top-right", "top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}  // Show newest notifications on top
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored" // Make toasts more visible with colors
      style={{ zIndex: 9999 }}
      />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bloodbank" element={<BloodBankDashboard />} />
          <Route path="/blood-request" element={<BloodRequest />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Added route for UserProfile */}
          <Route path="/edit-profile" element={<EditProfile />} /> {/* Added route for EditProfile */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;