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
  const [mainCheckbox, setMaincheckbox] = useState(false);
  const [selectitem, setSelectitem] = useState([]);
  const [showfilterPopup, setshowfilterPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("users").select("*");
        if (error) throw error;
        setUsers(data || []); // Ensure we always set an array
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  function handleFilter() {
    setshowfilterPopup(!showfilterPopup);
  }

  function handlefilterpopupclose() {
    setshowfilterPopup(false); // Fixed to properly close popup
  }

  const location = useLocation();

  function handleMainCheckboxChange() {
    const newCheckedState = !mainCheckbox;
    setMaincheckbox(newCheckedState);
    if (newCheckedState) {
      const postids = filteredData.map((items) => items.id); // Use filteredData for consistency with display
      setSelectitem(postids);
    } else {
      setSelectitem([]);
    }
  }

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  function checkhandler(e) {
    const { value, isSelected } = e.target;

    if (isSelected) {
      setSelectitem([...selectitem, value]);
    } else {
      setSelectitem((prevdata) => prevdata.filter((id) => id !== value));
      setMaincheckbox(false); // Uncheck main checkbox if any sub-checkbox is unchecked
    }
  }

  function maincheckbox() {
    if (filteredData.length === selectitem.length) {
      setSelectitem([]);
      setMaincheckbox(false);
    } else {
      const postids = filteredData.map((items) => items.id); // Use filteredData instead of mapData
      setSelectitem(postids);
      setMaincheckbox(true);
    }
  }

  const [showItemsDropdown, setShowItemsDropdown] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const dropdownRef = useRef(null);

  const toggleItemsDropdown = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 150 && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
    setShowItemsDropdown((prev) => !prev);
  };

  const handleItemsSelect = (value) => {
    setItemsPerPage(value);
    setShowItemsDropdown(false);
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

  const filteredData = users.filter((customer) => {
    return (
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-[#FFFFFF] p-5 rounded-[10px]">
      <div className="flex justify-between items-center mt -[15px]">
        <h2 className="text-base xl:text-[20px] font-medium text-[#000000] opacity-70">
          Users List
        </h2>
        <div className="flex ">
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
            </span>{" "}
            Filter
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scrollRemove mt-5">
        <table className="w-full text-left border-separate border-spacing-4 whitespace-nowrap rounded-[10px] ">
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
            {users.map((customer, index) => (
              <tr key={index}>
                {location.pathname === "/dashboard" ? null : (
                  <td className="px-[19px] md:px-[24px] ">
                    <input
                      className="w-[16px] h-[16px]"
                      type="checkbox"
                      onChange={checkhandler}
                      checked={selectitem.includes(customer.id)}
                      value={customer.id}
                    />
                  </td>
                )}
                <Link to={`/dashboard/usersList/userDetails/${customer.id}`}>
                  <td className="px-[19px] md:px-[24px] text-[#6C4DEF]  flex items-center gap-2 min-w-[160px]">
                    <img
                      src={customer.image || avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full me-2 object-cover"
                    />
                    {customer.firstName} {customer.lastName}
                  </td>
                </Link>
                <td className="px-[19px] md:px-[24px]  text-sm font-normal text-[#000000]">
                  {customer.useremail}
                </td>
                <td className="px-[19px] md:px-[24px]  text-sm font-normal text-[#000000]">
                  {customer.mobile_number}
                </td>
                <td className="px-[19px] md:px-[24px]  text-sm font-normal text-[#000000] w-[120px] truncate">
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
                <td className="px-[19px] md:px-[24px]  text-sm font-normal text-[#000000]">
                  {formatDate(customer.created_at)}
                </td>
                <td className="px-[19px] md:px-[24px]  text-sm font-normal text-[#000000]">
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
                    className="px-[19px] md:px-[24px]  text-center sticky right-0 bg-white"
                    onClick={handlePopup}
                  >
                    <button className="text-2xl font-medium">⋮</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-white rounded-[10px]">
        <div className="flex justify-end ">
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
            <h2 className="pe-3 text-sm font-medium">1-{itemsPerPage}</h2>
            <span className=" pe-5">of {filteredData.length}</span>
            <div className="pe-7 flex ">
              <SpikStartCirclChat />
              <div className=" ps-5">
                <ArrowIconLeft />
              </div>
            </div>
            <div className=" pe-3">
              <ArrowIconRigth />
            </div>
            <SpikendCirclChat />
          </div>
        </div>
      </div>
      {showPopup && <ActionUserPupUp handlePopup={handlePopup} />}
      {showfilterPopup && (
        <UsersFilterPopUp
          handleFilter={handleFilter}
          handlefilterpopupclose={handlefilterpopupclose}
        />
      )}
    </div>
  );
};

export default CustomerData;
