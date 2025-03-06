import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/AuthContext.jsx";
import SubscriptionProvider from "./store/SubscriptionContext.jsx";
import ServiceContext from "./store/ServiceContext.jsx";

import PolicyProvider from "./store/PrivacyPolicy.jsx";

import BannerProvider from "./store/BannerContext.jsx";
import { CustomerContext } from "./store/CustomerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ServiceContext>
      <SubscriptionProvider>
        <AuthProvider>
          <PolicyProvider>
            <BannerProvider>
              <BrowserRouter>
                <CustomerContext>
                  <App />
                </CustomerContext>
              </BrowserRouter>
            </BannerProvider>
          </PolicyProvider>
        </AuthProvider>
      </SubscriptionProvider>
    </ServiceContext>
    <ToastContainer />
  </StrictMode>
);
