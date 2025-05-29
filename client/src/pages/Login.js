import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../components/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("✅ Login Successful!");
        login(formData);
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            background: "linear-gradient(135deg, #f8bbd0, #e57373, #d32f2f)" // Dynamic gradient
        }}>
            <Card style={{ width: "25rem", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <h2 className="text-center mb-4" style={{ color: "#d32f2f" }}>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100" style={{ backgroundColor: "#d32f2f", borderColor: "#d32f2f" }}>
                        Login
                    </Button>
                </Form>
            </Card>

            <ToastContainer position="top-right" autoClose={4000} /> 
        </div>
    );
};

export default Login;