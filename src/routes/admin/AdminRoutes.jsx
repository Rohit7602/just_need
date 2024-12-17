import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../Components/AdminLayout';
import MainPage from '../../pages/admin/MainPage';
import Aside from '../../pages/Aside';
import SubscriptionPage from '../../Components/SubscriptionPage';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/dashboard' element={<AdminLayout/>}>
        <Route index element={<Aside/>}/>
        <Route path='subscription' element={<SubscriptionPage/>}/>
        </Route>  
      
    </Routes>
  );
}

export default AdminRoutes;
