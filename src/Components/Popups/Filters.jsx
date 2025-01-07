import React from 'react';

const Filters = () => {
  return (
    <div>
      <div className="bg-white border-2 border-[#00000026] w-[170px] absolute mt-4 rounded-[10px] lg:right-3 z-50 sm:right-[10%] ">
        <h2 className="font-normal sm:text-sm md:text-base text-black py-4 px-5 hover:bg-[#eee]">
          Duration
        </h2>
        <h2 className="font-normal sm:text-sm  md:text-base text-black opacity-60 py-4 px-5 hover:bg-[#eee]">
          Service Type
        </h2>
        <h2 className="font-normal sm:text-sm  md:text-base  text-black opacity-60 py-4 px-5 hover:bg-[#eee]">
          Complaint Status
        </h2>
      </div>
    </div>
  );
};

export default Filters;
