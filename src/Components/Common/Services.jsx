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
      <div className="xl:flex-row flex-col flex xl:items-center justify-end">
        <div className="flex items-center mt-[20px] xl:mt-[0px]">
          <div className="bg-[#F1F1F1] w-[337px] px-[16px] py-2.5 h-[42px] rounded-[10px]">
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
            className="whitespace-nowrap cursor-pointer bg-[#0832DE] flex items-center h-[42px] px-[16px] py-2.5 rounded-[10px] ms-[20px]"
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
          <div key={index} className={`w-full md:w-1/2 xl:w-1/3 px-2 mt-4`}>
            <div
              className={`relative z-[20] cursor-pointer h-full border-[#0000001A] rounded-[10px] p-[20px]  border-[1px] bg-[white] group 
            duration-300 ${
              disabledCards.includes(index)
                ? " text-[#0000002A] border-[#0000001A]"
                : "hover:bg-[#6C4DEF] hover:text-white hover:shadow-lg"
            }`}
            >
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
                      {!disabledCards.includes(index) ? (
                        <div
                          className={`${
                            disabledCards.includes(index)
                              ? " opacity-20"
                              : " opacity-100"
                          }`}
                          onClick={() => handleEditClick(index, items.data)}
                        >
                          <Editicon
                            disabledCards={disabledCards}
                            index={index}
                          />
                        </div>
                      ) : (
                        <div
                          className={`${
                            disabledCards.includes(index)
                              ? " opacity-20"
                              : " opacity-100"
                          }`}
                        >
                          <Editicon
                            disabledCards={disabledCards}
                            index={index}
                          />
                        </div>
                      )}
                      <div
                        className="ms-[20px] cursor-pointer opacity-100"
                        onClick={() =>
                          disabledCards.includes(index)
                            ? handleEnableClick(index)
                            : handleDisableClick(index)
                        }
                      >
                        {disabledCards.includes(index) ? (
                          <span className="text-xs font-normal text-[#0DA800] !opacity-100">
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
              <div
                className={`border-t border-dashed  ${
                  disabledCards.includes(index)
                    ? "border-[#000000Ai]"
                    : "border-[#00000066]"
                } my-[16px] ${
                  disabledCards.includes(index)
                    ? null
                    : "group-hover:border-[white]"
                }`}
              ></div>
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
                  {disabledCards.includes(index) ? (
                    <p className="font-normal text-[12px]">{items.val7}</p>
                  ) : (
                    <p
                      className="font-normal text-[12px]"
                      onClick={() => handleItemClick(items)}
                    >
                      {items.val7}
                    </p>
                  )}
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
