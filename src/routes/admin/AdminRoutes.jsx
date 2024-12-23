import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import Aside from "../../pages/admin/Aside";
import SubscriptionPage from "../../Components/SubscriptionPage";
import ProvidersDetail from "../../pages/admin/ProvidersDetail";
import Customers from "../../pages/admin/Customers";
import Services from "../../pages/admin/Services";
import ServiceRequest from "../../pages/admin/ServiceRequest"
import Providers from "../../pages/admin/Providers";
import Setting from "../../pages/admin/Setting";
import Logout from "../../pages/admin/Logout";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Aside />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="customers" element={<Customers/>}/>
        <Route path="providers" element={<Providers/>}/>
        <Route path="providersDetail" element={<ProvidersDetail />} />
        <Route path="serviceRequest" element={<ServiceRequest/>}/>
        <Route path="services" element={<Services/>}/>
        <Route path="setting" element={<Setting/>}/>
        <Route path="logout" element={<Logout/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
