import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";
import { FaUserCircle } from 'react-icons/fa'; 

const NavbarComponent = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useContext(AuthContext); 
    const [timestampParam, setTimestampParam] = useState(Date.now());

    useEffect(() => {
        console.log("User in navbar:", user);
        console.log("Profile picture URL:", user?.avatar);
        setTimestampParam(Date.now());
    }, [user?.avatar]);
    
    const handleProfileClick = () => {
        navigate("/profile");
    };

    const ProfileImage = () => {
        const [imageError, setImageError] = useState(false);
        const cacheBuster = `?cb=${Date.now()}`;
        
        if (user?.avatar && !imageError) {
            return (
                <img
                    src={`${user.avatar}${cacheBuster}`}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: '30px', height: '30px', marginRight: '0px', cursor: "pointer" }}
                    onClick={handleProfileClick}
                    onError={() => setImageError(true)}
                />
            );
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* BloodConnect Logo (HTML embedded) */}
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
                        RaktMitra
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register">
                            Register
                        </Nav.Link>
                        <Nav.Link as={Link} to="/bloodbank">
                            Blood Bank
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blood-request">
                            Blood Request
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Nav.Item className="d-flex align-items-center">
                                    <Button
                                        variant="outline-danger"
                                        className="me-2 red-outline-button"
                                        onClick={logout}
                                    >
                                        Logout
                                    </Button>
                                </Nav.Item>
                                <Nav.Item className="d-flex align-items-center">
    {user && user.avatar ? (
        <img
            src={user.avatar}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '30px', height: '30px', marginRight: '0px', cursor: "pointer" }}
            onClick={handleProfileClick}
        />
    ) : (
        <FaUserCircle
            size={30}
            style={{ cursor: "pointer" }}
            onClick={handleProfileClick}
        />
    )}
</Nav.Item>
                            </>
                        ) : (
                            <Nav.Item className="d-flex align-items-center">
                                <Link to="/login">
                                    <Button
                                        variant="outline-primary"
                                        className="me-2 red-outline-button"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary" className="red-primary-button">
                                        Sign-up
                                    </Button>
                                </Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;