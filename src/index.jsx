import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./AppContext.jsx"; 
import { AuthProvider } from "./AuthContext.jsx"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);