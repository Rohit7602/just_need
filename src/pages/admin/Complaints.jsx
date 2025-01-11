import React, { useState } from 'react';
import { SearchIcon } from '../../assets/icon/Icon';
import { FilterIcon, CloseIcon } from '../../assets/icon/Icons';
import { FaAngleDown } from 'react-icons/fa';
import Filters from '../../Components/Popups/Filters';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Complaints = () => {
  const location = useLocation();
  const [val, setVal] = useState('');
  const [ShowFilter, setShowFilter] = useState(false);

  const Data = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    Customer: `003244`,
    name: `John Deo `,
    serviceType: 'House Cleaning',
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`,
    status: index % 7 === 0 || index % 7 >= 5 ? 'Open' : 'Closed',
  }));

  const handleFilterToggle = () => {
    setShowFilter(!ShowFilter);
  };

  return (
    <div className="p-5">
      {location.pathname === `/dashboard/complaints/complaintsDetails/${val}` ? (
        <Outlet />
      ) : (
        // button for filter and search
        <div className="mt-3 ">
          <div className="flex flex-col lg:flex-row justify-between items-center px-2 lg:px-4">
            <div className="flex flex-wrap items-center gap-3 mb-4 lg:mb-0">
              {['Yesterday', 'House Cleaning', 'Pending'].map((label) => (
                <div key={label} className="flex items-center bg-gray-200 py-1.5 px-2.5 rounded-lg">
                  <h2 className="text-sm lg:text-base font-normal text-black pe-3">{label}</h2>
                  <CloseIcon />
                </div>
              ))}
            </div>
            <div className="flex w-full lg:w-auto items-center gap-3">
              <div className="flex items-center py-3 px-4 bg-gray-200 rounded-lg flex-grow lg:flex-grow-0 lg:w-[337px] md:w-[222px]">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search task"
                  className="w-full outline-none bg-transparent ml-2.5 text-base placeholder:text-gray-500"
                />
              </div>
              <button
                onClick={handleFilterToggle}
                className="bg-blue-700 text-white font-normal text-sm md:text-base md:px-4 md:py-3 px-3 py-2 rounded-lg flex items-center relative">
                <FilterIcon />
                <h5 className="ml-2 md:ml-3">Filter</h5>
              </button>
            </div>
          </div>
          {/* Table */}
          {ShowFilter && <Filters />}
          <div className="overflow-x-auto mt-6 ">
            <table className="w-full text-left border-collapse  whitespace-nowrap rounded-[10px] ">
              <thead>
                <tr>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">#</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Customer Id</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Name</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">
                    Service Type
                  </th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Message</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Action</th>
                </tr>
                <tr>
                  <td colSpan="9">
                    <div className=" w-full border-[1px] border-opacity-40  border-dashed border-[#00000066]"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-black text-sm font-normal py-3 lg:py-[20.5px] px-4">
                      {index + 1}
                    </td>
                    <td
                      className="text-[#6C4DEF] text-sm font-normal  px-4"
                      onClick={() => setVal(item.id)}>
                      <Link to={`complaintsDetails/${item.id}`}>{item.Customer}</Link>
                    </td>
                    <td className="text-black text-sm font-normal  px-4">{item.name}</td>
                    <td className="text-black text-sm font-normal  px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal  px-4">{item.message}</td>
                    <td
                      className={`text-sm font-normal py-3 px-4 ${
                        item.status === 'Open' ? ' text-green-500' : 'text-red-500'
                      }`}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*  showing  */}
            <div className="flex justify-between items-center mt-[60px] pe-4 sm:mb-[40px] md:mb-[40px] lg:mb-[89px]">
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
