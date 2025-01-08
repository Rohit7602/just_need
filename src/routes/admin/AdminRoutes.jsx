import { Route, Routes, Navigate } from "react-router-dom";
import AdminLayout from "../../Components/AdminLayout";
import Aside from "../../pages/admin/Aside";
import ProvidersDetail from "../../pages/admin/ProvidersDetail";
import ServiceRequest from "../../pages/admin/ServiceRequest";
import Setting from "../../pages/admin/Setting";
import Logout from "../../pages/admin/Logout";
import { customersDataList } from "../../Components/Common/Helper";
import Services from "../../Components/Common/Services";
import Actions from "../../Components/Popups/Actions";
import Subscription from "../../Components/Subscription";
import Users from "../../pages/admin/Users";
import UserDetails from "../../pages/admin/UserDetails";
import { Complaints } from "../../pages/admin/Complaints";
import Provider_Detail from "../../pages/admin/Provider_Detail";
import SettinGeneral from "../../pages/admin/SettinGeneral";
import SettingLegal from "../../pages/admin/SettingLegal";
import SettingKeysCredentials from "../../pages/admin/SettingKeysCredentials";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/Actions" element={<Actions />} />
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Aside />} />
        <Route path="users" element={<Users />}>
          <Route path="userDetails/:id" element={<UserDetails />} />
        </Route>
        <Route path="serviceRequest" element={<ServiceRequest />} />
        <Route path="services" element={<Services />} />
        <Route path="complaints" element={<Complaints />}>
          <Route path="providerDetail/:id" element={<Provider_Detail />} />
        </Route>
        <Route path="setting" element={<Setting />} />
        <Route path="setting/general" element={<SettinGeneral />} />
        <Route path="setting/legal" element={<SettingLegal />} />
        <Route
          path="setting/keysCredentials"
          element={<SettingKeysCredentials />}
        />
        <Route path="Provider_Detail" element={<Provider_Detail />} />
        <Route path="logout" element={<Logout />} />
        <Route path="subscription" element={<Subscription />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AdminRoutes;
