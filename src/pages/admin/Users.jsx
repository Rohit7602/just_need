import React, { useState } from 'react';
import CustomerData from '../../Components/CustomerData';
import { customersDataList } from '../../Components/Common/Helper';
import { CiSearch, CiFilter } from 'react-icons/ci';
import UsersFilterPopUp from '../../Components/Popups/UsersFilterPopUp';
import { Outlet, useLocation } from 'react-router-dom';
import {
  DropdownIconChat,
  SpikendCirclChat,
  SpikStartCirclChat,
  ArrowIconRigth,
  ArrowIconLeft,
} from '../../assets/icon/Icons';

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
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleItemsDropdown = () => {
    setShowItemsDropdown(!showItemsDropdown);
  };

  const handleItemsSelect = (value) => {
    setItemsPerPage(value);
    setShowItemsDropdown(false);
    console.log(`Items per page set to: ${value}`);
  };

  return (
    <div className="p-4 bg-white rounded-[10px]">
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
        </>
      )}

      <Outlet />
      <div className="p-4 bg-white rounded-[10px]">
        {/* Existing code... */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <h2 className="me-3">Items per page:</h2>
            <div
              className="relative border-[1px] py-1 w-[70px] rounded-[10px] flex justify-center items-center cursor-pointer"
              onClick={toggleItemsDropdown}>
              <h2 className="pe-3 text-sm font-medium">{itemsPerPage}</h2>
              <DropdownIconChat />
              {showItemsDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg w-full z-10">
                  {[5, 10, 15, 20].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleItemsSelect(item)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100">
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="pe-9 text-sm font-medium">1-{itemsPerPage} of 0</h2>
            <div className="pe-7 flex ">
              <SpikStartCirclChat />
              <ArrowIconLeft />
            </div>
            <ArrowIconRigth />
            <SpikendCirclChat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
