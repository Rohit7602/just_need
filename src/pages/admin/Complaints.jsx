import React, { useState } from 'react';
import { SearchIcon, FilterIcon, DottedIcon } from '../../assets/icon/Icon';
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
    name: `Customer `,
    serviceType: 'House Cleaning',
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry... `,
  }));

  const handleFilterToggle = () => {
    setShowFilter(!ShowFilter);
  };

  return (
    <div>
      {location.pathname === `/dashboard/complaints/providerDetail/${val}` ? (
        <Outlet />
      ) : (
        <div className="mt-3 ps-4">
          <h2 className="font-medium sm:text-[20px] lg:text-[28px] text-black">Complaints</h2>
          <p className="font-normal sm:text-sm lg:text-base text-black opacity-70">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
          <div className="pt-[35px] lg:flex justify-between items-center ps-[20px] pe-[20px]">
            <h2 className="font-medium sm:text-md md:text-xl text-black opacity-70">
              All Complaints
            </h2>
            <div className="flex sm:mt-4">
              <div className="flex items-center py-3 px-4 bg-[#F1F1F1] rounded-[10px] max-w-[330px]">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search task"
                  className="w-full outline-none bg-[#F1F1F1] ms-2.5 text-base placeholder:text-base placeholder:font-normal font-normal placeholder:text-[#00000080]"
                />
              </div>
              <button
                onClick={handleFilterToggle}
                className="bg-[#0832DE] flex text-white font-normal sm:text-sm md:text-base md:px-4 md:py-3 px-2 py-3 rounded-[10px] ms-4 relative">
                <FilterIcon />
                <h5 className="md:ms-3 ms-2 ">Filter</h5>
              </button>
            </div>
          </div>
          {ShowFilter && <Filters />}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse whitespace-nowrap rounded-[10px]">
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
                  <td colSpan="6">
                    <div className="w-full border border-dashed border-[#00000066] mb-3"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-black text-sm font-normal py-3 px-4">{index + 1}</td>
                    <td
                      className="text-[#0832DE] text-sm font-normal py-3 px-4"
                      onClick={() => setVal(item.id)}>
                      <Link to={`providerDetail/${item.id}`}>{item.Customer}</Link>
                    </td>
                    <td className="text-black text-sm font-normal py-3 px-4">{item.name}</td>
                    <td className="text-black text-sm font-normal py-3 px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal py-3 px-4">{item.message}</td>
                    <td className="text-black text-sm font-normal py-3 px-4">{<DottedIcon />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
