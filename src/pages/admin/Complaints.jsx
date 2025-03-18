import { useState, useEffect, useRef } from 'react';
import { ActionIcon, LeftIcon, SearchIcon } from '../../assets/icon/Icon';
import { FilterIcon, CloseIcon, DeleteIcon, DownArrow } from '../../assets/icon/Icons';
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

  const Data = Array.from({ length: 10 }, (_, index) => ({
    id: (index + 1).toString(),
    Customer: '003244',
    name: 'John Deo',
    serviceType: 'House Cleaning',
    subject: 'Work Pending',
    message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
    date: "11 Dec, 2024",
    email: "john@gmail.com",
    status: index % 7 === 0 || index % 7 >= 5 ? 'Open' : 'Closed',
    action: <ActionIcon />
  }));

  // Calculate number of checked items
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const showButtons = checkedCount >= 2;

  // Handle main checkbox change
  const handleMainCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    const newCheckedItems = {};
    Data.forEach(item => {
      newCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  // Handle individual checkbox change
  const handleItemCheckboxChange = (id) => (e) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: e.target.checked
    };
    setCheckedItems(newCheckedItems);
    const allItemsChecked = Data.every(item => newCheckedItems[item.id]);
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
          <div className="lg:flex justify-between items-center px-4 py-2">
            <div className='flex gap-3 items-center'>
              <h1 className='font-medium text-xl'>All Complaints</h1>
              {showButtons && (
                <>
                  <button
                    className="border border-[#F1F1F1] ms-6 text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2"
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
            <div className="flex items-center gap-4 flex-wrap">
              {Object.entries(activeFilters).map(([filterType, filters]) =>
                Array.isArray(filters)
                  ? filters.map((filter, index) => (
                    <div
                      key={`${filterType}-${index}`}
                      className="flex items-center px-[10px] py-2 rounded-[10px] bg-[#F1F1F1] space-x-2">
                      <span>{filter}</span>
                      <button
                        onClick={() => removeFilter(filterType, filter)}
                        aria-label="Remove filter">
                        <CloseIcon />
                      </button>
                    </div>
                  ))
                  : filters && (
                    <div
                      key={`${filterType}`}
                      className="flex items-center px-[10px] py-2 rounded-[10px] bg-[#F1F1F1] space-x-2">
                      <span>{filters}</span>
                      <button
                        onClick={() => removeFilter(filterType, filters)}
                        aria-label="Remove filter">
                        <CloseIcon />
                      </button>
                    </div>
                  )
              )}
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
                  <h5 className="md:ms-3 ms-2">{showFilter ? 'Hide' : 'Filter'}</h5>
                </button>
                {showFilter && (
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

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left border-collapse whitespace-nowrap rounded-xl">
              <thead>
                <tr>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={handleMainCheckboxChange}
                    />
                  </th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Complaint Id</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Related To</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Title</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Description</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Date</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b">Email</th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b sticky right-0 bg-white">
                    Status
                  </th>
                  <th className="text-black text-sm font-medium py-3 px-4 border-b sticky right-0 bg-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Data.map((item) => (
                  <tr key={item.id}>
                    <td className="text-black text-sm font-normal py-3 lg:py-4 px-4">
                      <input
                        type="checkbox"
                        checked={checkedItems[item.id] || false}
                        onChange={handleItemCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="text-[#6C4DEF] text-sm font-normal px-4">
                      <Link
                        to={`/dashboard/complaints/complaintsDetails/${item.id}`}
                        onClick={() => setVal(item.id)}>
                        {item.Customer}
                      </Link>
                    </td>
                    <td className="text-black text-sm font-normal px-4">{item.serviceType}</td>
                    <td className="text-black text-sm font-normal px-4">{item.subject}</td>
                    <td className="text-black text-sm font-normal px-4">{item.message}</td>
                    <td className="text-black text-sm font-normal px-4">{item.date}</td>
                    <td className="text-black text-sm font-normal px-4">{item.email}</td>
                    <td className={`text-sm font-normal py-3 px-4 sticky right-0 bg-white ${item.status === 'Open' ? 'text-[#3D9602]' : 'text-[#FF0000]'}`}>
                      {item.status}
                    </td>
                    <td className="text-black text-sm font-normal px-4 text_center">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex items-center justify-between'>

            <div className='mt-[30px]'>
              <p className='font-normal fs-base'>showing 1 out of 5</p>
            </div>

            <div className='flex items-center'>

              <p className='me-5'> <LeftIcon /></p>

              <p className='me-5 px-[10px] py-[2px] bg-[#335ACB] text-white'>1</p>
              <p>2</p>


              <p className='rotate-180 ms-5'>
                <LeftIcon />
              </p>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
};