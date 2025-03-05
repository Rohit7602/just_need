import React, { useState, useRef, useEffect } from "react";
import avatar from "../assets/Images/Png/dummyimage.jpg";
import { FaAngleDown } from "react-icons/fa";
import ActionUserPupUp from "./Popups/ActionUserPupUp";
import { Link, useLocation } from "react-router-dom";
import UsersFilterPopUp from "../Components/Popups/UsersFilterPopUp";
import { CiSearch, CiFilter } from "react-icons/ci";
import {
  DropdownIconChat,
  SpikendCirclChat,
  SpikStartCirclChat,
  ArrowIconRigth,
  ArrowIconLeft,
} from ".././assets/icon/Icons";
import { supabase } from "../store/supabaseCreateClient";

const CustomerData = ({ mapData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const formatDate = (milliseconds) => {
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${month} ${year} | ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredData = users.filter((customer) => {
    return (
      (customer.firstName + " " + customer.lastName)
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.useremail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobile_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Main checkbox handler
  const handleMainCheckboxChange = () => {
    const newCheckedState = !mainCheckbox;
    setMainCheckbox(newCheckedState);

    if (newCheckedState) {
      // Check all sub-checkboxes in current page
      const currentPageIds = paginatedData.map((item) => item.id);
      setSelectItem(currentPageIds);
    } else {
      // Uncheck all sub-checkboxes
      setSelectItem([]);
    }
  };

  // Individual checkbox handler
  const checkHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked; // Correctly get the checked state

    if (isChecked) {
      // Add the item to selected items
      const newSelectedItems = [...selectItem, value];
      setSelectItem(newSelectedItems);
      // Check if all items in current page are selected
      const currentPageIds = paginatedData.map((item) => item.id);
      setMainCheckbox(
        currentPageIds.every((id) => newSelectedItems.includes(id))
      );
    } else {
      // Remove the item from selected items
      const newSelectedItems = selectItem.filter((id) => id !== value);
      setSelectItem(newSelectedItems);
      setMainCheckbox(false); // Uncheck main checkbox if any sub-checkbox is unchecked
    }
  };

  // const checkHandler = (e) => {
  //   const value = e.target.value;
  //   const isChecked = e.target.checked;

  //   console.log("Before Update:", selectItem); // Debugging ke liye

  //   if (isChecked) {
  //     const newSelectedItems = [...selectItem, value];
  //     setSelectItem(newSelectedItems);
  //   } else {
  //     const newSelectedItems = selectItem.filter((id) => id !== value);
  //     setSelectItem(newSelectedItems);
  //   }

  //   console.log("After Update:", selectItem); // Debugging ke liye
  // };

  // Pagination handlers
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setMainCheckbox(false);
      setSelectItem([]);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setMainCheckbox(false);
      setSelectItem([]);
    }
  };

  const handleItemsSelect = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setMainCheckbox(false);
    setSelectItem([]);
    setShowItemsDropdown(false);
  };

  function handleFilter() {
    setShowFilterPopup(!showFilterPopup);
  }

  function handleFilterPopupClose() {
    setShowFilterPopup(false);
  }

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");

  const toggleItemsDropdown = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropdownPosition(
        spaceBelow < 150 && spaceAbove > spaceBelow ? "top" : "bottom"
      );
    }
    setShowItemsDropdown((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowItemsDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#FFFFFF] p-5 rounded-[10px]">
      <div className="flex justify-between items-center mt-[15px]">
        <h2 className="text-base xl:text-[20px] font-medium text-[#000000] opacity-70">
          Users List
        </h2>
        <div className="flex">
          <div className="flex rounded-[10px] items-center p-2 h-[42px] bg-[#F1F1F1] me-2 xl:me-[20px]">
            <CiSearch className="ms-2" />
            <input
              type="text"
              placeholder="Search by name, email, mobile, address"
              className="ms-2.5 focus:outline-none focus:ring-gray-400 bg-[#F1F1F1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="bg-[#0832DE] text-white px-[15px] py-2 rounded-[10px] flex items-center"
            onClick={handleFilter}
          >
            <span>
              <CiFilter className="w-[24px] h-[24px] me-[12px]" />
            </span>
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scrollRemove mt-5">
        <table className="w-full text-left border-separate border-spacing-4 whitespace-nowrap rounded-[10px]">
          <thead>
            <tr className="py-[8px]">
              {location.pathname === "/dashboard" ? null : (
                <th className="px-[19px] py-[8px] md:px-[24px]">
                  <input
                    className="w-[16px] h-[16px]"
                    type="checkbox"
                    checked={mainCheckbox}
                    onChange={handleMainCheckboxChange}
                  />
                </th>
              )}
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base">
                Full Name
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base">
                Email
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base w-[150px]">
                Mobile
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base w-[250px]">
                Address
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base w-[100px]">
                User Type
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base w-[200px]">
                Registered At
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base w-[200px]">
                Sub. Exp. Date
              </th>
              <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base">
                Status
              </th>
              {location.pathname === "/dashboard/usersList" ? null : (
                <th className="px-[19px] py-[8px] md:px-[24px] font-medium text-sm md:text-base sticky right-0 bg-white">
                  Action
                </th>
              )}
            </tr>
            <tr>
              <td colSpan="10">
                <div className="w-full border border-dashed border-[#00000066]"></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No users found
                </td>
              </tr>
            ) : (
              paginatedData.map((customer) => (
                <tr key={customer.id}>
                  {location.pathname === "/dashboard" ? null : (
                    <td className="px-[19px] md:px-[24px]">
                      <input
                        className="w-[16px] h-[16px]"
                        type="checkbox"
                        onChange={checkHandler}
                        checked={selectItem.includes(customer.id)}
                        value={customer.id}
                      />
                    </td>
                  )}
                  <Link to={`/dashboard/usersList/userDetails/${customer.id}`}>
                    <td className="px-[19px] md:px-[24px] text-[#6C4DEF] flex items-center gap-2 min-w-[160px]">
                      <img
                        src={customer.image || avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full me-2 object-cover"
                      />
                      {customer.firstName} {customer.lastName}
                    </td>
                  </Link>
                  <td className="px-[19px] md:px-[24px] text-sm font-normal text-[#000000]">
                    {customer.useremail}
                  </td>
                  <td className="px-[19px] md:px-[24px] text-sm font-normal text-[#000000]">
                    {customer.mobile_number}
                  </td>
                  <td className="px-[19px] md:px-[24px] text-sm font-normal text-[#000000] w-[120px] truncate">
                    {customer?.address?.map(
                      (item) => `${item.city}/${item.state}`
                    )}
                  </td>
                  <td
                    className={`px-[19px] md:px-[24px] text-sm font-normal w-[50px] truncate ${
                      customer.userType === true
                        ? "bg-[#0000FF12] text-[#0000FF] rounded-[90px]"
                        : "text-[#FFA500] bg-[#FFA50024] rounded-[90px]"
                    }`}
                  >
                    {customer.userType === true ? "Consumer" : "Provider"}
                  </td>
                  <td className="px-[19px] md:px-[24px] text-sm font-normal text-[#000000]">
                    {formatDate(customer.created_at)}
                  </td>
                  <td className="px-[19px] md:px-[24px] text-sm font-normal text-[#000000]">
                    {formatDate(customer.updated_at)}
                  </td>
                  <td
                    className={`px-[10px] py-[4px] text-sm font-normal text-center ${
                      customer.accountStatus === "Active"
                        ? "bg-[#00800012] text-[#008000] rounded-[90px]"
                        : "text-[#800000] rounded-[90px] bg-[#FF000012]"
                    }`}
                  >
                    {customer.accountStatus}
                  </td>
                  {location.pathname === "/dashboard/usersList" ? null : (
                    <td
                      className="px-[19px] md:px-[24px] text-center sticky right-0 bg-white"
                      onClick={handlePopup}
                    >
                      <button className="text-2xl font-medium">⋮</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-white rounded-[10px]">
        <div className="flex justify-end">
          <div className="flex items-center">
            <h2 className="me-3">Items per page:</h2>
            <div className="relative">
              <div
                className="relative border-[1px] py-1 w-[70px] rounded-[10px] flex justify-center items-center cursor-pointer me-9"
                onClick={toggleItemsDropdown}
                ref={dropdownRef}
              >
                <h2 className="pe-3 text-sm font-medium">{itemsPerPage}</h2>
                <span>▼</span>
                {showItemsDropdown && (
                  <div
                    className={`absolute ${
                      dropdownPosition === "top"
                        ? "bottom-full mb-1"
                        : "top-full mt-1"
                    } bg-white border rounded shadow-lg w-full z-10`}
                  >
                    {[5, 10, 15, 20].map((item) => (
                      <button
                        key={item}
                        onClick={() => handleItemsSelect(item)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="pe-3 text-sm font-medium">
              {startIndex + 1}-{endIndex}
            </h2>
            <span className="pe-5">of {filteredData.length}</span>
            <div className="pe-7 flex">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                <SpikStartCirclChat />
              </button>
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="ps-5"
              >
                <ArrowIconLeft />
              </button>
            </div>
            <div className="pe-3 flex">
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                <ArrowIconRigth />
              </button>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className="ps-5"
              >
                <SpikendCirclChat />
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && <ActionUserPupUp handlePopup={handlePopup} />}
      {showFilterPopup && (
        <UsersFilterPopUp
          handleFilter={handleFilter}
          handleFilterPopupClose={handleFilterPopupClose}
        />
      )}
    </div>
  );
};

export default CustomerData;
