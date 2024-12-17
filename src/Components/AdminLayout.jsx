import React from "react";
import { Outlet } from 'react-router-dom';
import SideBar from "./Common/SideBar";
import TopBar from "./Common/TopBar";

function AdminLayout() {
  return (
    <div className="flex bg-white px-4 pt-4 gap-4">
      <div className="max-w-[200px] xl:max-w-[270px] h-screen  ">
        <SideBar />
      </div>
      <div className="w-[calc(100vw-200px)] xl:w-[calc(100vw-270px)] pb-5  h-screen overflow-scroll scrollRemove ">
        <div className="sticky top-0 z-50 bg-[#F4F4F4] px-5 pt-5 pb-[15px] rounded-[10px]">
          <TopBar />
        </div>
        <div className="px-4 pt-4 min-h-[calc(100vh-85px)] flex flex-col bg-[#F7F7F7] mt-4 rounded-[10px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
