import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import Aside from '../../pages/Aside';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Aside/>}/>
    </Routes>
  )
}

export default AdminRoutes