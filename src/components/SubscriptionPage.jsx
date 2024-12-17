import React from "react";
import CustomerTable from "./CustomerTable";

const SubscriptionPage = () => {
  return (
    <div className="w-full min-h-screen p-[15px]">
      <div className="bg-[#F7F7F7] p-5 rounded-lg shadow-md mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[28px] font-medium mb-1.5">Subscription</h1>
            <p className="text-base font-normal">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>
          <button className="bg-[#0832DE] font-normal text-base text-white py-3 px-[15px] rounded-[10px] mt-3 float-right">
            <span className="me-3">+</span> Edit Subscription
          </button>
        </div>

        <div className="bg-white p-[15px] rounded-[10px] mt-5 inline-block w-[242px]">
          <h2 className="font-medium text-[18px] mb-[15px]">Subscription</h2>
          <div className="border-t border-dashed border-[#00000066]"></div>

          <div className="flex mt-[15px]">
            <p className="font-medium text-base w-[68px]">Duration:</p>
            <p className="font-normal text-base text-[#000000B2] ms-[50px]">
              Annual
            </p>
          </div>
          <div className="flex mt-[15px]">
            <p className="font-medium text-base w-[68px]">Price:</p>
            <p className="font-normal text-base text-[#000000B2] ms-[50px]">
              ₹199
            </p>
          </div>
        </div>
      </div>

      <CustomerTable />
    </div>
  );
};

export default SubscriptionPage;
