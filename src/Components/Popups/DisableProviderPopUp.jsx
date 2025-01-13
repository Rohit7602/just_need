import React, { useState } from 'react'

function DisableProviderPopUp({handlePopupDisable}) {
    const [popUpData, setPopUpData] = useState({
        status: "",
        reason: "",
      });
     const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPopUpData((prev) => ({ ...prev, [name]: value }));
      };
      const handleUpdate = () => {
        console.log(popUpData);
      };
  return (
    <>
    <div
      onClick={() => handlePopupDisable()}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
    ></div>
    <div className="fixed inset-0 flex items-center justify-center z-50 h-[368px] w-[448px] m-auto">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <button
          onClick={()=>handlePopupDisable()}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Close"
        >
          &#10005;
        </button>

        <div className="mb-6">
          <label
            htmlFor="status"
            className="block text-base font-normal text-gray-700 mb-2.5"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            onChange={handleOnChange}
            value={popUpData.status}
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Block">Block</option>
            <option value="Unblock ">Unblock</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="reason"
            className="block font-normal text-base mb-2.5"
          >
            Reason
          </label>
          <textarea
            name="reason"
            onChange={handleOnChange}
            value={popUpData.reason}
            placeholder="type here.."
            className="w-full h-28 px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-[#0832DE] text-base text-white font-medium py-2.5 h-[42px] rounded-[10px]"
        >
          Update Status
        </button>
      </div>
    </div>
  </>
  )
}

export default DisableProviderPopUp