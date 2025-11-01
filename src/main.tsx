import "./assets/css/main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/front/HomePage";
import AboutPage from "./pages/front/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import FrontCarListPage from "./pages/car/FrontCarListPage";
import FrontCarCreatePage from "./pages/car/FrontCarCreatePage";
import FrontCarEditPage from "./pages/car/FrontCarEditPage";
import ContactPage from "./pages/front/ContactPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cars" element={<FrontCarListPage />} />
        <Route path="/cars/create" element={<FrontCarCreatePage />} />
        <Route path="/cars/edit/:id" element={<FrontCarEditPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
