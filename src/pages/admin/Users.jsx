import React, { useState } from 'react';
import CustomerData from '../../Components/CustomerData';
import { customersDataList } from '../../Components/Common/Helper';
import { CiSearch, CiFilter } from 'react-icons/ci';
import UsersFilterPopUp from '../../Components/Popups/UsersFilterPopUp';
import { Outlet, useLocation } from 'react-router-dom';

function Users() {
  const [showfilterPopup, setshowfilterPopup] = useState(false);
  const location = useLocation();
  const isUserDetailsPage = location.pathname.includes('userDetails');

  function handleFilter() {
    setshowfilterPopup(!showfilterPopup);
  }

  function handlefilterpopupclose() {
    setshowfilterPopup(false);
  }

  return (
    <div className="p-4">
      {!isUserDetailsPage && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-base xl:text-[20px] font-medium text-[#000000] opacity-70">
              All Users
            </h2>
            <div className="flex">
              <div className="flex rounded-[10px] items-center h-[42px] p-2 bg-[#F1F1F1] me-2 xl:me-[20px]">
                <CiSearch className="ms-2" />
                <input
                  type="text"
                  placeholder="Search task"
                  className="ms-2.5 focus:outline-none focus:ring-gray-400 bg-[#F1F1F1]"
                />
              </div>
              <button
                className="bg-[#0832DE] text-white px-[15px] py-2 rounded-[10px] flex items-center"
                onClick={handleFilter}>
                <span>
                  <CiFilter className="w-[24px] h-[24px] me-[12px]" />
                </span>
                Filter
              </button>
            </div>
          </div>
          <CustomerData mapData={customersDataList} />
          {showfilterPopup && (
            <UsersFilterPopUp
              handleFilter={handleFilter}
              handlefilterpopupclose={handlefilterpopupclose}
            />
          )}
          <div>
            <h2>Item per page</h2>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Users;
