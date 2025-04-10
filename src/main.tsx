import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import { LeadsProvider } from "./context/LeadsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LeadsProvider>
          <App />
        </LeadsProvider>
      </AuthProvider>{" "}
    </BrowserRouter>
  </React.StrictMode>
);
