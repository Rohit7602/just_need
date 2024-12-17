import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../componentes/admin/AdminLayout';
import MainPage from '../../pages/admin/MainPage';
import Aside from '../../pages/Aside';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/dashboard' element={<AdminLayout/>}>
        <Route index element={<Aside/>}/>
        <Route path='' element={<MainPage/>}/>
        </Route>  
      
    </Routes>
  )
}

export default AdminRoutes