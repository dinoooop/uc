import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../templates/Header";
import MiniBanner from "../templates/MiniBanner";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage: React.FC = () => {
  const { login, loading, error, reset } = useAuthStore();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
    if (error) reset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formValues);
      navigate("/"); // Redirect to home after login
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">


        <div className="logo">🚗 UC-Collection</div>
        <h1 className="title text-center">Sign In</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="auth-button signin"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer text-center">
          <p>
            New Here? <Link to="/register">Sign Up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link> | <Link to="/">Go Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
