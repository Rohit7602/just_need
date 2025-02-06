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
import { useServiceContext } from "../../store/serviceContext";

function Services() {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [disabledCards, setDisabledCards] = useState([]);
  const [showNewServicePopUp, setShowNewServicePopUp] = useState(false);
  const [showEnablePopup, setShowEnablePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const { categories } = useServiceContext();
  console.log(categories);

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

  // Filter servicedata based on search query
  const filteredCategoriesData = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
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

      <div className="grid gap-4 mt-[16px] grid-cols-1 sm:grid -cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredCategoriesData.map((items, index) => (
          <div
            key={index}
            className="relative z-[20] hover:bg-[#0832DE] hover:text-white cursor-pointer border-[#0000001A] rounded-[10px] p-[20px] border-[1px] bg-[white] group duration-300"
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
                <p className="p-1 border border-transparent">
                  {items.categoryName}
                </p>
              )}
              <div className="flex items-center">
                {editIndex !== index ? (
                  <>
                    {!disabledCards.includes(index) ? (
                      <div
                        onClick={() => handleEditClick(index, items.data)}
                        className={`cursor-pointer ${
                          disabledCards.includes(index)
                            ? "opacity-100"
                            : "opacity-100"
                        }`}
                      >
                        <Editicon disabledCards={disabledCards} index={index} />
                      </div>
                    ) : null}
                    <div
                      className="ms-[20px] cursor-pointer"
                      onClick={() =>
                        disabledCards.includes(index)
                          ? handleEnableClick(index)
                          : handleDisableClick(index)
                      }
                    >
                      {disabledCards.includes(index) ? (
                        <span className="text-xs font-normal text-[#0DA800]">
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
            <div className="border-t border-dashed my-[16px]"></div>
            <div className="flex -mx-3 items-center flex-wrap justify-between">
              {items.subcategories.map((item, index) => {
                return (
                  <div className="w-6/12 px-3" key={index}>
                    {index < 5 && (
                      <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                        {index + 1}. {item.subCategoryName}
                      </p>
                    )}
                    {index === 5 && items.subcategories.length > 5 && (
                      <p
                        onClick={() =>
                          !disabledCards.includes(index) &&
                          handleItemClick(items.subcategories)
                        }
                        className={`font-normal text-[12px] ${
                          disabledCards.includes(index) ? "" : "cursor-pointer"
                        }`}
                      >
                        +{items.subcategories.length - 5} more
                      </p>
                    )}
                  </div>
                );
              })}
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
