import React, { useState } from "react";
import {
  Crossicon,
  EditiconActionPopUp,
  Greenicon,
  Redcrossicon,
} from "../../assets/icon/Icons";

function Actions({ selectedItem, handleOverlayClick }) {
  const [showRedIcons, setShowRedIcons] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track which item is being edited
  const [inputValues, setInputValues] = useState({}); // Store input values for each item

  // Handle edit icon click
  const handleEditClick = (index, value) => {
    if (editingIndex === index) {
      // If already editing, stop editing
      setEditingIndex(null);
    } else {
      // Start editing and set the input value
      setEditingIndex(index);
      setInputValues((prev) => ({
        ...prev,
        [index]: value, // Store the value for the specific index
      }));
    }
  };

  // Handle input change
  const handleInputChange = (index, event) => {
    setInputValues((prev) => ({
      ...prev,
      [index]: event.target.value, // Update the value for the specific index
    }));
  };

  // Handle save click
  const handleSaveClick = () => {
    console.log("Updated Values:", inputValues);
    setEditingIndex(null); // Stop editing
  };

  // Handle delete click
  const handleDeleteClick = () => {
    setShowRedIcons(true);
  };

  // Handle cancel click
  const handleCancelClick = () => {
    setShowRedIcons(false);
  };

  let continuousIndex = 1;

  return (
    <div>
      <div className="w-[700px] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-4 rounded-lg shadow-lg">
        <div className="text-end">
          <button
            onClick={handleOverlayClick}
            className="mb-5"
            aria-label="Close"
          >
            &#10005;
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium">Profession</p>
          {showRedIcons ? (
            <div
              className="rounded-[10px] bg-[#0832DE] text-white px-[16px] py-2.5 h-[42px] font-normal text-[16px] cursor-pointer"
              onClick={handleCancelClick}
            >
              Cancel
            </div>
          ) : (
            <div
              className="bg-[#0832DE] py-2.5 h-[42px]  px-[15px] flex items-center rounded-[10px] cursor-pointer gap-3"
              onClick={handleDeleteClick}
            >
              <Crossicon className="bg-white" />
              <p className="font-normal text-white text-[16px] leading-[24px]">
                Delete
              </p>
            </div>
          )}
        </div>

        <div className="flex -mx-3 flex-row flex-wrap justify-between">
          {selectedItem.map((item, index) => (
            <div key={index} className="w-4/12 px-3">
              <div className="flex items-center mt-[30px]">
                <p className="me-[12px] font-normal text-[16px]">
                  {continuousIndex++}.
                </p>
                {editingIndex === index ? ( // Show input field if editing
                  <input
                    type="text"
                    value={inputValues[index] || item.subCategoryName} // Pre-fill with selected item's value
                    onChange={(e) => handleInputChange(index, e)} // Handle input change
                    className="font-normal text-[16px] me-[12px] cursor-pointer border border-[#000] rounded-[10px] py-[5px] px-[10px] w-[120px]"
                  />
                ) : (
                  <p className="font-normal text-[16px] me-[12px] border border-transparent py-[5px] w-[120px]">
                    {item.subCategoryName}
                  </p>
                )}
                {showRedIcons ? (
                  <button>
                    <Redcrossicon />
                  </button>
                ) : (
                  <span
                    onClick={() =>
                      handleEditClick(index , item.subCategoryName)
                    }
                  >
                    {editingIndex === index ? ( // Show green icon if editing
                      <Greenicon />
                    ) : (
                      <EditiconActionPopUp />
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveClick}
          className="rounded-[10px] bg-[#0832DE] text-white w-full py-2.5 h-[42px] mt-[16px] font-normal text-[16px]"
        >
          Update status
        </button>
      </div>
    </div>
  );
}

export default Actions;