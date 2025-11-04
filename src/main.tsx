import "./assets/css/main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/front/HomePage";
import AboutPage from "./pages/front/AboutPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import FrontCarListPage from "./pages/car/FrontCarListPage";
import FrontCarEditPage from "./pages/car/FrontCarEditPage";
import ContactPage from "./pages/front/ContactPage";
import CarCreatePage from "./pages/car/CarCreatePage";
import CarListPage from "./pages/car/CarListPage";
import CarEditPage from "./pages/car/CarEditPage";
import UserListPage from "./pages/user/UserListPage";
import UserCreatePage from "./pages/user/UserCreatePage";
import UserEditPage from "./pages/user/UserEditPage";
import AccountCarListPage from "./pages/car/AccountCarListPage";
import AccountCarCreatePage from "./pages/car/AccountCarCreatePage";

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

        {/* ACCOUNT */}
        <Route path="/account/cars" element={<AccountCarListPage />} />
        <Route path="/account/cars/create" element={<AccountCarCreatePage />} />
        <Route path="/account/cars/edit/:id" element={<FrontCarEditPage />} />

        {/* ADMIN */}
        <Route path="/admin/cars" element={<CarListPage />} />
        <Route path="/admin/cars/create" element={<CarCreatePage />} />
        <Route path="/admin/cars/edit/:id" element={<CarEditPage />} />
        <Route path="/admin/users" element={<UserListPage />} />
        <Route path="/admin/users/create" element={<UserCreatePage />} />
        <Route path="/admin/users/edit/:id" element={<UserEditPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
