import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import Aside from "../../pages/admin/Aside";
import SubscriptionPage from "../../Components/SubscriptionPage";
import ProvidersDetail from "../../pages/admin/ProvidersDetail";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Aside />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="providersDetail" element={<ProvidersDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
