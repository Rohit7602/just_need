import React, { useState } from "react";
import { Crossicon, Editicon, Redcrossicon } from "../Common/Icons";
import { Actiondata } from "../Common/Helper";

function Actions() {
  const [showRedIcons, setShowRedIcons] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the item being edited
  const [editField, setEditField] = useState(null); // Track the field being edited (val1, val2, etc.)
  const [inputValues, setInputValues] = useState({}); // Store the input values for each item and field

  // Handle click to toggle editing a specific field
  const handleEditClick = (index, field, value) => {
    if (editingIndex === index && editField === field) {
      // If the same field is clicked again, reset the editing state
      setEditingIndex(null);
      setEditField(null);
    } else {
      // Otherwise, set the new field as being edited
      setEditingIndex(index);
      setEditField(field);
      setInputValues((prev) => ({
        ...prev,
        [`${index}-${field}`]: value,
      })); // Set the initial value to be edited
    }
  };

  // Handle input change
  const handleInputChange = (index, field, event) => {
    setInputValues((prev) => ({
      ...prev,
      [`${index}-${field}`]: event.target.value,
    })); // Update input value
  };

  // Handle save changes
  const handleSaveClick = () => {
    console.log("Updated Values:", inputValues); // For debugging
    setEditingIndex(null); // Close the editing mode
    setEditField(null);
  };

  // Handle delete button click
  const handleDeleteClick = () => {
    setShowRedIcons(true); // Show the cancel button
  };

  // Handle cancel button click
  const handleCancelClick = () => {
    setShowRedIcons(false); // Show the delete button
  };

  return (
    <div>
      <div className="w-[700px] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-4 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-medium">Profession</p>
          {showRedIcons ? (
            <div
              className="rounded-[10px] bg-[#0832DE] text-white px-[16px] py-3 font-normal text-[16px] cursor-pointer"
              onClick={handleCancelClick}
            >
              Cancel
            </div>
          ) : (
            <div
              className="bg-[#F1F1F1] py-[12px] ps-[6px] pe-3 flex items-center rounded-[10px] cursor-pointer opacity-[80%]"
              onClick={handleDeleteClick}
            >
              <div className="mx-3">
                <Crossicon />
              </div>
              <p className="font-normal text-[16px]">Delete</p>
            </div>
          )}
        </div>

        {/* Data Section */}
        <div className="flex flex-row justify-between mt-[30px]">
          {Actiondata.map((item, index) => (
            <div key={index} className="flex flex-col">
              {["val1", "val2", "val3", "val4", "val5"].map((field, i) => (
                <div key={i} className="flex items-center mt-[30px]">
                  {editingIndex === index && editField === field ? (
                    <input
                      type="text"
                      value={inputValues[`${index}-${field}`] || item[field]}
                      onChange={(e) => handleInputChange(index, field, e)}
                      className="font-normal text-[16px] me-[12px] cursor-pointer border border-[#000] rounded-[10px] py-[5px] px-[10px] w-[150px]"
                    />
                  ) : (
                    <p className="font-normal text-[16px] me-[12px] cursor-pointer border border-transparent py-[5px] ">
                      {item[field]}
                    </p>
                  )}
                  {showRedIcons ? (
                    <span>
                      <Redcrossicon />
                    </span>
                  ) : (
                    <span
                      onClick={() => handleEditClick(index, field, item[field])}
                    >
                      <Editicon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveClick}
          className="rounded-[10px] bg-[#0832DE] text-white w-full py-3 mt-[16px] font-normal text-[16px]"
        >
          Update status
        </button>
      </div>
    </div>
  );
}

export default Actions;






























































































