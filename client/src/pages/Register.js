import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "../styles.css";
import bloodBackground from "../pages/donation.jpg"; // Replace with your image path
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "donor",
    location: "",
    bloodGroup: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "phoneNumber" && value && !value.startsWith("+91")) {
      value = "+91" + value;
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber.startsWith("+91")) {
      toast.error("Phone number must start with +91");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      toast.success(response.data.message || "Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bloodBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="form-container">
        <h2 className="form-title">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              placeholder="+91XXXXXXXXXX"
              pattern="^\+91\d{10}$"
              title="Enter a valid phone number starting with +91 followed by 10 digits"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" onChange={handleChange}>
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Enter your location"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select name="bloodGroup" onChange={handleChange} required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="button w-100" style={{ backgroundColor: "#d32f2f", borderColor: "#d32f2f" }}>
            Register
          </Button>
        </Form>
      </Container>
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <Link to="/" style={{ margin: "0 10px", color: "white" }}>
          Home
        </Link>
        <Link to="/login" style={{ margin: "0 10px", color: "white" }}>
          Login
        </Link>
        <Link to="/blood-request" style={{ margin: "0 10px", color: "white" }}>
          Blood Request
        </Link>
      </div>
    </div>
  );
};

export default Register;