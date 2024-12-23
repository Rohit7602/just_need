import React, { useState } from "react";
import avatar from "../assets/avatar.png";
import { CiSearch, CiFilter } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";

const CustomerData = ({ mapData }) => {
  console.log(mapData,"kajhdnm")
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
    <div className="bg-[#FFFFFF] p-5 rounded-[10px] shadow-md">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-[20px] font-medium text-[#000000]">
          All Customers
        </h2>
        <div className="flex gap-2">
          <div className="flex rounded-[10px] items-center p-2 bg-[#F1F1F1] me-[20px]">
            <CiSearch className="ms-2" />
            <input
              type="text"
              placeholder="Search task"
              className="ms-2.5 focus:outline-none focus:ring-gray-400 bg-[#F1F1F1]"
            />
          </div>
          <button
            className="bg-[#0832DE] text-white px-[15px] py-3 rounded-[10px] flex items-center"
            onClick={handleFilter}
          >
            <span>
              <CiFilter className="w-[24px] h-[24px] me-[12px]" />
            </span>{" "}
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap rounded-[10px] ">
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
            {mapData.map((customer, index) => (
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
                <td
                  className={`p-[19px] md:p-[24px] text-sm font-normal text-[#000000] ${customer.TextColor}`}
                >
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
        <div className="flex items-center">
          <FaAngleDown className="-rotate-[-90deg] me-[30px]" />
          <span className="font-semibold py-[2px] px-[6px] bg-[#0832DE] text-white">
            1
          </span>
          <span className="font-semibold py-[2px] px-[6px] text-black hover:bg-[#0832DE] hover:text-white ms-[26px]">
            2
          </span>
          <FaAngleDown className="-rotate-90 ms-[30px]" />
        </div>
      </div>
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-[15px] relative">
              <button
                onClick={handlePopup}
                className="absolute top-[15px] right-[15px] text-gray-600 hover:text-black"
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.0001 14.1216L17.3031 19.4246C17.5845 19.706 17.9661 19.8641 18.3641 19.8641C18.762 19.8641 19.1437 19.706 19.4251 19.4246C19.7065 19.1432 19.8646 18.7616 19.8646 18.3636C19.8646 17.9657 19.7065 17.584 19.4251 17.3026L14.1201 11.9996L19.4241 6.69662C19.5634 6.55729 19.6738 6.39189 19.7492 6.20987C19.8245 6.02785 19.8633 5.83277 19.8632 5.63577C19.8632 5.43877 19.8243 5.24371 19.7489 5.06172C19.6735 4.87974 19.5629 4.71439 19.4236 4.57512C19.2843 4.43586 19.1189 4.3254 18.9368 4.25005C18.7548 4.1747 18.5597 4.13595 18.3627 4.13599C18.1657 4.13604 17.9707 4.17489 17.7887 4.25032C17.6067 4.32575 17.4414 4.43629 17.3021 4.57562L12.0001 9.87862L6.69709 4.57562C6.55879 4.43229 6.39333 4.31794 6.21036 4.23924C6.02739 4.16055 5.83058 4.11907 5.63141 4.11725C5.43224 4.11543 5.23471 4.15329 5.05033 4.22862C4.86595 4.30395 4.69842 4.41526 4.55752 4.55603C4.41661 4.6968 4.30515 4.86422 4.22964 5.04853C4.15414 5.23284 4.11609 5.43034 4.11773 5.62951C4.11936 5.82868 4.16065 6.02553 4.23917 6.20857C4.3177 6.39161 4.43189 6.55718 4.57509 6.69562L9.88009 11.9996L4.57609 17.3036C4.43289 17.4421 4.3187 17.6076 4.24017 17.7907C4.16165 17.9737 4.12036 18.1706 4.11873 18.3697C4.11709 18.5689 4.15514 18.7664 4.23064 18.9507C4.30615 19.135 4.41761 19.3024 4.55852 19.4432C4.69942 19.584 4.86695 19.6953 5.05133 19.7706C5.23571 19.846 5.43324 19.8838 5.63241 19.882C5.83158 19.8802 6.02839 19.8387 6.21136 19.76C6.39433 19.6813 6.55979 19.5669 6.69809 19.4236L12.0001 14.1216Z"
                    fill="black"
                  />
                </svg>
              </button>

              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-base font-normal text-gray-700 mb-2.5 mt-2.5"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-[20px] py-[13px] bg-[#F2F2F2] rounded-[7px]  font-normal text-base"
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
                  className="w-full h-28 px-5 py-2.5 bg-[#F2F2F2] rounded-[7px] resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-[#0832DE] text-base text-white font-normal py-3 rounded-[10px]">
                Update Status
              </button>
            </div>
          </div>
        </>
      )}

      {showfilterPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-[15px] rounded-lg shadow-lg w-72">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-medium">Filter</h2>
                <button
                  onClick={handlefilterpopupclose}
                  className="mb-5"
                  aria-label="Close"
                >
                  &#10005;
                </button>
              </div>

              <div className="border-t border-dashed mt-2.5 border-[#00000066]"></div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mt-[15px]">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                    Customer
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                    Provider
                  </label>
                </div>

                <h2 className="text-base font-medium mt-[15px]">Status</h2>
                <div className="border-t border-dashed mt-2.5 border-[#00000066]"></div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                    Ongoing Subscription
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 border-2 border-black rounded cursor-pointer "
                  />
                  <label className="text-sm font-normal cursor-pointer opacity-[80%]">
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


export default CustomerData
