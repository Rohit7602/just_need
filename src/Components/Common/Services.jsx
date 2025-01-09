import React, { useState } from "react";
import {
  Editicon,
  Greenicon,
  Plusicon,
  DisableRedicon,
  Searchicon,
} from "../../assets/icon/Icons";
import { servicedata } from "../../Components/Common/Helper";
import Actions from "../Popups/Actions";
import AddNewServicePopUp from "../Popups/AddNewServicePopUp";
import EnablePopUp from "../Popups/EnablePopUp";
import DisablePopUp from "../Popups/DisablePopUp";

function Services() {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [disabledCards, setDisabledCards] = useState([]); // State to track disabled cards
  const [showNewServicePopUp, setShowNewServicePopUp] = useState(false);
  const [showEnablePopup, setShowEnablePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);

  function handleNewServicePopUp() {
    setShowNewServicePopUp(!showNewServicePopUp);
  }

  const handleEditClick = (index, data) => {
    setEditIndex(index);
    setEditData(data);
  };

  const handleInputChange = (e) => {
    setEditData(e.target.value);
  };

  const handleBlur = (index) => {
    if (editData.trim() !== "") {
      servicedata[index].data = editData;
    }
    setEditIndex(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleOverlayClick = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const toggleDisableCard = (index, action) => {
    if (action === "confirm") {
      setDisabledCards((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    }
    setShowEnablePopup(false);
    setShowDisablePopup(false);
    setCurrentCardIndex(null);
  };

  const handleDisableClick = (index) => {
    setCurrentCardIndex(index);
    setShowDisablePopup(true);
  };

  const handleEnableClick = (index) => {
    setCurrentCardIndex(index);
    setShowEnablePopup(true);
  };

  return (
    <div className="p-[14px] rounded-[10px] shadow-md bg-white">
      <div className="xl:flex-row flex-col flex xl:items-center justify-between">
        <div>
          <p className="font-medium text-[28px]">Services</p>
          <p className="text-[16px] font-normal opacity-[70%] mt-1">
            Plan, prioritize, and accomplish your tasks with ease.
          </p>
        </div>
        <div className="flex items-center mt-[20px] xl:mt-[0px]">
          <div className="bg-[#F1F1F1] w-[337px] p-[16px] rounded-[10px]">
            <div className="flex items-center">
              <Searchicon />
              <input
                className="text-[16px] font-normal outline-none ms-[10px] bg-transparent"
                type="text"
                placeholder="Search Task"
              />
            </div>
          </div>
          <div
            onClick={() => handleNewServicePopUp()}
            className="whitespace-nowrap cursor-pointer bg-[#0832DE] flex items-center px-[16px] py-[12px] rounded-[10px] ms-[20px]"
          >
            <Plusicon />
            <p className="font-normal text-[16px] text-white ms-[12px]">
              Add New Service
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mt-[16px] -mx-2">
        {servicedata.map((items, index) => (
          <div
            key={index}
            className={`w-full md:w-1/2 xl:w-1/3 px-2 mt-4 ${
              disabledCards.includes(index) ? "opacity-50" : "opacity-100"
            }`}
          >
            <div className="relative z-[20] cursor-pointer h-full border-[#0000001A] rounded-[10px] p-[20px] hover:shadow-lg border-[1px] bg-[white] hover:bg-[#6C4DEF] hover:text-white group duration-300">
              <div className="flex items-center justify-between">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editData}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur(index)}
                    className="w-full bg-transparent border border-white focus:outline-none p-1 rounded-[10px]"
                    autoFocus
                  />
                ) : (
                  <p className="p-1 border border-transparent">{items.data}</p>
                )}
                <div className="flex items-center">
                  {editIndex !== index ? (
                    <>
                      <div onClick={() => handleEditClick(index, items.data)}>
                        <Editicon />
                      </div>
                      <div
                        className="ms-[20px] cursor-pointer"
                        onClick={() =>
                          disabledCards.includes(index)
                            ? handleEnableClick(index)
                            : handleDisableClick(index)
                        }
                      >
                        {disabledCards.includes(index) ? (
                          <span className="text-xs font-normal text-[#0DA800] opacity-100">
                            Enable
                          </span>
                        ) : (
                          <DisableRedicon />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="ms-[20px]">
                      <Greenicon />
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-dashed border-[#00000066] my-[16px] group-hover:border-[white]"></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                    1. {items.val2}
                  </p>
                  <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                    2. {items.val3}
                  </p>
                  <p className="opacity-[60%] font-normal text-[12px]">
                    3. {items.val4}
                  </p>
                </div>
                <div>
                  <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                    4. {items.val5}
                  </p>
                  <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                    5. {items.val6}
                  </p>
                  <p
                    className="font-normal text-[12px]"
                    onClick={() => handleItemClick(items)}
                  >
                    {items.val7}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Actions
              selectedItem={selectedItem}
              handleOverlayClick={handleOverlayClick}
            />
          </div>
        </div>
      )}
      {showNewServicePopUp && (
        <AddNewServicePopUp handleNewServicePopUp={handleNewServicePopUp} />
      )}
      {showEnablePopup && (
        <EnablePopUp
          onConfirm={() => toggleDisableCard(currentCardIndex, "confirm")}
          onCancel={() => setShowEnablePopup(false)}
        />
      )}

      {showDisablePopup && (
        <DisablePopUp
          onConfirm={() => toggleDisableCard(currentCardIndex, "confirm")}
          onCancel={() => setShowDisablePopup(false)}
        />
      )}
    </div>
  );
}

export default Services;
