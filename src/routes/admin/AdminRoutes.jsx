
import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import Aside from "../../pages/admin/Aside";
import ProvidersDetail from "../../pages/admin/ProvidersDetail";
import CustomerListPage from "../../Components/CustomerListPage";
import { customersData } from "../../Components/Common/Helper";
import Services from "../../Components/Common/Services";
import Actions from "../../Components/Popups/Actions";
import Subscription from "../../Components/Subscription";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/Actions" element={<Actions />} />
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Aside />} />
        <Route
          path="subscription"
          element={<Subscription mapData={customersData} />}
        />
        <Route path="services" element={<Services />} />
        <Route path="providersDetail" element={<ProvidersDetail />} />
        <Route
          path="customerList"
          element={<CustomerListPage mapData={customersData} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;

