import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BlackCloseIcon, ChatIcon, NotificationIcon, SearchIcon } from '../../assets/icon/Icon';
import AdminImage from '../../assets/png/AdminImage.png';
import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon, CloseIcon } from '../../assets/icon/Icons';

function TopBar() {
  const navigate = useNavigate();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const location = useLocation();
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  const showArrowButton =
    /\/dashboard\/complaints\/complaintsDetails\/\d+$/.test(location.pathname) ||
    /\/dashboard\/usersList\/userDetails\/\d+$/.test(location.pathname) ||
    location.pathname === '/dashboard/setting';

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 xl:gap-5">
        <div className="flex items-center">
          {showArrowButton && (
            <div className="flex items-center justify-center me-[15px]">
              <button onClick={goBack}>
                {' '}
                <ArrowIcon />
              </button>
            </div>
          )}
          <div>
            <p className={'font-medium text-lg xl:text-[22px] capitalize'}>
              {location.pathname.startsWith('/dashboard/setting/') ? (
                <p className="text-[#00000099] font-medium text-lg xl:text-[22px] capitalize">
                  setting /
                  <span className="text-black ms-1">
                    {location.pathname.replace('/dashboard/setting/', '').replace('&', ' & ')}
                  </span>
                </p>
              ) : (
                <p>
                  {location.pathname
                    .replace('/', '')
                    .replace('dashboard/', '')
                    .replace(/usersList\/userDetails\/\d+/, "User's Details")
                    .replace(/complaints\/complaintsDetails\/\d+/, 'Complaints Details')
                    .replace('&', ' & ')
                    .replace('/', ' / ')
                    .replace('usersList', 'Users List')}
                </p>
              )}
            </p>
            <p className={'font-normal text-xs xl:text-[14px] opacity-[70%]'}>{location.state}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 xl:gap-4">
          <div
            ref={searchRef}
            className={`flex items-center h-[40px] rounded-[50px] bg-[#F1F1F1] ${
              isInputVisible ? 'w-[185px] lg:max-w-[330px] xl:w-[330px]' : 'max-w-[40px]'
            } transition-all duration-300`}>
            <div
              onClick={toggleSearchInput}
              className="cursor-pointer w-[40px] flex items-center justify-center">
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
          <Link
            to={'/dashboard/chat'}
            state={'Plan, prioritize, and accomplish your tasks with ease.'}>
            <ChatIcon />
          </Link>
          <button>
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
    </div>
  );
}

export default TopBar;
