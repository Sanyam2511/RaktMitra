import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { Link } from 'react-router-dom';

function UserProfile() {
    const { user, isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center p-5 shadow-sm rounded-lg">
                    <i className="fas fa-lock fa-3x mb-3"></i>
                    <h3>Authentication Required</h3>
                    <p className="lead">Please log in to view your profile.</p>
                    <Link to="/login" className="btn btn-danger mt-3">Go to Login</Link>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center p-5 shadow-sm rounded-lg">
                    <div className="spinner-border text-danger mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3>Almost there!</h3>
                    <p className="lead">Loading your profile information...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            background: "linear-gradient(135deg, #f5f5f5 0%, #ffebee 100%)",
            minHeight: "100vh",
            paddingTop: "2rem",
            paddingBottom: "2rem"
        }}>
            <div className="container">
                <div className="card shadow border-0 rounded-lg overflow-hidden">
                    <div className="row g-0">
                        {/* Profile Header/Banner */}
                        <div className="col-12 text-white p-4 position-relative" 
                             style={{
                                height: "140px", 
                                background: "linear-gradient(135deg, #e53935 0%, #b71c1c 100%)"
                             }}>
                            <div className="position-absolute bottom-0 start-50 translate-middle">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt="Profile"
                                        className="rounded-circle border border-4 border-white"
                                        style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className="bg-light rounded-circle border border-4 border-white d-flex align-items-center justify-content-center"
                                         style={{ width: '130px', height: '130px' }}>
                                        <i className="fas fa-user fa-4x text-danger opacity-50"></i>
                                    </div>
                                )}
                            </div>
                            
                            <div className="position-absolute top-0 end-0 p-3">
                                <i className="fas fa-tint fa-2x text-white opacity-50"></i>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="col-12 pt-5 mt-4">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold mb-1">{user.name || "Your Name"}</h2>
                                </div>
                                
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <div className="card mb-4 border-0 shadow-sm" style={{backgroundColor: "#fff9f9"}}>
                                            <div className="card-header border-0" style={{backgroundColor: "#ffebee"}}>
                                                <h5 className="mb-0 text-danger">
                                                    <i className="fas fa-heartbeat me-2"></i> Donor Information
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row mb-3 py-2 border-bottom border-danger border-opacity-25">
                                                    <div className="col-sm-4">
                                                        <i className="fas fa-envelope text-danger me-2"></i>
                                                        <strong>Email</strong>
                                                    </div>
                                                    <div className="col-sm-8 text-sm-end">
                                                        {user.email}
                                                    </div>
                                                </div>
                                                
                                                {user.bloodGroup && (
                                                    <div className="row mb-3 py-2 border-bottom border-danger border-opacity-25">
                                                        <div className="col-sm-4">
                                                            <i className="fas fa-tint text-danger me-2"></i>
                                                            <strong>Blood Group</strong>
                                                        </div>
                                                        <div className="col-sm-8 text-sm-end">
                                                            <span className="badge" style={{
                                                                backgroundColor: "#b71c1c", 
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "1rem"
                                                            }}>
                                                                {user.bloodGroup}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {user.phoneNumber && (
                                                    <div className="row mb-3 py-2 border-bottom border-danger border-opacity-25">
                                                        <div className="col-sm-4">
                                                            <i className="fas fa-phone text-danger me-2"></i>
                                                            <strong>Phone</strong>
                                                        </div>
                                                        <div className="col-sm-8 text-sm-end">
                                                        <span className="badge" style={{
                                                                backgroundColor: "#b71c1c", 
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "1rem"
                                                            }}>
                                                                {user.phoneNumber}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {user.location && (
                                                    <div className="row py-2">
                                                        <div className="col-sm-4">
                                                            <i className="fas fa-phone text-danger me-2"></i>
                                                            <strong>Location</strong>
                                                        </div>
                                                        <div className="col-sm-8 text-sm-end">
                                                        <span className="badge" style={{
                                                                backgroundColor: "#b71c1c", 
                                                                padding: "0.5rem 1rem",
                                                                fontSize: "1rem"
                                                            }}>
                                                                {user.location}
                                                            </span>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="card mb-4 border-0 shadow-sm" style={{backgroundColor: "#fff9f9"}}>
                                            <div className="card-header border-0" style={{backgroundColor: "#ffebee"}}>
                                                <h5 className="mb-0 text-danger">
                                                    <i className="fas fa-info-circle me-2"></i> Donation Status
                                                </h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row py-2 text-center">
                                                    <div className="col-md-4 mb-3 mb-md-0">
                                                        <div className="p-3 rounded" style={{backgroundColor: "#ffebee"}}>
                                                            <div className="h2 text-danger">0</div>
                                                            <div className="small text-muted">Donations</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mb-3 mb-md-0">
                                                        <div className="p-3 rounded" style={{backgroundColor: "#ffebee"}}>
                                                            <div className="h2 text-danger">
                                                                <i className="fas fa-check-circle"></i>
                                                            </div>
                                                            <div className="small text-muted">Eligible to Donate</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="p-3 rounded" style={{backgroundColor: "#ffebee"}}>
                                                            <div className="h2 text-danger">0</div>
                                                            <div className="small text-muted">Lives Impacted</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="text-center mb-5">
                                            <Link to="/edit-profile" className="btn px-4 py-2 me-2" style={{
                                                backgroundColor: "#b71c1c",
                                                color: "white"
                                            }}>
                                                <i className="fas fa-edit me-2"></i>Edit Profile
                                            </Link>
                                            <Link to="/bloodbank" className="btn btn-outline-danger px-4 py-2">
                                                <i className="fas fa-heart me-2"></i>Find blood banks
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;