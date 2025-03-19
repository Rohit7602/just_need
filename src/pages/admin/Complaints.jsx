/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { ActionIcon, SearchIcon } from '../../assets/icon/Icon';
import { FilterIcon, CloseIcon, DeleteIcon, DownArrow, ArrowIconLeft, ArrowIconRigth, SpikendCirclChat, SpikStartCirclChat } from '../../assets/icon/Icons';
import Filters from '../../Components/Popups/Filters';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Complaints = () => {
  const location = useLocation();
  const [val, setVal] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [activeFilters, setActiveFilters] = useState({
    duration: '',
    serviceType: [],
    complaintStatus: [],
  });
  const [allChecked, setAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const Data = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    Customer: '003244',
    name: 'John Deo',
    serviceType: 'House Cleaning',
    subject: 'It is a long established',
    message: 'It is a long established fact that a reader will be distracted.',
    date: "11 Dec, 2024",
    email: "john@gmail.com",
    status: index % 7 === 0 || index % 7 >= 5 ? 'Pending' : 'Done',
    action: <ActionIcon />
  }));

  // Pagination calculations
  const totalItems = Data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = Data.slice(startIndex, endIndex);

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const showButtons = checkedCount >= 2;

  const handleMainCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const newCheckedItems = {};
    currentItems.forEach(item => {
      newCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleItemCheckboxChange = (id) => (e) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: e.target.checked
    };
    setCheckedItems(newCheckedItems);
    const allItemsChecked = currentItems.every(item => newCheckedItems[item.id]);
    setAllChecked(allItemsChecked);
  };

  const handleFilterToggle = () => setShowFilter(!showFilter);

  const handleActiveFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: filterType === 'duration' ? value : value,
    }));
  };

  const removeFilter = (filterType, filter) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: Array.isArray(prevFilters[filterType])
        ? prevFilters[filterType].filter((item) => item !== filter)
        : '',
    }));
  };

  // Pagination handlers
  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
    setShowItemsDropdown(false);
    setCheckedItems({}); // Reset checked items
    setAllChecked(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setCheckedItems({});
      setAllChecked(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setCheckedItems({});
      setAllChecked(false);
    }
  };

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
    <div className="p-5 bg-white rounded-[10px]">
      {location.pathname === `/dashboard/complaints/complaintsDetails/${val}` ? (
        <Outlet />
      ) : (
        <div className="mt-3">
          {/* Existing header content remains the same */}
          <div className="lg:flex justify-between items-center px-4 py-2">
            <div className='flex gap-3 items-center'>
              <h1 className='font-medium text-xl'>All Complaints</h1>
              {showButtons && (
                <>
                  <button className="border border-[#F1F1F1] ms-6 text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2">
                    <span><DeleteIcon /></span>
                    Delete
                  </button>
                  <button className="border border-[#F1F1F1] text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2">
                    My Action
                    <span><DownArrow /></span>
                  </button>
                </>
              )}
            </div>
            {/* Filter tags remain the same */}
            <div className="flex items-center gap-4 flex-wrap">
              {Object.entries(activeFilters).map(([filterType, filters]) =>
                Array.isArray(filters)
                  ? filters.map((filter, index) => (
                    <div key={`${filterType}-${index}`} className="flex items-center px-[10px] py-2 rounded-[10px] bg-[#F1F1F1] space-x-2">
                      <span>{filter}</span>
                      <button onClick={() => removeFilter(filterType, filter)}><CloseIcon /></button>
                    </div>
                  ))
                  : filters && (
                    <div key={`${filterType}`} className="flex items-center px-[10px] py-2 rounded-[10px] bg-[#F1F1F1] space-x-2">
                      <span>{filters}</span>
                      <button onClick={() => removeFilter(filterType, filters)}><CloseIcon /></button>
                    </div>
                  )
              )}
            </div>
            {/* Search and filter button remain the same */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <div className="flex items-center h-[44px] px-4 bg-gray-200 rounded-lg w-[51vh] lg:w-[250px]">
                <SearchIcon />
                <input type="text" placeholder="Search task" className="w-full outline-none bg-transparent ml-2 text-base placeholder:text-gray-500" />
              </div>
              <div className="relative" ref={filterRef}>
                <button onClick={handleFilterToggle} className="bg-[#0832DE] flex items-center justify-center text-white font-normal sm:text-sm md:text-base px-4 h-[44px] rounded-lg ml-4">
                  <FilterIcon />
                  <h5 className="md:ms-3 ms-2">{showFilter ? 'Hide' : 'Filter'}</h5>
                </button>
                {showFilter && (
                  <div className="absolute right-0 mt-2 z-10">
                    <Filters activeFilters={activeFilters} onFilterChange={handleActiveFilterChange} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-separate border-spacing-y-2 whitespace-nowrap rounded-xl">
              <thead>
                {/* Table header remains the same */}
                <tr>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">
                    <input type="checkbox" checked={allChecked} onChange={handleMainCheckboxChange} />
                  </th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Complaint Id</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Related To</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Title</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Description</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Date</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Email</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b bg-white">Status</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b bg-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="text-black text-sm font-normal py-[4px] px-4">
                      <input
                        type="checkbox"
                        checked={checkedItems[item.id] || false}
                        onChange={handleItemCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="text-[#6C4DEF] text-sm font-normal px-4">
                      <Link to={`/dashboard/complaints/complaintsDetails/${item.id}`} onClick={() => setVal(item.id)}>
                        {item.Customer}
                      </Link>
                    </td>
                    <td className="text-black text-sm font-normal px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal px-4">{item.subject}</td>
                    <td className="text-black text-sm font-normal px-4">
                      <div className="w-[279px] max-h-[60px] overflow-hidden whitespace-pre-wrap">
                        {item.message}
                      </div>
                    </td>
                    <td className="text-black text-sm font-normal px-4">{item.date}</td>
                    <td className="text-black text-sm font-normal px-4">{item.email}</td>
                    <td className='text-center'>
                      <span className={`text-sm font-normal py-[4px] px-2.5 bg-white ${item.status === 'Pending'
                        ? 'bg-[#FFA50029] text-[#FFA500] rounded-[90px]'
                        : 'text-[#008000] rounded-[90px] bg-[#0080001A] text-center'
                        }`}>   {item.status}</span>
                    </td>
                    <td className="text-black text-sm font-normal px-4 text_center align-top">{item.action}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Updated Pagination */}
          <div className="p-4 bg-white rounded-[10px]">
            <div className="flex justify-end items-center">
              <div className="flex items-center me-6">
                <h2 className="me-3">Items per page:</h2>
                <div className="relative">
                  <button
                    onClick={() => setShowItemsDropdown(!showItemsDropdown)}
                    className="border-[1px] py-1 w-[70px] rounded-[10px] flex justify-center items-center cursor-pointer"
                  >
                    <h2 className="pe-3 text-sm font-medium">{itemsPerPage}</h2>
                    <span>▼</span>
                  </button>
                  {showItemsDropdown && (
                    <div className="absolute top-full mt-1 bg-white border rounded shadow-lg w-full z-10">
                      {[5, 10, 15, 20].map((item) => (
                        <button
                          key={item}
                          onClick={() => handleItemsPerPageChange(item)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium me-3">
                  {startIndex + 1} - {endIndex} of {totalItems}
                </span>
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowIconLeft />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ArrowIconRigth />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};