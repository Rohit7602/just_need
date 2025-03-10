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
  DeleteIcon,
  DownArrow,
  FilterSvg,
} from ".././assets/icon/Icons";
import { supabase } from "../store/supabaseCreateClient";
import { toast } from "react-toastify";
import { useCustomerContext } from "../store/CustomerContext";

const CustomerData = ({ mapData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [selectItem, setSelectItem] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [filterPopupsvg, setFilterPopupSvg] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search"); // New state for dynamic placeholder

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

  const { users, setUsers, loading } = useCustomerContext();

  // Filter logic based on selected fields
  const filteredData = users?.filter((customer) => {
    if (selectedFilters.length === 0) {
      return (
        (customer.firstName + " " + customer.lastName)
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.useremail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.mobile_number
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer?.address?.some((addr) =>
          `${addr.city}/${addr.state}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }

    return selectedFilters.some((filter) => {
      switch (filter) {
        case "name":
          return (customer.firstName + " " + customer.lastName)
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "email":
          return customer.useremail
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        case "address":
          return customer?.address?.some((addr) =>
            `${addr.city}/${addr.state}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        case "mobile":
          return customer.mobile_number
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        default:
          return false;
      }
    });
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
      const currentPageIds = paginatedData.map((item) => item.id);
      setSelectItem(currentPageIds);
    } else {
      setSelectItem([]);
    }
  };

  // Individual checkbox handler
  const checkHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newSelectedItems = [...selectItem, value];
      setSelectItem(newSelectedItems);
      const currentPageIds = paginatedData.map((item) => item.id);
      setMainCheckbox(
        currentPageIds.every((id) => newSelectedItems.includes(id))
      );
    } else {
      const newSelectedItems = selectItem.filter((id) => id !== value);
      setSelectItem(newSelectedItems);
      setMainCheckbox(false);
    }
  };

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

  // Delete functionality
  const handleDeleteClick = () => {
    if (selectItem.length > 0) {
      setShowDeletePopup(true);
    } else {
      toast.info("Please select at least one user to delete.");
    }
  };

  const handleConfirmDisable = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ accountStatus: "Inactive" })
        .in("id", selectItem);

      if (error) throw error;

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectItem.includes(user.id)
            ? { ...user, accountStatus: "Inactive" }
            : user
        )
      );
      setSelectItem([]);
      setMainCheckbox(false);
      setShowDeletePopup(false);
      toast.success("Selected users have been disabled successfully.");
    } catch (err) {
      console.error("Error disabling users:", err);
      toast.error("Failed to disable users. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

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

  // Handle filter checkbox clicks and update placeholder
  const handleFilterCheckboxChange = (field) => {
    const updatedFilters = selectedFilters.includes(field)
      ? selectedFilters.filter((f) => f !== field)
      : [...selectedFilters, field];
    setSelectedFilters(updatedFilters);
    setFilterPopupSvg(false); // Close popup on click

    // Update placeholder based on selected filters
    if (updatedFilters.length === 0) {
      setSearchPlaceholder("Search");
    } else {
      setSearchPlaceholder(
        `Search ${updatedFilters
          .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
          .join(", ")}`
      );
    }
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

  // Condition to show Delete and My Action buttons
  const showActionButtons = selectItem.length >= 2 || mainCheckbox;

  return (
    <div className="bg-[#FFFFFF] p-5 rounded-[10px]">
      <div className="flex justify-between items-center mt-[15px]">
        <div className="flex items-center gap-6">
          <h2 className="text-base xl:text-[20px] font-medium text-[#000000] opacity-70">
            Users List
          </h2>
          {showActionButtons && (
            <>
              <button
                className="border border-[#F1F1F1] text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2"
                onClick={handleDeleteClick}
              >
                <span>
                  <DeleteIcon />
                </span>
                Delete
              </button>
              <button className="border border-[#F1F1F1] text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2">
                My Action
                <span>
                  <DownArrow />
                </span>
              </button>
            </>
          )}
        </div>

        <div className="flex">
          <div className="flex rounded-[10px] items-center p-2 h-[42px] bg-[#F1F1F1] xl:me-[20px]">
            <CiSearch className="ms-2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="ms-2.5 focus:outline-none focus:ring-gray-400 bg-[#F1F1F1]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter SVG button */}
          <button
            onClick={() => setFilterPopupSvg(!filterPopupsvg)}
            className="mx-5 w-[40px] h-[40px] bg-[#F1F1F1] flex items-center justify-center rounded-[10px]"
          >
            <FilterSvg />
          </button>

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
              <th className="px-[19px] py-[8px] md:px-[24px]">
                <input
                  className="w-[16px] h-[16px]"
                  type="checkbox"
                  checked={mainCheckbox}
                  onChange={handleMainCheckboxChange}
                />
              </th>
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
                  <td className="px-[19px] md:px-[24px]">
                    <input
                      className="w-[16px] h-[16px]"
                      type="checkbox"
                      onChange={checkHandler}
                      checked={selectItem.includes(customer.id)}
                      value={customer.id}
                    />
                  </td>
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
                      customer.accountStatus === "active"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemsSelect(item);
                        }}
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

      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[10px] shadow-lg w-[400px]">
            <h2 className="text-lg font-medium mb-4">Confirm Disable Users</h2>
            <p className="mb-6">
              Are you sure you want to disable the selected {selectItem.length}{" "}
              user(s)? This will set their status to "Inactive".
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="border border-[#F1F1F1] text-[#00000099] py-2 px-4 rounded-[10px]"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-[#0832DE] text-white py-2 px-4 rounded-[10px]"
                onClick={handleConfirmDisable}
              >
                Yes, Disable
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && <ActionUserPupUp handlePopup={handlePopup} />}
      {showFilterPopup && (
        <UsersFilterPopUp
          handleFilter={handleFilter}
          handleFilterPopupClose={handleFilterPopupClose}
        />
      )}

      {filterPopupsvg && (
        <div
          onClick={() => setFilterPopupSvg(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            className="bg-white p-6 rounded-[10px] shadow-lg w-[300px]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="name"
                  onChange={() => handleFilterCheckboxChange("name")}
                  checked={selectedFilters.includes("name")}
                />
                <label
                  htmlFor="name"
                  className="text-base font-normal leading-[140%]"
                >
                  Name
                </label>
              </div>
              <div className="border border-[#E8E8E8] w-full"></div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="email"
                  onChange={() => handleFilterCheckboxChange("email")}
                  checked={selectedFilters.includes("email")}
                />
                <label
                  htmlFor="email"
                  className="text-base font-normal leading-[140%]"
                >
                  Email
                </label>
              </div>
              <div className="border border-[#E8E8E8] w-full"></div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="address"
                  onChange={() => handleFilterCheckboxChange("address")}
                  checked={selectedFilters.includes("address")}
                />
                <label
                  htmlFor="address"
                  className="text-base font-normal leading-[140%]"
                >
                  Address
                </label>
              </div>
              <div className="border border-[#E8E8E8] w-full"></div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mobile"
                  onChange={() => handleFilterCheckboxChange("mobile")}
                  checked={selectedFilters.includes("mobile")}
                />
                <label
                  htmlFor="mobile"
                  className="text-base font-normal leading-[140%]"
                >
                  Mobile
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerData;
