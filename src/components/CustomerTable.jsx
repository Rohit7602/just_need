import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { CiSearch, CiFilter } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
const customers = [
  {
    id: 1204,
    name: "John Leo",
    email: "john@email.co",
    phone: "+91 8945121024",
    address: "ABS Street",
    start: "11 Dec, 2025",
    end: "11 Dec, 2026",
    status: "10 days left",
  },
  {
    id: 1204,
    name: "John Leo",
    email: "john@email.co",
    phone: "+91 8945121024",
    address: "ABS Street",
    start: "11 Dec, 2025",
    end: "11 Dec, 2026",
    status: "60 days left",
  },
  {
    id: 1204,
    name: "John Leo",
    email: "john@email.co",
    phone: "+91 8945121024",
    address: "ABS Street",
    start: "11 Dec, 2025",
    end: "11 Dec, 2026",
    status: "45 days left",
  },
  {
    id: 1204,
    name: "John Leo",
    email: "john@email.co",
    phone: "+91 8945121024",
    address: "ABS Street",
    start: "11 Dec, 2025",
    end: "11 Dec, 2026",
    status: "20 days left",
  },
  {
    id: 1204,
    name: "John Leo",
    email: "john@email.co",
    phone: "+91 8945121024",
    address: "ABS Street",
    start: "11 Dec, 2025",
    end: "11 Dec, 2026",
    status: "06 days left",
  },
];

const CustomerTable = () => {
  const [status, setStatus] = useState("Block");
  const [showPopup, setShowPopup] = useState(false);
  const [showfilterPopup, setshowfilterPopup] = useState(false);
  const [mainCheckbox, setMaincheckbox] = useState(false);

  function handleFilter() {
    setshowfilterPopup(!showfilterPopup);
  }

  function handleMainCheckboxChange() {
    setMaincheckbox(!mainCheckbox);
  }

  function handlefilterpopupclose() {
    setshowfilterPopup();
  }

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <div className="bg-white p-5 rounded-[10px] shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-[20px] font-medium text-[#000000]">
          All Customers
        </h2>
        <div className="flex gap-2">
          <div className="flex border rounded-[20px] items-center p-2 bg-[#F7F7F7] drop-shadow-lg">
            <CiSearch className="ms-2" />
            <input
              type="text"
              placeholder="Search task"
              className="ms-3 focus:outline-none focus:ring-gray-400] bg-[#F7F7F7]"
            />
          </div>
          <button
            className="bg-[#0832DE] text-white px-[15px] py-3 rounded-md flex items-center"
            onClick={handleFilter}
          >
            <span>
              <CiFilter className="w-[24px] h-[24px] me-3" />
            </span>{" "}
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr>
              <th className="p-[19px] md:p-[24px]">
                <input
                  className="w-[16px] h-[16px]"
                  type="checkbox"
                  checked={mainCheckbox}
                  onChange={handleMainCheckboxChange}
                />
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Customer Id
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Full Name
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Email
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Mobile
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Address
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Start Date
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                End Date
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Status
              </th>
              <th className="p-[19px] md:p-[24px]  font-medium text-sm md:text-base">
                Action
              </th>
            </tr>
            <tr>
              <td colSpan="10">
                <div className="w-full border border-dashed border-[#00000066]"></div>
              </td>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td className="p-[19px] md:p-[24px]">
                  <input className="w-[16px] h-[16px]" type="checkbox" />
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.id}
                </td>
                <td className="p-[19px] md:p-[24px] flex items-center gap-2">
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {customer.name}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.email}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.phone}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.address}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.start}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.end}
                </td>
                <td className="p-[19px] md:p-[24px] text-sm font-normal text-[#000000]">
                  {customer.status}
                </td>
                <td
                  className="p-[19px] md:p-[24px] text-center"
                  onClick={handlePopup}
                >
                  <button className="text-2xl font-medium ">&#8942;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-[60px]">
        <span className="text-base font-normal">Showing 1 out of 5</span>
        <div className="flex gap-2 items-center">
          <FaAngleDown className="-rotate-[-90deg]" />
          <span className="font-semibold py-[2px] px-[6px] bg-[#0832DE] text-white">
            1
          </span>
          <span className="font-semibold py-[2px] px-[6px] text-black hover:bg-[#0832DE] hover:text-white">
            2
          </span>
          <FaAngleDown className="-rotate-90" />
        </div>
      </div>
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <button
                onClick={handlePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                aria-label="Close"
              >
                &#10005;
              </button>

              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-base font-normal text-gray-700 mb-2.5"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Block">Block</option>
                  <option value="Unblock ">Unblock</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="reason"
                  className="block font-normal text-base mb-2.5"
                >
                  Reason
                </label>
                <textarea
                  placeholder="type here.."
                  className="w-full h-28 px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#0832DE] text-base text-white font-medium py-3 rounded-[10px]">
                Update Status
              </button>
            </div>
          </div>
        </>
      )}

      {showfilterPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-72">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium mb-4">Filter</h2>
                <button
                  onClick={handlefilterpopupclose}
                  className="mb-5"
                  aria-label="Close"
                >
                  &#10005;
                </button>
              </div>

              <div className="border-t border-dotted mb-4 border-gray-600"></div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer">
                    Customer
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer">
                    Provider
                  </label>
                </div>

                <div className="border-t border-dotted border-gray-600"></div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer">
                    Ongoing Subscription
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer">
                    Ended Subscription
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerTable;
