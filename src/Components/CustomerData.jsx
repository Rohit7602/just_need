import React, { useState } from 'react';
import avatar from '../assets/avatar.png';
import { FaAngleDown } from 'react-icons/fa';
import ActionUserPupUp from './Popups/ActionUserPupUp';
import { Link } from 'react-router-dom';

const CustomerData = ({ mapData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [mainCheckbox, setMaincheckbox] = useState(false);
  const [selectitem, setSelectitem] = useState([]);

  function handleMainCheckboxChange() {
    setMaincheckbox(!mainCheckbox);
  }

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  function checkhandler(e) {
    const isselected = e.target.checked;
    const value = parseInt(e.target.value);

    if (isselected) {
      setSelectitem([...selectitem, value]);
    } else {
      setSelectitem((prevdata) => prevdata.filter((id) => id !== value));
    }
  }

  function maincheckbox() {
    if (mapData.length === selectitem.length) {
      setSelectitem([]);
    } else {
      const postids = mapData.map((items) => items.id);
      setSelectitem(postids);
    }
  }

  return (
    <div className="bg-[#FFFFFF] p-5 rounded-[10px]">
      <div className="overflow-x-auto scrollRemove">
        <table className="w-full text-left border-collapse whitespace-nowrap rounded-[10px]">
          <thead>
            <tr className="py-2.5">
              <th className="px-[19px] py-2.5 md:px-[24px]">
                <input
                  className="w-[16px] h-[16px]"
                  type="checkbox"
                  checked={mapData.length === selectitem.length}
                  onChange={maincheckbox}
                />
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Customer Id
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Full Name
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Email
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Mobile
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base w-[120px]">
                Address
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Start Date
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                End Date
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base">
                Status
              </th>
              <th className="px-[19px] py-2.5 md:px-[24px] font-medium text-sm md:text-base sticky right-0 bg-white">
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
                <td className="px-[19px] md:px-[24px] py-1.5">
                  <input
                    className="w-[16px] h-[16px]"
                    type="checkbox"
                    onChange={checkhandler}
                    checked={selectitem.includes(customer.id)}
                    value={customer.id}
                  />
                </td>
                <td className="px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000]">
                  {customer.id}
                </td>
                <Link to={`/dashboard/usersList/userDetails/${customer.id}`}>
                  <td className="px-[19px] md:px-[24px] text-[#6C4DEF] py-1.5 flex items-center gap-2 min-w-[160px]">
                    <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full me-2" />
                    {customer.name}
                  </td>
                </Link>
                <td className="px-[19px] md:px-[24px] py-1.5 w-full text-sm font-normal text-[#000000]">
                  {customer.email}
                </td>
                <td className="px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000]">
                  {customer.phone}
                </td>
                <td className="px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000] w-[120px] truncate">
                  {customer.address}
                </td>
                <td className="px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000]">
                  {customer.start}
                </td>
                <td className="px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000]">
                  {customer.end}
                </td>
                <td
                  className={`px-[19px] md:px-[24px] py-1.5 text-sm font-normal text-[#000000] ${customer.TextColor}`}>
                  {customer.status}
                </td>
                <td
                  className="px-[19px] md:px-[24px] py-1.5 text-center sticky right-0 bg-white"
                  onClick={handlePopup}>
                  <button className="text-2xl font-medium">&#8942;</button>
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
          <span className="font-semibold py-[2px] px-[6px] bg-[#0832DE] text-white">1</span>
          <span className="font-semibold py-[2px] px-[6px] text-black hover:bg-[#0832DE] hover:text-white ms-[26px]">
            2
          </span>
          <FaAngleDown className="-rotate-90 ms-[30px]" />
        </div>
      </div>
      {showPopup && <ActionUserPupUp handlePopup={handlePopup} />}
    </div>
  );
};

export default CustomerData;
