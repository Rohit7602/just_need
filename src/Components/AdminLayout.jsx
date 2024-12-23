import React from "react";
import { Outlet } from 'react-router-dom';
import SideBar from "./Common/SideBar";
import TopBar from "./Common/TopBar";

function AdminLayout() {
  return (
    <div className="flex bg-[#F1F1F1] p-4 gap-4 h-screen overflow-hidden">
      <div className="max-w-[270px] h-screen  ">
        <SideBar />
      </div>
      <div className="w-[calc(100vw-200px)] xl:w-[calc(100vw-270px)] pb-5  h-screen overflow-scroll scrollRemove ">
        <div className="sticky top-0 z-30 bg-white px-4 pt-5 pb-[15px] rounded-[10px]">
          <TopBar />
        </div>
        <div className=" pt-4 min-h-[calc(100vh-85px)] flex flex-col bg-white mt-4 rounded-[10px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
