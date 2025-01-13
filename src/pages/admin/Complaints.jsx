import React, { useState, useRef, useEffect } from "react";
import { SearchIcon } from "../../assets/icon/Icon";
import { FilterIcon, CloseIcon } from "../../assets/icon/Icons";
import { FaAngleDown } from "react-icons/fa";
import Filters from "../../Components/Popups/Filters";
import { Link, Outlet, useLocation } from "react-router-dom";

export const Complaints = () => {
  const location = useLocation();
  const [val, setVal] = useState('');
  const [ShowFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const Data = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    Customer: `003244`,
    name: `John Deo`,
    serviceType: 'House Cleaning',
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`,
    status: index % 7 === 0 || index % 7 >= 5 ? 'Open' : 'Closed',
  }));

  const handleFilterToggle = () => {
    setShowFilter(!ShowFilter);
  };

  // Close the filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-5">
      {location.pathname === `/dashboard/complaints/complaintsDetails/${val}` ? (
        <Outlet />
      ) : (
        <div className="mt-3">
          <div className="lg:flex justify-between items-center pe-[20px]">
            <div className="flex items-center gap-[15px]">
              {/* Filter Tags */}
              <div className="flex items-center px-[10px] py-[6px] gap-2.5 rounded-[10px] bg-[#F1F1F1]">
                <h2 className="text-base font-normal text-[#000000]">
                  Yesterday
                </h2>
                <CloseIcon />
              </div>
              <div className="flex items-center px-[10px] py-[6px] gap-2.5 rounded-[10px] bg-[#F1F1F1]">
                <h2 className="text-base font-normal text-[#000000]">House Cleaning</h2>
                <CloseIcon />
              </div>
              <div className="flex items-center px-[10px] py-[6px] gap-2.5 rounded-[10px] bg-[#F1F1F1]">
                <h2 className="text-base font-normal text-[#000000]">
                Pending
                </h2>
                <CloseIcon />
              </div>
            </div>
            {/* Filter Button */}
            <div className="flex sm:mt-5 lg:mt-0">
              <div className="flex items-center h-[42px] px-4 bg-[#F1F1F1] rounded-[10px] w-[337px]">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search task"
                  className="w-full outline-none bg-transparent ml-2 text-base placeholder:text-gray-500"
                />
              </div>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={handleFilterToggle}
                  className="bg-[#0832DE] flex items-center justify-center text-white font-normal sm:text-sm md:text-base md:px-4 h-[42px] px-2 rounded-[10px] ms-4"
                >
                  <FilterIcon />
                  <h5 className="md:ms-3 ms-2">Filter</h5>
                </button>
                {ShowFilter && (
                  <div className="absolute end-0">
                    <Filters />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse whitespace-nowrap rounded-[10px]">
              <thead>
                <tr className="h-[44px]">
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    #
                  </th>
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    Customer Id
                  </th>
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    Name
                  </th>
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    Service Type
                  </th>
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    Message
                  </th>
                  <th className="text-black text-sm font-medium  px-4 border-b">
                    Action
                  </th>
                </tr>
                <tr>
                  <td colSpan="9">
                    <div className="w-full border-[1px] border-opacity-40 border-dashed border-[#00000066]"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={item.id} className="h-[44px]">
                    <td className="text-black text-sm font-normal  px-4">
                      {index + 1}
                    </td>
                    <td
                      className="text-[#0832DE] text-sm font-normal px-4"
                      onClick={() => setVal(item.id)}
                    >
                      <Link to={`complaintsDetails/${item.id}`}>
                        {item.Customer}
                      </Link>
                    </td>
                    <td className="text-black text-sm font-normal px-4">
                      {item.name}
                    </td>
                    <td className="text-black text-sm font-normal px-4">
                      {item.serviceType}
                    </td>
                    <td className="text-black text-sm font-normal px-4">
                      {item.message}
                    </td>
                    <td
                      className={`text-sm font-normal py-3 px-4 ${
                        item.status === "Open"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="text-black text-sm font-normal px-4">{item.name}</td>
                    <td className="text-black text-sm font-normal px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal px-4">{item.message}</td>
                    <a href="">
                      {' '}
                      <td
                        className={`text-sm font-normal py-3 px-4 ${
                          item.status === 'Open' ? 'text-[#3D9602]' : 'text-[#FF0000]'
                        }`}>
                        {item.status}
                      </td>
                    </a>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-[60px]">
              <span className="text-base font-normal">Showing 1 out of 5</span>
              <div className="flex items-center">
                <FaAngleDown className="-rotate-[-90deg] me-[30px]" />
                <span className="font-semibold py-[2px] px-[6px] bg-[#0832DE] text-white">1</span>
                <span className="font-semibold py-[2px] px-[6px] text-black hover:bg-[#0832DE] hover:text-white ms-[26px]">
                  2
                </span>
                <FaAngleDown className="-rotate-90 ms-[30px]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
