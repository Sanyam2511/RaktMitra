import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token retrieved from useEffect:", token);
        if (token) {
            setIsAuthenticated(true);
            fetchUserProfile(token);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = async (formData) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );
            localStorage.setItem("token", response.data.token);
            console.log("Token stored:", localStorage.getItem("token"));
            setIsAuthenticated(true);
            fetchUserProfile(response.data.token);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message || "Login failed!");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
    };

    const fetchUserProfile = async (token) => {
        console.log("fetchUserProfile called with token:", token);
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const response = await axios.get(
                "http://localhost:5000/api/users/profile",
                { headers }
            );
            console.log("Profile API Response:", response);
    
            // Create a copy of response.data
            const userData = { ...response.data };
    
            // Create a complete URL for the profile picture
            if (userData.avatar) {
                userData.avatar = `http://localhost:5000${userData.avatar}`;
            }
    
            console.log("Modified profile picture URL:", userData.avatar);
    
            if (response.status === 200) {
                setUser(userData); // Use the copied object
                console.log("Profile data set:", userData);
            } else {
                console.error("Profile API returned non-200 status:", response.status);
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setUser(null);
        }
    };
    const updateUser = async (formDataWithImage) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("User not authenticated.");
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            };
    
            console.log("Updating user profile with form data:",
                Array.from(formDataWithImage.entries()).map(entry => `${entry[0]}: ${entry[1]}`));
    
            const response = await axios.put(
                "http://localhost:5000/api/users/profile",
                formDataWithImage,
                { headers }
            );
    
            if (response.status === 200) {
                console.log("Profile update response:", response.data);
                // Important: Set user to null first to force complete re-render
                setUser(null);
    
                // Small timeout to ensure state updates properly
                setTimeout(async () => { // Make the callback async
                    try {
                        await fetchUserProfile(token); // Await the fetchUserProfile call
                        toast.success("Profile updated successfully!");
                    } catch (fetchError) {
                        console.error("Error refetching user profile:", fetchError);
                        toast.error("Failed to update profile. Please try again.");
                    }
                }, 100);
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;