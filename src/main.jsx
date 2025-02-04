import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/authContext.jsx";
import SubscriptionProvider from "./store/SubscriptionContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SubscriptionProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SubscriptionProvider>
  </StrictMode>
);
