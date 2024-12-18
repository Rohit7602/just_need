import React from "react";
import {
  MessageIcon,
  NotificationIcon,
  SearchIcon,
} from "../../assets/icon/Icon";
import AdminImage from "../../assets/png/AdminImage.png"

function TopBar() {
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center py-3 px-4 bg-white rounded-[20px] max-w-[330px]">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search task"
            className="w-full outline-none ms-2.5 text-base placeholder:text-base placeholder:font-normal font-normal placeholder:text-[#00000080]"
          />
        </div>
        <div className="flex items-center gap-4">
          <MessageIcon />
          <NotificationIcon />
          <div className="flex items-center">
             <img className="max-w-[60px]" src={AdminImage} alt="image of admin"/>
             <div className="ms-2.5">
              <p className="font-normal text-base text-[#171717] leading-[20px]">Super Admin</p>
              <p className="font-normal text-base text-[#17171799] leading-[20px] mt-1">superadmin@gmail.com</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
