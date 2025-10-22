import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const RegisterPage: React.FC = () => {
  const { register, loading, error, reset } = useAuthStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    full_name: "john",
    email: "john@example.com",
    password: "welcome",
    confirm_password: "welcome",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    if (error || formError) reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirm_password) {
      setFormError("Passwords do not match");
      return;
    }
    try {
      await register({
        full_name: formValues.full_name,
        email: formValues.email,
        password: formValues.password,
        confirm_password: formValues.confirm_password,
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="logo">🚗 UC-Collection</div>
        <h1 className="title text-center">Sign Up</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            value={formValues.full_name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          {(formError || error) && (
            <p className="error-text">{formError || error}</p>
          )}

          <button
            type="submit"
            className="auth-button signup"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer text-center">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <p>
            <Link to="/">Go Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
