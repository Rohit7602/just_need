import React from 'react';

const Filters = () => {
  return (
    <div>
      <div className="bg-white border-2 border-[#00000026] w-[140px] absolute mt-4 rounded-[10px] right-3 z-50 ">
        <h2 className="font-normal text-base text-black py-4 px-5 hover:bg-[#eee]">All</h2>
        <h2 className="font-normal text-base text-black opacity-60 py-4 px-5 hover:bg-[#eee]">
          Customer
        </h2>
        <h2 className="font-normal text-base text-black opacity-60 py-4 px-5 hover:bg-[#eee]">
          Provider
        </h2>
      </div>
    </div>
  );
};

export default Filters;
