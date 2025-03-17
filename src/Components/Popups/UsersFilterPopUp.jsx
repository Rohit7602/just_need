/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

function UsersFilterPopUp({ handleFilterPopupClose }) {
  return (
    <>
      <div
        onClick={handleFilterPopupClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 w-72 h-72 m-auto">
        <div className="bg-white p-[15px] rounded-lg shadow-lg w-full h-full ">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium">Type</h2>
            <button
              onClick={handleFilterPopupClose}
              className="mb-5"
              aria-label="Close"
            >
              &#10005;
            </button>
          </div>

          <div className="border-t border-dashed mt-2.5 border-[#00000066]"></div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mt-[15px]">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-black rounded cursor-pointer "
              />
              <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                Customer
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-black rounded cursor-pointer "
              />
              <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                Provider
              </label>
            </div>

            <h2 className="text-base font-medium mt-[15px]">Status</h2>
            <div className="border-t border-dashed mt-2.5 border-[#00000066]"></div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-black rounded cursor-pointer "
              />
              <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                Ongoing Subscription
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-5 w-5 border-2 border-black rounded cursor-pointer "
              />
              <label className="text-sm font-normal cursor-pointer opacity-[80%]">
                Ended Subscription
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersFilterPopUp;
