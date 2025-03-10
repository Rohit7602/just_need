import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BlackCloseIcon,
  ChatIcon,
  NotificationIcon,
  SearchIcon,
} from "../../assets/icon/Icon";
import AdminImage from "../../assets/png/AdminImage.png";
import { Link, useLocation } from "react-router-dom";
import { ArrowIcon } from "../../assets/icon/Icons";
import NotificationPopUp from "../Popups/NotificationPopUp";
import ScrollNotify from "../Popups/ScrollNotify";

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [notificationPopUp, setNotificationPopUp] = useState(false);
  const [chatPopup, setchatPopup] = useState(false)
  const searchRef = useRef(null);

  const toggleSearchInput = () => {
    setIsInputVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Improved back navigation logic
  const goBack = () => {
    // Check if we're in a settings sub-page
    if (location.pathname.startsWith("/dashboard/setting/")) {
      // Always navigate to the main settings page
      navigate("/dashboard/setting");
    }
    // Check if we're in a user details page
    else if (location.pathname.includes("/dashboard/usersList/userDetails/")) {
      navigate("/dashboard/usersList");
    }
    // Check if we're in a complaints details page
    else if (
      location.pathname.includes("/dashboard/complaints/complaintsDetails/")
    ) {
      navigate("/dashboard/complaints");
    }
    // Default fallback
    else {
      navigate(-1); // Use browser history if available
    }
  };

  const handleNotificationPopUp = () => {
    setNotificationPopUp(!notificationPopUp);
  };

  function handleChatPopup() {
    setchatPopup(!chatPopup)
  }

  // Determine when to show the back arrow button
  const showArrowButton =
    /\/dashboard\/complaints\/complaintsDetails\/\d+$/.test(
      location.pathname
    ) ||
    /\/dashboard\/usersList\/userDetails\/userDetails\/\d+$/.test(
      location.pathname
    ) ||
    location.pathname === "/dashboard/setting/general" ||
    location.pathname === "/dashboard/setting/legal" ||
    location.pathname === "/dashboard/setting/keys" ||
    location.pathname === "/dashboard/setting/keys&Credentials";

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xl:gap-5">
        <div className="flex items-center">
          {showArrowButton && (
            <div className="flex items-center justify-center me-[15px]">
              <button onClick={goBack}>
                <ArrowIcon />
              </button>
            </div>
          )}
          <div>
            <p className="font-medium text-lg xl:text-[22px] capitalize">
              {location.pathname.startsWith("/dashboard/setting/") ? (
                <p className="text-[#00000099] font-medium text-lg xl:text-[22px] capitalize">
                  setting /
                  <span className="text-black ms-1">
                    {location.pathname
                      .replace("/dashboard/setting/", "")
                      .replace("&", " & ")}
                  </span>
                </p>
              ) : location.pathname.includes(
                "/dashboard/usersList/userDetails/"
              ) ? (
                "User's Details"
              ) : (
                location.pathname
                  .replace("/", "")
                  .replace("dashboard/", "")
                  .replace(
                    /complaints\/complaintsDetails\/\d+/,
                    "Complaints Details"
                  )
                  .replace("&", " & ")
                  .replace("/", " / ")
                  .replace("usersList", "Users List")
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:gap-4">
          <div
            ref={searchRef}
            className={`flex items-center h-[40px] rounded-[50px] bg-[#F1F1F1] ${isInputVisible
              ? "w-[185px] lg:max-w-[330px] xl:w-[330px]"
              : "max-w-[40px]"
              } transition-all duration-300`}
          >
            <div
              onClick={toggleSearchInput}
              className="cursor-pointer w-[40px] flex items-center justify-center"
            >
              <SearchIcon />
            </div>
            {isInputVisible && (
              <input
                type="text"
                placeholder="Search task"
                className="w-full outline-none bg-[#F1F1F1] text-base placeholder:text-base placeholder:font-normal font-normal placeholder:text-[#00000080] rounded-[10px]"
              />
            )}
            {isInputVisible && (
              <div onClick={toggleSearchInput} className="px-3">
                <BlackCloseIcon />
              </div>
            )}
          </div>
          <button onClick={handleChatPopup}

            state={"Plan, prioritize, and accomplish your tasks with ease."}
          >
            <ChatIcon />
          </button>


          <button onClick={handleNotificationPopUp}>
            <NotificationIcon />
          </button>
          <div className="flex items-center">
            <img className="w-[40px]" src={AdminImage} alt="image of admin" />
            <div className="ms-2.5">
              <p className="font-normal text-sm xl:text-base text-[#171717] leading-[20px]">
                Super Admin
              </p>
              <p className="font-normal text-sm xl:text-base text-[#17171799] leading-[20px]">
                superadmin@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {notificationPopUp && (
        <div>
          <NotificationPopUp onCancel={handleNotificationPopUp} />
        </div>
      )}

      {chatPopup && (
        <ScrollNotify onCancel={handleChatPopup} />
      )}





    </div>
  );
}

export default TopBar;
