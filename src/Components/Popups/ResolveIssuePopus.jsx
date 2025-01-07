import React from 'react';

const ResolveIssuePopus = () => {
  return (
    <div>
      <div>
        <div className="bg-white border-2 border-[#00000026] w-[120px] absolute mt-4 rounded-[10px] lg:right-3 z-50 sm:right-[10%] ">
          <h2 className="font-normal sm:text-sm md:text-base text-black py-[14px] px-5 hover:bg-[#eee]">
            Resolved
          </h2>

          <h2 className="font-normal sm:text-sm  md:text-base text-black opacity-60 py-[14px] px-5 hover:bg-[#eee]">
            Processing
          </h2>
          <h2 className="font-normal sm:text-sm  md:text-base  text-black opacity-60 py-[14px] px-5 hover:bg-[#eee]">
            Invalid
          </h2>
          <h2 className="font-normal sm:text-sm  md:text-base  text-black opacity-60 py-[14px] px-5 hover:bg-[#eee]">
            Withdrawn
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ResolveIssuePopus;
