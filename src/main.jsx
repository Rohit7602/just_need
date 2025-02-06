import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/AuthContext.jsx";
import SubscriptionProvider from "./store/SubscriptionContext.jsx";
import ServiceContext from "./store/serviceContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ServiceContext>
      <SubscriptionProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SubscriptionProvider>
    </ServiceContext>
  </StrictMode>
);
