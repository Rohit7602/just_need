import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';

function AdminRoutes() {
  return (
    <Routes>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
    </Routes>
  )
}

export default AdminRoutes