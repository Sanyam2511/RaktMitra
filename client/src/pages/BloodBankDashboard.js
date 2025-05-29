import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BloodBankDashboard = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBloodBank, setIsBloodBank] = useState(false); 
  
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newBloodBank, setNewBloodBank] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    licenseNumber: "",
  });
  
  // New state for blood stock
  const [initialStock, setInitialStock] = useState({
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "AB+": 0,
    "AB-": 0,
    "O+": 0,
    "O-": 0,
  });

  const fetchBloodBanks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/bloodbank", { timeout: 10000 });
      console.log("Blood bank data received:", response.data);
      setBloodBanks(response.data);
    } catch (err) {
      console.error("Error fetching blood banks:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBloodBanks();

    const userRole = localStorage.getItem("userRole"); 
    if (userRole === "blood_bank") {
      setIsBloodBank(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBloodBank({
      ...newBloodBank,
      [name]: value,
    });
  };
  
  // Handler for blood stock input changes
  const handleStockChange = (bloodType, value) => {
    // Ensure value is a non-negative integer
    const numValue = parseInt(value) >= 0 ? parseInt(value) : 0;
    setInitialStock({
      ...initialStock,
      [bloodType]: numValue
    });
  };

  const handleBloodBankRegister = async (e) => {
    e.preventDefault();
    
    if (!latitude || !longitude) {
      toast.error("Please enter both latitude and longitude");
      return;
    }
    
    try {
      const geoLocation = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]  
      };
      
      await axios.post("/api/bloodbank", {
        ...newBloodBank,
        location: geoLocation,
        stock: initialStock // Add the blood stock to the registration
      });
      
      toast.success("Blood bank registered successfully");
      fetchBloodBanks(); 
      
      setNewBloodBank({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        licenseNumber: "",
      });
      setLatitude("");
      setLongitude("");
      // Reset stock
      setInitialStock({
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (loading) return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffebee 100%)"
      }}
    >
      <div className="text-center">
        <div className="spinner-border text-danger mb-3" role="status" style={{width: "3rem", height: "3rem"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="text-danger">Loading Blood Bank Data</h3>
        <p className="text-muted">Please wait while we fetch the latest information...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div 
      className="container mt-4 p-5 text-center" 
      style={{
        background: "linear-gradient(135deg, #f5f5f5 0%, #ffebee 100%)",
        minHeight: "100vh"
      }}
    >
      <div className="alert alert-danger shadow-sm">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h3>Something went wrong</h3>
        <p className="lead">Error: {error.message}</p>
        <button 
          className="btn btn-outline-danger mt-3"
          onClick={fetchBloodBanks}
        >
          <i className="fas fa-sync-alt me-2"></i>Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      background: "linear-gradient(135deg, #f5f5f5 0%, #ffebee 100%)",
      minHeight: "100vh",
      paddingTop: "2rem",
      paddingBottom: "2rem"
    }}>
      <div className="container">
        <div className="text-center mb-5">
          
          <h1 className="display-4 fw-bold text-danger mb-2">Blood Bank Dashboard</h1>
          <p className="lead text-muted">Manage and monitor blood inventory across facilities</p>
          <div className="border-bottom border-danger w-25 mx-auto mt-3" style={{borderWidth: "2px !important"}}></div>
        </div>

        <div className="card mb-5 border-0 shadow-lg" style={{borderRadius: "15px", overflow: "hidden"}}>
          <div className="card-header text-white p-4" style={{backgroundColor: "#b71c1c"}}>
            <div className="d-flex align-items-center">
              <i className="fas fa-plus-circle fa-2x me-3"></i>
              <h2 className="mb-0">Register New Blood Bank</h2>
            </div>
          </div>
          <div className="card-body p-4" style={{backgroundColor: "#fff9f9"}}>
            <form onSubmit={handleBloodBankRegister}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label text-danger fw-bold">
                    <i className="fas fa-hospital-alt me-2"></i>Blood Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-danger border-opacity-25"
                    id="name"
                    name="name"
                    value={newBloodBank.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter blood bank name"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label text-danger fw-bold">
                    <i className="fas fa-envelope me-2"></i>Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control border-danger border-opacity-25"
                    id="email"
                    name="email"
                    value={newBloodBank.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label text-danger fw-bold">
                    <i className="fas fa-lock me-2"></i>Password
                  </label>
                  <input
                    type="password"
                    className="form-control border-danger border-opacity-25"
                    id="password"
                    name="password"
                    value={newBloodBank.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a secure password"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNumber" className="form-label text-danger fw-bold">
                    <i className="fas fa-phone me-2"></i>Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control border-danger border-opacity-25"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={newBloodBank.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter contact number"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="licenseNumber" className="form-label text-danger fw-bold">
                  <i className="fas fa-id-card me-2"></i>License Number
                </label>
                <input
                  type="text"
                  className="form-control border-danger border-opacity-25"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={newBloodBank.licenseNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter official license number"
                />
              </div>

              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="latitude" className="form-label text-danger fw-bold">
                    <i className="fas fa-map-marker-alt me-2"></i>Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control border-danger border-opacity-25"
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    placeholder="Enter latitude coordinates"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="longitude" className="form-label text-danger fw-bold">
                    <i className="fas fa-map-marker-alt me-2"></i>Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="form-control border-danger border-opacity-25"
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                    placeholder="Enter longitude coordinates"
                  />
                </div>
              </div>
              
              {/* New Blood Stock Section */}
              <div className="card mb-4 border-0 shadow-sm" style={{
                backgroundColor: "#ffebee", 
                borderRadius: "10px"
              }}>
                <div className="card-body">
                  <h4 className="text-danger mb-3">
                    <i className="fas fa-tint me-2"></i>Initial Blood Stock
                  </h4>
                  <p className="text-muted mb-3">Enter the number of units available for each blood type</p>
                  
                  <div className="row g-3">
                    {Object.keys(initialStock).map((bloodType) => (
                      <div className="col-md-3 col-6" key={bloodType}>
                        <div className="mb-3">
                          <label htmlFor={`stock-${bloodType}`} className="form-label text-danger">
                            <span className="fw-bold">{bloodType}</span> (units)
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-danger text-white">
                              <i className="fas fa-tint"></i>
                            </span>
                            <input
                              type="number"
                              className="form-control border-danger border-opacity-25"
                              id={`stock-${bloodType}`}
                              min="0"
                              value={initialStock[bloodType]}
                              onChange={(e) => handleStockChange(bloodType, e.target.value)}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-lg w-100 text-white" 
                style={{ 
                  backgroundColor: "#b71c1c", 
                  borderColor: "#b71c1c",
                  borderRadius: "30px"
                }}
              >
                <i className="fas fa-hospital-alt me-2"></i>Register Blood Bank
              </button>
            </form>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex align-items-center mb-3">
            <i className="fas fa-tint fa-2x text-danger me-3"></i>
            <h2 className="mb-0 text-danger">Blood Bank Inventory</h2>
          </div>
          <p className="text-muted mb-4">Current blood stock availability across all registered blood banks</p>
        </div>

        {bloodBanks.length === 0 ? (
          <div className="card border-0 shadow-sm mb-4" style={{backgroundColor: "#fff9f9"}}>
            <div className="card-body p-5 text-center">
              <i className="fas fa-search fa-3x text-danger mb-3 opacity-50"></i>
              <h3 className="text-danger">No Blood Banks Found</h3>
              <p className="text-muted">No blood banks are currently registered in the system.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            {bloodBanks.map((bank) => (
              <div className="col-lg-4 col-md-6 mb-4" key={bank._id}>
                <div className="card h-100 border-0 shadow-sm" style={{
                  borderRadius: "15px", 
                  overflow: "hidden",
                  backgroundColor: "#fff9f9" 
                }}>
                  <div className="card-header text-white p-3" style={{backgroundColor: "#b71c1c"}}>
                    <h3 className="card-title mb-0">
                      <i className="fas fa-hospital-alt me-2"></i>
                      {bank.name}
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      {bank.location && bank.location.coordinates && (
                        <div className="me-3">
                          <i className="fas fa-map-marker-alt fa-2x text-danger"></i>
                        </div>
                      )}
                      <div>
                      {bank.location && Array.isArray(bank.location.coordinates) && bank.location.coordinates.length >= 2 && (
  <p className="card-text mb-0">
    <strong>Location:</strong> {bank.location.coordinates[1].toFixed(4)}, {bank.location.coordinates[0].toFixed(4)}
  </p>
)}
                        
                      </div>
                    </div>
                    
                    <div className="d-flex align-items-center mb-3">
                      {bank.phoneNumber && (
                        <>
                          <div className="me-3">
                            <i className="fas fa-phone fa-lg text-danger"></i>
                          </div>
                          <div>
                            <p className="card-text mb-0">
                              <strong>Phone:</strong> {bank.phoneNumber}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="d-flex align-items-center mb-4">
                      {bank.licenseNumber && (
                        <>
                          <div className="me-3">
                            <i className="fas fa-id-card fa-lg text-danger"></i>
                          </div>
                          <div>
                            <p className="card-text mb-0">
                              <strong>License:</strong> {bank.licenseNumber}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="card mb-0" style={{
                      backgroundColor: "#ffebee", 
                      border: "none",
                      borderRadius: "10px"
                    }}>
                      <div className="card-body">
                        <h5 className="text-danger mb-3">
                          <i className="fas fa-tint me-2"></i>Blood Stock
                        </h5>
                        {bank.stock && (
                          <div className="row g-2">
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">A+</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["A+"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">A-</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["A-"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">B+</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["B+"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">B-</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["B-"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">O+</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["O+"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">O-</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["O-"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">AB+</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["AB+"] || 0} units
                                </span>
                              </div>
                            </div>
                            <div className="col-3 mb-2">
                              <div className="p-2 text-center rounded shadow-sm bg-white">
                                <span className="d-block mb-1 fw-bold text-danger">AB-</span>
                                <span className="badge rounded-pill" style={{
                                  backgroundColor: "#b71c1c",
                                  fontSize: "0.9rem",
                                  padding: "5px 10px"
                                }}>
                                  {bank.stock["AB-"] || 0} units
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer border-0" style={{backgroundColor: "#ffebee"}}>
                    <button className="btn btn-outline-danger w-100">
                      <i className="fas fa-eye me-2"></i>View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBankDashboard;