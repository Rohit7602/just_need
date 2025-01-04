import React from 'react';
import { ArrowIcon, Resolve_Issue } from '../../assets/icon/Icon';
import imgCustemer from '../../assets/png/Frame 1000004210.png';

const Provider_Detail = () => {
  return (
    //Complaints Details and Resolve Issue button
    <div className=" py-4 px-4">
      <div className="flex justify-between items-center">
        <div className=" flex items-center">
          <ArrowIcon />
          <h2 className=" font-medium text-[28px] text-black ps-5 ">Complaints Details</h2>
        </div>
        <button className=" bg-[#0832DE] flex text-white font-normal sm:text-sm md:text-base md:px-4 md:py-3 px-2 py-3 rounded-[10px] ms-4 mt-4">
          <Resolve_Issue />
          <h5 className="md:ms-3 ms-2">Resolve Issue</h5>
        </button>
      </div>
      {/* Customer detail box */}
      <div className="bg-[#6C4DEF] py-5 px-5 rounded-[10px] mt-5 w-5/12">
        <h2 className=" font-medium text-[18px] text-white">Customer Detail</h2>
        <div className="w-full border border-dashed border-[#fff] opacity-60  mb-3 mt-3  "></div>
        <img src={imgCustemer} alt="imgCustemer" />
        <h2 className=" font-medium text-base text-white "> Jhon Deo</h2>
      </div>
    </div>
  );
};

export default Provider_Detail;
