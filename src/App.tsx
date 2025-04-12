import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateLeadPage from "./pages/CreateLeadPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/signup" element={<CreateLeadPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
