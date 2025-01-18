import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '../../assets/icon/Icon';
import { FilterIcon, CloseIcon } from '../../assets/icon/Icons';
import { FaAngleDown } from 'react-icons/fa';
import Filters from '../../Components/Popups/Filters';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Complaints = () => {
  const location = useLocation();
  const [val, setVal] = useState('');
  const [ShowFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [storeData, setStoreData] = useState([]);

  const [activeFilters, setActiveFilters] = useState({
    duration: [],
    serviceType: [],
    complaintStatus: [],
  });

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

  const handleActiveFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));

    const concatdata = [...new Set([...storeData, ...value])];
    setStoreData(concatdata.flat(Infinity));
  };

  function handleActiveFilter(filterType) {
    const filterdata = storeData.filter((value) => value !== filterType);
    setStoreData(filterdata);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-5">
      {location.pathname === `/dashboard/complaints/complaintsDetails/${val}` ? (
        <Outlet />
      ) : (
        <div className="mt-3">
          <div className="lg:flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-4 flex-wrap md:flex-wrap">
              <div className="flex items-center gap-4">
                {storeData.map((val, index) => {
                  return (
                    <div key={index}>
                      <p className="flex items-center px-[10px] py-2 rounded-[10px] bg-[#F1F1F1] space-x-2">
                        {val}
                        <button
                          className="ms-4"
                          onClick={() => handleActiveFilter(val)}
                          aria-label="Remove filter">
                          <CloseIcon />
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="flex items-center h-[44px] px-4 bg-gray-200 rounded-lg w-[51vh] lg:w-[250px]">
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
                  className="bg-[#0832DE] flex items-center justify-center text-white font-normal sm:text-sm md:text-base px-4 h-[44px] rounded-lg ml-4">
                  <FilterIcon />
                  <h5 className="md:ms-3 ms-2">Filter</h5>
                </button>
                {ShowFilter && (
                  <div className="absolute right-0 mt-2 z-10">
                    <Filters
                      activeFilters={activeFilters}
                      onFilterChange={handleActiveFilterChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse whitespace-nowrap rounded-xl">
              <thead>
                <tr>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">#</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Customer Id</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Name</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">
                    Service Type
                  </th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Message</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b sticky right-0 bg-white">
                    Action
                  </th>
                </tr>
                <tr>
                  <td colSpan="9">
                    <div className="w-full border-[1px] border-opacity-40 border-dashed border-black"></div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-black text-sm font-normal py-3 lg:py-4 px-4">
                      {index + 1}
                    </td>
                    <td
                      className="text-[#6C4DEF] text-sm font-normal px-4"
                      onClick={() => setVal(item.id)}>
                      <Link to={`complaintsDetails/${item.id}`}>{item.Customer}</Link>
                    </td>
                    <td className="text-black text-sm font-normal px-4">{item.name}</td>
                    <td className="text-black text-sm font-normal px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal px-4 ">{item.message}</td>
                    <a href="">
                      <td
                        className={`text-sm font-normal py-3 px-4 sticky right-0 bg-white ${
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
