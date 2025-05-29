
import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import "../styles.css";
import Carousel from "react-bootstrap/Carousel";
import CountUp from "react-countup";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [donations, setDonations] = useState(1250); // State for donations
  const [livesSaved, setLivesSaved] = useState(800); // State for lives saved
  const [donors, setDonors] = useState(500);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New authentication state
  const navigate = useNavigate();

  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Simulate fetching or updating statistics (replace with actual data)
    setTimeout(() => {
      setDonations(1500);
      setLivesSaved(950);
      setDonors(600);
    }, 3000);
  }, []);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

    
    

  return (
    <div>
      
      <NavbarComponent />

      {/* Main Content (Top Section) */}
      <div className="background-container">
      <div className="home-container">
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div
            style={{
              position: "relative",
              width: "80px", // Adjust size as needed
              height: "80px",
              marginRight: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f5f5f5, #e6e6e6)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  opacity: "0.3",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "22px",
                    height: "1px",
                    top: "14px",
                    left: "8px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "1px",
                    height: "18px",
                    top: "14px",
                    left: "32px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "28px",
                    height: "1px",
                    top: "32px",
                    left: "32px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "1px",
                    height: "14px",
                    top: "32px",
                    left: "58px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "18px",
                    height: "1px",
                    top: "46px",
                    left: "40px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "1px",
                    height: "18px",
                    top: "46px",
                    left: "40px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    backgroundColor: "#0288d1",
                    width: "32px",
                    height: "1px",
                    top: "54px",
                    left: "8px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "28px",
                  height: "28px",
                  background: "linear-gradient(135deg, #e53935, #d32f2f)",
                  borderRadius: "0 50% 50% 50%",
                  transform: "rotate(45deg)",
                  top: "20px",
                  left: "20px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                  zIndex: "2",
                }}
              >
                <div
                  style={{
                    content: "''",
                    position: "absolute",
                    top: "6px",
                    left: "6px",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div
                style={{
                  position: "absolute",
                  border: "2px solid rgba(229, 57, 53, 0.5)",
                  borderRadius: "50%",
                  opacity: "0.5",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  width: "68px",
                  height: "68px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                    borderRadius: "50%",
                    opacity: "1",
                    top: "22px",
                    left: "14px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                  borderRadius: "50%",
                  opacity: "1",
                  top: "18px",
                  left: "44px",
                }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                  borderRadius: "50%",
                  opacity: "1",
                  top: "40px",
                  left: "54px",
                }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                  borderRadius: "50%",
                  opacity: "1",
                  top: "50px",
                  left: "27px",
                }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                  borderRadius: "50%",
                  opacity: "1",
                  top: "32px",
                  left: "8px",
                }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    width: "3px",
                    height: "3px",
                    backgroundColor: "#0288d1",
                  borderRadius: "50%",
                  opacity: "1",
                  top: "44px",
                  left: "14px",
                }}
                ></div>
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "44px",
                  height: "14px",
                  bottom: "16px",
                  left: "12px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "rgba(2, 136, 209, 0.8)",
                    top: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position:"absolute",
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to right, rgba(2, 136, 209, 0) 0%, rgba(2, 136, 209, 0) 30%, rgba(2, 136, 209, 0.8) 50%, rgba(2, 136, 209, 0) 70%, rgba(2, 136, 209, 0) 100%)",
                      transform: "translateX(0)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="home-title">Welcome to RaktMitra</h1>
        </div>
        <p className="home-subtitle">
          Join our community and help save lives by donating or requesting
          blood.
        </p>
        <div>
          <Link to="/register">
            <button className="home-button">
              <FaUserPlus className="me-2" /> Register
            </button>
          </Link>
          <Link to="/login">
            <button className="home-button">
              <FaSignInAlt className="me-2" /> Login
            </button>
          </Link>
        </div>
      </div>


      {/* Donation Statistics Section */}
      {/* ... (Navbar and Top Section remain the same) ... */}

      {/* Donation Statistics Section (Modified) */}
      <div className="statistics-section">
        <h2 className="statistics-title">Our Donation Statistics</h2>
        <div className="statistics-grid">
          <div className="statistic-item">
            <span className="statistic-value">
              <CountUp end={donations} duration={2} />+
            </span>
            <span className="statistic-label">Donations Made</span>
          </div>
          <div className="statistic-item">
            <span className="statistic-value">
              <CountUp end={livesSaved} duration={2} />+
            </span>
            <span className="statistic-label">Lives Saved</span>
          </div>
          <div className="statistic-item">
            <span className="statistic-value">
              <CountUp end={donors} duration={2} />+
            </span>
            <span className="statistic-label">Registered Donors</span>
          </div>
        </div>
      </div>
    </div>

      <Carousel
        id="myCarousel"
        className="mb-6"
        data-bs-ride="carousel"
        style={{ backgroundColor: "#f8d7da" }}
      >
        {/* ... (Carousel Items Remain Same) ... */}
        <Carousel.Item>
  <div style={{ position: 'relative', width: '100%', height: '400px' }}> 
    <img 
      src="./photo3.png" // Assuming the image is in the same directory
      alt="Donor Spotlight" 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover the entire area
    />
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(139, 96, 96, 0.3)' 
    }}></div> 
    <Carousel.Caption className="text-end">
      
      <p>
        <a
          className="btn btn-lg btn-primary"
          href="https://accordhospitals.co.in/blogs/why-you-should-donate-blood/"
          style={{
            backgroundColor: "#D2665A",
            borderColor: "#D2665A",
          }}
        >
          Learn More
        </a>
      </p>
    </Carousel.Caption>
  </div>
</Carousel.Item>
        
<Carousel.Item>
  <div style={{ position: 'relative', width: '100%', height: '400px' }}> 
    <img 
      src="./photo2.png" // Assuming the image is in the same directory
      alt="Donor Spotlight" 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover the entire area
    />
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(139, 96, 96, 0.3)' 
    }}></div> 
    <Carousel.Caption className="text-end">
      <p>
        <a
          className="btn btn-lg btn-primary"
          href="https://www.truemeds.in/blog/benefits-of-blood-donation-side-effects-advantages"
          style={{
            backgroundColor: "#D2665A",
            borderColor: "#D2665A",
          }}
        >
          Learn More
        </a>
      </p>
    </Carousel.Caption>
  </div>
</Carousel.Item>
        <Carousel.Item>
  <div style={{ position: 'relative', width: '100%', height: '400px' }}> 
    <img 
      src="./photo1.png" // Assuming the image is in the same directory
      alt="Donor Spotlight" 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Cover the entire area
    />
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'rgba(139, 96, 96, 0.3)' 
    }}></div> 
    <Carousel.Caption className="text-end">
      <p>
        <a
          className="btn btn-lg btn-primary"
          href="https://www.medicoverhospitals.in/articles/blood-donation-dos-donts"
          style={{
            backgroundColor: "#D2665A",
            borderColor: "#D2665A",
          }}
        >
          Learn More
        </a>
      </p>
    </Carousel.Caption>
  </div>
</Carousel.Item>
      </Carousel>


      <div className="background-container">
      <div className="container marketing ">
    <div className="row mt-4">
        <div className="col-lg-4 mb-4"> {/* Added mb-4 for spacing */}
            <div className="card shadow h-100"> {/* Added card and shadow */}
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center mb-3"> {/* Added mb-3 for spacing */}
                        <svg
                            className="bd-placeholder-img rounded-circle"
                            width="140"
                            height="140"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder"
                            preserveAspectRatio="xMidYMid meet"
                            focusable="false"
                        >
                            <image
                                href="./icon1.png"
                                x="0"
                                y="0"
                                width="140"
                                height="140"
                            />
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="transparent"></rect>
                        </svg>
                    </div>
                    <h2 className="fw-normal">Register</h2>
                    <p>
                        Create an account to become a donor or to request blood.
                    </p>
                    <Link to="/register">
                        <button className="btn btn-secondary">Register Now »</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4"> 
            <div className="card shadow h-100"> 
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center mb-3"> 
                        <svg
                            className="bd-placeholder-img rounded-circle"
                            width="140"
                            height="140"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <image
                                href="./icon2.png"
                                x="0"
                                y="0"
                                width="140"
                                height="140"
                            />
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="transparent"></rect>
                        </svg>
                    </div>
                    <h2 className="fw-normal">Donate/Request</h2>
                    <p>
                        Donate blood to save lives or request blood for medical needs.
                    </p>
                    <Link to="/blood-request">
                        <button className="btn btn-secondary">View Requests »</button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="col-lg-4 mb-4"> {/* Added mb-4 for spacing */}
            <div className="card shadow h-100"> {/* Added card and shadow */}
                <div className="card-body text-center">
                    <div className="d-flex justify-content-center mb-3"> {/* Added mb-3 for spacing */}
                        <svg
                            className="bd-placeholder-img rounded-circle"
                            width="140"
                            height="140"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <image
                                href="./icon3.png"
                                x="0"
                                y="0"
                                width="140"
                                height="140"
                            />
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="transparent"></rect>
                        </svg>
                    </div>
                    <h2 className="fw-normal">Connect</h2>
                    <p>
                        Connect with donors, blood banks, and those in need.
                    </p>
                    <Link to="/bloodbank">
                        <button className="btn btn-secondary">Blood Banks »</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>

  <div className="container mt-5">
    <div className="row mt-8">
        <div className="col-md-12 text-center">
            <h2 className="mb-2" style={{ fontWeight: '600', color: '#333' }}>Tips for Blood Donation</h2>
            <p className="lead" style={{ color: '#666' }}>Here are some tips to put your mind at ease during the blood donation process</p>
        </div>
    </div>
    <div className="row mt-4">
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0 p-4 rounded-lg tip-card">
                <div className="card-body text-center">
                    <h3 className="mb-3" style={{ fontWeight: '600', color: '#444' }}>The Day Before</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2" style={{ color: '#555' }}>Have an iron-rich diet (beans, spinach, meat, poultry).</li>
                        <li className="mb-2" style={{ color: '#555' }}>Have a proper sleep of at least 8 hours.</li>
                        <li style={{ color: '#555' }}>Include more liquids in your diet.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0 p-4 rounded-lg tip-card">
                <div className="card-body text-center">
                    <h3 className="mb-3" style={{ fontWeight: '600', color: '#444' }}>On the Donation Day</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2" style={{ color: '#555' }}>Carry your ID (e.g., driver's license).</li>
                        <li className="mb-2" style={{ color: '#555' }}>Drink 2 cups of water before donating.</li>
                        <li style={{ color: '#555' }}>Wear a half-sleeve shirt and avoid fast food.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0 p-4 rounded-lg tip-card">
                <div className="card-body text-center">
                    <h3 className="mb-3" style={{ fontWeight: '600', color: '#444' }}>After the Donation</h3>
                    <ul className="list-unstyled">
                        <li className="mb-2" style={{ color: '#555' }}>Reward yourself with a snack immediately.</li>
                        <li className="mb-2" style={{ color: '#555' }}>Drink more liquids over 24 hours.</li>
                        <li className="mb-2" style={{ color: '#555' }}>Remove the bandage after a few hours.</li>
                        <li style={{ color: '#555' }}>Avoid vigorous workouts and rest.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

         {/* Bootstrap Footer */}
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
          <div className="col-md-4 d-flex align-items-center">
            
            
              <div
                            style={{
                                position: "relative",
                                width: "40px", // Adjust size as needed
                                height: "40px",
                                marginRight: "10px",
                            }}
                        >
                            <div
                                 style={{
                                  position: "absolute",
                                  width: "34px",
                                  height: "34px",
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #f5f5f5, #e6e6e6)",
                                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                                  overflow: "hidden",
                              }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        opacity: "0.3",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "11px",
                                            height: "1px",
                                            top: "7px",
                                            left: "4px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "1px",
                                            height: "9px",
                                            top: "7px",
                                            left: "16px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "14px",
                                            height: "1px",
                                            top: "16px",
                                            left: "16px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "1px",
                                            height: "7px",
                                            top: "16px",
                                            left: "29px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "9px",
                                            height: "1px",
                                            top: "23px",
                                            left: "20px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "1px",
                                            height: "9px",
                                            top: "23px",
                                            left: "20px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            backgroundColor: "#0288d1",
                                            width: "16px",
                                            height: "1px",
                                            top: "27px",
                                            left: "4px",
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "14px",
                                        height: "14px",
                                        background: "linear-gradient(135deg, #e53935, #d32f2f)",
                                        borderRadius: "0 50% 50% 50%",
                                        transform: "rotate(45deg)",
                                        top: "10px",
                                        left: "10px",
                                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                                        overflow: "hidden",
                                        zIndex: "2",
                                    }}
                                >
                                    <div
                                        style={{
                                            content: "''",
                                            position: "absolute",
                                            top: "3px",
                                            left: "3px",
                                            width: "3px",
                                            height: "3px",
                                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                                            borderRadius: "50%",
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        border: "1px solid rgba(229, 57, 53, 0.5)",
                                        borderRadius: "50%",
                                        opacity: "0.5",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                ></div>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "34px",
                                        height: "34px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "11px",
                                            left: "7px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "9px",
                                            left: "22px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "20px",
                                            left: "27px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "25px",
                                            left: "13px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "16px",
                                            left: "4px",
                                        }}
                                    ></div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "#0288d1",
                                            borderRadius: "50%",
                                            opacity: "1",
                                            top: "23px",
                                            left: "7px",
                                        }}
                                    ></div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        width: "22px",
                                        height: "7px",
                                        bottom: "8px",
                                        left: "6px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            backgroundColor: "rgba(2, 136, 209, 0.8)",
                                            top: "3px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                background:
                                                    "linear-gradient(to right, rgba(2, 136, 209, 0) 0%, rgba(2, 136, 209, 0) 30%, rgba(2, 136, 209, 0.8) 50%, rgba(2, 136, 209, 0) 70%, rgba(2, 136, 209, 0) 100%)",
                                                transform: "translateX(0)",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        © 2025 RaktMitra
                    </div>


          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            {/* Social Media Links - replace with your actual links and icons */}
            <li className="ms-3">
              <a className="text-body-secondary" href="https://x.com/RaktMitra1?t=PcYsuabyGj9WZMJEmEJZHg&s=09">
              <FaTwitter size={24} /> 
                  <path d="M5.026 15.644c-.034 1.174.946 2.122 2.022 2.045C8.216 17.034 9.776 16.24 10.5 14.715c.635-1.054.895-2.174.408-2.5a2.276 2.276 0 0 1-.542-.294c-.282-.293-.533-.594-.587-.984a6.556 6.556 0 0 1 .432-.055c.064-.015.122-.03.172-.047.186-.062.285-.296.24-.496l-.034-.17c-.008-.043-.015-.085-.005-.107.023-.052.23-.209.434-.411C8.749.713 9.44 0.6 10.34 0.168c.372-.186.995-.348 1.677.094.514.339.832.648.832.856 0 .203-.023.401-.196.614l-.094.228.837.28.178.29.205.29.017-.003.023-.003.017-.007.029-.166.078-.348.078-.405 0-.068-.015-.165-.032-.216a2.479 2.479 0 0 1-.144-.393C6.304 9.775 6.46 9.56 6.65 9.326c.16-.194.35-.348.561-.504 1.17-.932 2.203-1.22 2.952-1.08.28.051.521.166.603.329.074.153.159.192.185.173a.994.994 0 0 0-.149-.063 2.09 2.09 0 0 1-.822-.132c-.108-.027-.243-.111-.266-.202-.024-.09-.006-.178.025-.259.055-.113.118-.225.196-.344.162-.249.295-.287.308-.284.019.003.031.017.031.034 0 .039-.017.079-.041.102-.025.024-.06.041-.094.034z" />
                
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="https://www.instagram.com/raktmitra_?igsh=N3p1b2RwMGN1b3Ny">
              <FaInstagram size={24} />
                  <path d="M8 0C5.829 0 5.562.01 5.297.06a3.16 3.16 0 0 0-2.122.892A1.085 1.085 0 0 0 .5 1.766V3.05a3.227 3.227 0 0 0 .872 2.276A3.472 3.472 0 0 0 2.995 6.943H2.618a.5.5 0 0 0-.5.5v1.058a.5.5 0 0 0 .5.5h.377C4.324 9.442 4.664 9.507 5 10.161V11h.499C5.694 12.54 6.461 12.995 7.39 13.047a4.4 4.4 0 0 0 .598.031c.056 0 .108-.002.16-.004.227-.009.549-.04.73-.085C8.955 12.642 9.289 12.348 9.602 12.06c.309-.298.535-.643.568-.992l.058-1.078c.037-.687.558-1.088 1.105-1.088h.056a.5.5 0 0 0 .496-.562l-
                  .003-.056a.5.5 0 0 0-.493-.438c-.108 0-.214.015-.315.042-.224.06-.479.16-.64.304a1.97 1.97 0 0 1-.76-.307c-.149-.059-.323-.099-.46-.123-.294-.058-.467-.111-.473-.182z" />
                
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="#">
              <FaFacebook size={24} />
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.514 0 0 3.609 0 8.049c0 4.447 3.582 8.051 8 8.051c4.418 0 8-3.604 8-8.051zM10.034 8.05c0 1.665-1.338 3.018-3.001 3.018-.166 0-.335-.016-.504-.044v-1.561h.33c.091 0 .163-.041.163-.094v-.817h-.33c-.048 0-.108-.007-.108-.06v-.846c0-.057.067-.085.108-.085h.33v-.79c0-.188.113-.283.272-.283h.325c.149 0 .244.101.244.308v.736h.289c.085 0 .127.038.127.166v.855h-.289c-.047 0-.061.021-.061.056v.838c0 .052.016.08.061.08h.321v1.54s-.186.02-.295.02c-.309 0-.523-.102-.523-.346z" />
                
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
    
  );
};

export default Home;
    
