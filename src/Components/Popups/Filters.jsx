import React, { useState } from 'react';
import { DropdownIcon } from '../../assets/icon/Icon';

const Filters = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [serviceType, setServiceType] = useState({
    houseCleaning: false,
    carMechanic: false,
    painter: false,
    carpenter: false,
    plumber: false,
    all: false, // Added 'all' for serviceType
  });
  const [complaintStatus, setComplaintStatus] = useState({
    all: false,
    resolved: false,
    processing: false,
    pending: false,
  });

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleServiceTypeChange = (service) => {
    setServiceType((prevState) => {
      const newState = { ...prevState, [service]: !prevState[service] };

      // Check if all individual services are checked to set 'All' checkbox status
      const allChecked = Object.values(newState).every((value) => value === true);
      newState.all = allChecked;

      return newState;
    });
  };

  const handleComplaintStatusChange = (status) => {
    setComplaintStatus((prevState) => {
      const newState = { ...prevState, [status]: !prevState[status] };

      // Check if all complaint statuses are checked to set 'All' checkbox status
      const allChecked = newState.resolved && newState.processing && newState.pending;
      newState.all = allChecked;

      if (!newState[status]) {
        newState.all = false;
      }

      return newState;
    });
  };

  return (
    <div className="relative z-[25]">
      <div className="bg-white border-2 border-[#00000026] w-[400px] mt-4 rounded-[10px]">
        {/* Duration Dropdown */}
        <div>
          <h2
            className={`font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] cursor-pointer flex items-center justify-between ${
              activeDropdown === 'duration' ? 'bg-[#eee]' : ''
            }`}
            onClick={() => toggleDropdown('duration')}>
            <span>Duration</span>
            <div className={`${activeDropdown === 'duration' ? 'rotate-180' : null}`}>
              <DropdownIcon />
            </div>
          </h2>
          {activeDropdown === 'duration' && (
            <div className="px-5 pb-3">
              {['Today', 'Yesterday', 'This Week', '1 Month', '2 Month'].map((service) => (
                <div key={service} className="mt-2.5">
                  <input
                    type="checkbox"
                    id={service}
                    name={service}
                    className="mr-2 accent-black"
                    checked={serviceType[service]}
                    onChange={() => handleServiceTypeChange(service)}
                  />
                  <label className="text-base font-normal" htmlFor={service}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Type Dropdown */}
        <div>
          <h2
            className={`font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] cursor-pointer flex items-center justify-between ${
              activeDropdown === 'serviceType' ? 'bg-[#eee]' : ''
            }`}
            onClick={() => toggleDropdown('serviceType')}>
            <span>Service Type</span>
            <div className={`${activeDropdown === 'serviceType' ? 'rotate-180' : null}`}>
              <DropdownIcon />
            </div>
          </h2>
          {activeDropdown === 'serviceType' && (
            <div className="px-5">
              {/* 'All' Checkbox */}
              <div className="mt-2">
                <input
                  type="checkbox"
                  id="all"
                  name="serviceType"
                  className="mr-2 accent-black"
                  checked={serviceType.all}
                  onChange={() => {
                    const newState = Object.keys(serviceType).reduce((acc, key) => {
                      if (key !== 'all') acc[key] = !serviceType.all;
                      return acc;
                    }, {});
                    newState.all = !serviceType.all;
                    setServiceType(newState);
                  }}
                />
                <label className="text-base font-normal" htmlFor="all">
                  All
                </label>
              </div>
              {/* Service Type Options */}
              {['houseCleaning', 'carMechanic', 'painter', 'carpenter', 'plumber'].map(
                (service) => (
                  <div key={service} className="mt-2.5">
                    <input
                      type="checkbox"
                      id={service}
                      name={service}
                      className="mr-2 accent-black"
                      checked={serviceType[service]}
                      onChange={() => handleServiceTypeChange(service)}
                    />
                    <label className="text-base font-normal" htmlFor={service}>
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </label>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Complaint Status Dropdown */}
        <div>
          <h2
            className={`font-normal sm:text-sm md:text-base text-black py-4 px-5 rounded-[10px] cursor-pointer flex items-center justify-between ${
              activeDropdown === 'complaintStatus' ? 'bg-[#eee]' : ''
            }`}
            onClick={() => toggleDropdown('complaintStatus')}>
            <span>Complaint Status</span>
            <div className={`${activeDropdown === 'complaintStatus' ? 'rotate-180' : null}`}>
              <DropdownIcon />
            </div>
          </h2>
          {activeDropdown === 'complaintStatus' && (
            <div className="px-5 pb-3">
              {/* 'All' Checkbox */}
              <div className="">
                <input
                  type="checkbox"
                  id="all"
                  name="complaintStatus"
                  className="mr-2 accent-black"
                  checked={complaintStatus.all}
                  onChange={() => {
                    const newState = {
                      all: !complaintStatus.all,
                      resolved: !complaintStatus.all,
                      processing: !complaintStatus.all,
                      pending: !complaintStatus.all,
                    };
                    setComplaintStatus(newState);
                  }}
                />
                <label className="text-base font-normal" htmlFor="all">
                  All
                </label>
              </div>
              {/* Status Options */}
              {['resolved', 'processing', 'pending'].map((status) => (
                <div key={status} className="mt-2.5">
                  <input
                    type="checkbox"
                    id={status}
                    name="complaintStatus"
                    className="mr-2 accent-black"
                    checked={complaintStatus[status]}
                    onChange={() => handleComplaintStatusChange(status)}
                  />
                  <label className="text-base font-normal" htmlFor={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
