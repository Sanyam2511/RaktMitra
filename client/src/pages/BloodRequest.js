import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bloodRequestBackground from "../pages/donation2.png"; // Import your image

const BloodRequest = () => {
  const [request, setRequest] = useState({
    requester: "",
    bloodGroup: "",
    urgency: "low",
    location: "",
    contact: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");
  
    try {
      await axios.post("http://localhost:5000/api/blood-request", request);
      
      toast.success("Blood request submitted successfully!");
  
      setRequest({
        requester: "",
        bloodGroup: "",
        urgency: "low",
        location: "",
        contact: "",
      });
  
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to submit blood request");
    }
  };
  

  return (
    
    <div
  style={{
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  }}
>
  {/* Background Image */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${bloodRequestBackground})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      filter: "blur(8px)", // Blurring the background image
      zIndex: -2,
    }}
  ></div>

  {/* Black Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(63, 62, 62, 0.5)", // Black overlay with 50% opacity
      zIndex: -1,
    }}
  ></div>
      <div
        style={{
          maxWidth: "500px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "white", // Opaque white background
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Submit Blood Request</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Requester:</label>
            <input
              type="text"
              name="requester"
              value={request.requester}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Blood Type:</label>
            <select
              name="bloodGroup"
              value={request.bloodGroup}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            
            
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Urgency:</label>
            <select
              name="urgency"
              value={request.urgency}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={request.location}
              onChange={handleChange}
              placeholder="Enter location"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={request.contact}
              onChange={handleChange}
              placeholder="Enter contact information"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
    
  );
};

export default BloodRequest;