import React, { useState } from "react";
import { ChatIcon, NotificationIcon, SearchIconTopBar } from "../../assets/icon/Icon";
import AdminImage from "../../assets/png/AdminImage.png";

function TopBar() {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleSearchInput = () => {
    setIsInputVisible((prev) => !prev);
  };
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xl:gap-5">
        <div>
          {" "}
          <p className="font-medium text-lg xl:text-[22px]">Dashboard</p>
          <p className="font-normal text-xs xl:text-[14px] opacity-[70%]">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>

        <div className="flex items-center gap-2 xl:gap-4">
          <div
            className={`flex me-2 items-center pe-3 rounded-[10px] ${
              isInputVisible
                ? "max-w-[330px] bg-[#F1F1F1]"
                : "max-w-[40px]"
            } transition-all duration-300`}
          >
            <div
              onClick={toggleSearchInput}
              className={`cursor-pointer`}
            >
              <SearchIconTopBar />
            </div>
            {isInputVisible && (
              <input
                type="text"
                placeholder="Search task"
                className={`w-full outline-none py-3 bg-[#F1F1F1] text-base placeholder:text-base placeholder:font-normal font-normal placeholder:text-[#00000080] "rounded-[10px]" `}
              />
            )}
          </div>
          <button>
            <ChatIcon />
          </button>
          <button>
            <NotificationIcon />
          </button>
          <div className="flex items-center">
            <img
              className="max-w-[45px] xl:max-w-[60px]"
              src={AdminImage}
              alt="image of admin"
            />
            <div className="ms-2.5">
              <p className="font-normal text-sm xl:text-base text-[#171717] leading-[20px]">
                Super Admin
              </p>
              <p className="font-normal text-sm xl:text-base text-[#17171799] leading-[20px] xl:mt-1">
                superadmin@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
