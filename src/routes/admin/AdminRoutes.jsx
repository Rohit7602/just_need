import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import Aside from "../../pages/admin/Aside";
import ProvidersDetail from "../../pages/admin/ProvidersDetail";
import Customers from "../../pages/admin/Customers";
import ServiceRequest from "../../pages/admin/ServiceRequest"
import Providers from "../../pages/admin/Providers";
import Setting from "../../pages/admin/Setting";
import Logout from "../../pages/admin/Logout";
import CustomerListPage from "../../Components/CustomerListPage";
import { customersDataList } from "../../Components/Common/Helper";
import Services from "../../Components/Common/Services";
import Actions from "../../Components/Popups/Actions";
import Subscription from "../../Components/Subscription";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/Actions" element={<Actions />} />
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Aside />} />
        <Route path="customers" element={<Customers/>}/>
        <Route path="providers" element={<Providers/>}/>
        <Route path="providersDetail" element={<ProvidersDetail />} />
        <Route path="serviceRequest" element={<ServiceRequest/>}/>
        <Route path="services" element={<Services />}/>
        <Route path="setting" element={<Setting/>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route
          path="subscription"
          element={<Subscription mapData={customersDataList} />}
        />
        <Route
          path="customerList"
          element={<CustomerListPage mapData={customersDataList} />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;

