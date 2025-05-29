import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

function EditProfile() {
    const { user, updateUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bloodGroup: user?.bloodGroup || '',
        location: user?.location || '',
        phoneNumber: user?.phoneNumber || '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(user?.avatar|| null);

    const bloodGroupOptions = [
        'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfilePicture(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setProfilePicture(null);
            setPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithImage = new FormData();
        formDataWithImage.append('name', formData.name);
        formDataWithImage.append('email', formData.email);
        formDataWithImage.append('bloodGroup', formData.bloodGroup);
        formDataWithImage.append('location', formData.location);
        formDataWithImage.append('phoneNumber', formData.phoneNumber);
        
        if (profilePicture) {
            formDataWithImage.append('profilePicture', profilePicture);
            console.log("Adding profile picture to form data", profilePicture.name);
        }
        
        console.log("Submitting profile update");
        await updateUser(formDataWithImage);
        console.log("Profile update submitted");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow" style={{ borderRadius: '10px', overflow: 'hidden', border: 'none' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4" style={{ color: '#333', fontWeight: 'bold' }}>Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-center">
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Profile Preview"
                                    className="rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #f8d7da' }}
                                />
                            )}
                            <div className="custom-file-input">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    onChange={handleFileChange} 
                                    style={{ 
                                        border: '1px solid #ced4da',
                                        borderRadius: '5px',
                                        padding: '10px'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                style={{ 
                                    border: '1px solid #ced4da',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                style={{ 
                                    border: '1px solid #ced4da',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>Blood Group</label>
                            <div className="d-flex">
                                <select 
                                    className="form-select" 
                                    name="bloodGroup" 
                                    value={formData.bloodGroup} 
                                    onChange={handleChange} 
                                    style={{ 
                                        border: '1px solid #ced4da',
                                        borderRadius: '5px',
                                        padding: '10px',
                                        flexGrow: 1
                                    }}
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroupOptions.map((group) => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                                {formData.bloodGroup && (
                                    <div 
                                        className="ms-2 d-flex align-items-center justify-content-center" 
                                        style={{ 
                                            backgroundColor: '#b92230', 
                                            color: 'white', 
                                            borderRadius: '5px', 
                                            padding: '10px 15px',
                                            fontWeight: 'bold',
                                            minWidth: '50px'
                                        }}
                                    >
                                        {formData.bloodGroup}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>Location</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                style={{ 
                                    border: '1px solid #ced4da',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>Phone Number</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="phoneNumber" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                                style={{ 
                                    border: '1px solid #ced4da',
                                    borderRadius: '5px',
                                    padding: '10px'
                                }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn w-100" 
                            style={{ 
                                backgroundColor: '#b92230', 
                                color: 'white', 
                                padding: '12px', 
                                borderRadius: '5px',
                                fontWeight: 'bold',
                                border: 'none',
                                marginTop: '10px'
                            }}
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default EditProfile;