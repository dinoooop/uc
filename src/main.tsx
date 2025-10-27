import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/front/HomePage";
import AboutPage from "./pages/front/AboutPage";
import "./assets/css/grid2.css";
import "./assets/css/form.scss";
import "./assets/css/theme.css";
import "./assets/css/custom.css";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CarListPage from "./pages/car/CarListPage";
import CarCreatePage from "./pages/car/CarCreatePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cars" element={<CarListPage />} />
        <Route path="/cars/create" element={<CarCreatePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
