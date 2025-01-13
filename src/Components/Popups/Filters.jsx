import React, { useState } from 'react';
import { DropdownIcon } from '../../assets/icon/Icon';

const Filters = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="relative z-[100]">
      <div className="bg-white border-2 border-[#00000026] w-[400px] mt-4 rounded-[10px] ">
        {/* Duration Dropdown */}
        <div>
          <h2
            className="font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] hover:bg-[#eee] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown('duration')}
          >
            
            <span>Duration</span>
            <div className={`${activeDropdown==="duration"?"rotate-180":null}`}><DropdownIcon/></div>
          </h2>
          {activeDropdown === 'duration' && (
            <div className="px-5 pb-3">
              <div>
                <input type="radio" id="today" name="duration" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="today">Today</label>
              </div>
              <div className='mt-2.5'>
                <input
                  type="radio"
                  id="yesterday"
                  name="duration"
                  className="mr-2 accent-black"
                />
                <label className='text-base font-normal' htmlFor="yesterday">Yesterday</label>
              </div>
              <div className='mt-2.5'>
                <input
                  type="radio"
                  id="thisWeek"
                  name="duration"
                  className="mr-2 accent-black"
                />
                <label className='text-base font-normal' htmlFor="thisWeek">This Week</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="oneMonth" name="duration" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="oneMonth">1 Month</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="twoMonths" name="duration" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="twoMonths">2 Months</label>
              </div>
            </div>
          )}
        </div>

        {/* Service Type Dropdown */}
        <div>
          <h2
            className="font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] hover:bg-[#eee] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown('serviceType')}
          >
            
            <span>Service Type</span>
            <div className={`${activeDropdown==="serviceType"?"rotate-180":null}`}><DropdownIcon/></div>
          </h2>
          {activeDropdown === 'serviceType' && (
            <div className="px-5 pb-3">
              <div>
                <input
                  type="radio"
                  id="houseCleaning"
                  name="serviceType"
                  className="mr-2 accent-black"
                />
                <label className='text-base font-normal' htmlFor="houseCleaning">House Cleaning</label>
              </div>
              <div className='mt-2.5'>
                <input
                  type="radio"
                  id="carMechanic"
                  name="serviceType"
                  className="mr-2 accent-black"
                />
                <label className='text-base font-normal' htmlFor="carMechanic">Car Mechanic</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="painter" name="serviceType" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="painter">Painter</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="carpenter" name="serviceType" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="carpenter">Carpenter</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="plumber" name="serviceType" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="plumber">Plumber</label>
              </div>
            </div>
          )}
        </div>

        {/* Complaint Status Dropdown */}
        <div>
          <h2
            className="font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] hover:bg-[#eee] cursor-pointer flex items-center justify-between"
            onClick={() => toggleDropdown('complaintStatus')}
          >
            <span>Complaint Status</span>
            <div className={`${activeDropdown==="complaintStatus"?"rotate-180":null}`}><DropdownIcon/></div>
          </h2>
          {activeDropdown === 'complaintStatus' && (
            <div className="px-5 pb-3">
              <div>
                <input
                  type="radio"
                  id="resolved"
                  name="complaintStatus"
                  className="mr-2 accent-black"
                />
                <label  className='text-base font-normal' htmlFor="resolved">Resolved</label>
              </div>
              <div className='mt-2.5'>
                <input
                  type="radio"
                  id="processing"
                  name="complaintStatus"
                  className="mr-2 accent-black"
                />
                <label className='text-base font-normal' htmlFor="processing">Processing</label>
              </div>
              <div className='mt-2.5'>
                <input type="radio" id="pending" name="complaintStatus" className="mr-2 accent-black" />
                <label className='text-base font-normal' htmlFor="pending">Pending</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
