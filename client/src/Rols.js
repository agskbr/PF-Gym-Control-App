import React from "react";
import AdminPage from "./views/AdminPage/AdminPage.jsx";
import EditPage from "./views/AdminPage/components/EditPage/EditPage";
import HomePage from "./views/homePage/homePage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LoginPage from "./views/LoginPage/LoginPage";
import Buy from "./components/Buy/Buy";
import SocioPage from "./views/SocioPage/SocioPage";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";

export function AunthenticatedRoutes({ isAdmin }) {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/clases/:id" element={<Buy />} />

      <Route
        path="/admindashboard"
        element={isAdmin ? <AdminPage /> : <Navigate to={"/login"} replace />}
      />
      <Route
        path="/login"
        element={
          !isAdmin ? (
            <Navigate to="/sociodashboard" replace />
          ) : isAdmin ? (
            <Navigate to="/admindashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAdmin ? (
            <Navigate to="/sociodashboard" />
          ) : isAdmin ? (
            <Navigate to="/admindashboard" replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      <Route
        path="/admindashboard/:item/edit/:id"
        element={isAdmin ? <EditPage /> : <Navigate to={"/login"} replace />}
      />
      <Route
        path="/sociodashboard"
        element={
          isAdmin ? <Navigate to="/admindashboard" replace /> : <SocioPage />
        }
      />
    </Routes>
  );
}

export function UnAuthenticatedRoutes() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/clases/:id" element={<Buy />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
