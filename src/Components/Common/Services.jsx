import React, { useEffect, useState } from "react";
import {
  Editicon,
  Greenicon,
  Plusicon,
  DisableRedicon,
  Searchicon,
  ArowImage,
} from "../../assets/icon/Icons";
import { servicedata } from "../../Components/Common/Helper";
import Actions from "../Popups/Actions";
import AddNewServicePopUp from "../Popups/AddNewServicePopUp";
import EnablePopUp from "../Popups/EnablePopUp";
import DisablePopUp from "../Popups/DisablePopUp";
import overlay from "../../../public/overlay.png"
import { useServiceContext } from "../../store/ServiceContext";

function Services() {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNewServicePopUp, setShowNewServicePopUp] = useState(false);
  const [showEnablePopup, setShowEnablePopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!optionsVisible);
  };


  const {
    categories,
    updateCategoryName,
    toggleCategoryStatus,
    getCategoriesWithSubcategories,
  } = useServiceContext();

  // console.log(categories,"data will be come here")

  useEffect(() => {
    getCategoriesWithSubcategories();
  }, []);

  const handleNewServicePopUp = () => {
    setShowNewServicePopUp(!showNewServicePopUp);
  };

  const handleEditClick = (index, categoryName) => {
    setEditIndex(index);
    setEditData(categoryName);
  };

  const handleInputChange = (e) => {
    setEditData(e.target.value);
  };

  const handleSaveEdit = (categoryId) => {
    if (editData.trim() !== "") {
      updateCategoryName(categoryId, editData);
      setEditIndex(null);
    }
  };

  const handleItemClick = (item) => {
    console.log(item, "item");
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleOverlayClick = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const handleDisableClick = (index) => {
    setCurrentCardIndex(index);
    setShowDisablePopup(true);
  };

  const handleEnableClick = (index) => {
    setCurrentCardIndex(index);
    setShowEnablePopup(true);
  };

  const toggleDisableCard = (index, action) => {
    if (action === "confirm") {
      const categoryId = categories[index]?.id;
      if (categoryId) {
        toggleCategoryStatus(categoryId, !categories[index].isActive);
      }
    }
    setShowEnablePopup(false);
    setShowDisablePopup(false);
    setCurrentCardIndex(null);
  };

  const filteredCategoriesData = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-[14px] rounded-[10px] shadow-md bg-white">
      <div className="xl:flex-row flex-col flex xl:items-center justify-between">
        <h1 className="font-medium text-[22px]">Education</h1>
        <div className="flex items-center mt-[20px] xl:mt-[0px]">
          <div className="bg-[#F1F1F1] w-[337px] px-[16px] py-2.5 h-[42px] rounded-[10px]">
            <div className="flex items-center">
              <Searchicon />
              <input
                className="text-[16px] font-normal outline-none ms-[10px] bg-transparent"
                type="text"
                placeholder="Search Task"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div
            onClick={handleNewServicePopUp}
            className="whitespace-nowrap cursor-pointer bg-[#0832DE] flex items-center h-[42px] px-[16px] py-2.5 rounded-[10px] ms-[20px]"
          >
            <Plusicon />
            <p className="font-normal text-[16px] text-white ms-[12px]">
              Add New Service
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-[16px] grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 flex-wrap">

        {/* {filteredCategoriesData.map((items, index) => (
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
                  className="w-full bg-transparent border border-black me-2 focus:outline-none p-1 rounded-[10px]"
                  autoFocus
                />
              ) : (
                <p className="p-1 border border-transparent">
                  {items.categoryName}
                </p>
              )}
              <div className="flex items-center">
                {editIndex === index ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSaveEdit(items.id)}
                  >
                    <Greenicon />
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => handleEditClick(index, items.categoryName)}
                      className="cursor-pointer"
                    >
                      <Editicon />
                    </div>
                    <div
                      className="ms-[20px] cursor-pointer"
                      onClick={() =>
                        items.isActive
                          ? handleDisableClick(index)
                          : handleEnableClick(index)
                      }
                    >
                      {items.isActive ? (
                        <DisableRedicon />
                      ) : (
                        <span className="text-xs font-normal text-[#0DA800]">
                          Enable
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="border-t border-dashed my-[16px]"></div>
            <div
              className="flex -mx-3 items-center flex-wrap justify-between"
              onClick={() => handleItemClick(items.subcategory)}
            >
              {items.subcategory.map((item, index) => (
                <div className="w-6/12 px-3" key={index}>
                  {index < 5 && (
                    <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                      {index + 1}. {item.categoryName}
                    </p>
                  )}
                  {index === 5 && items.subcategories.length > 5 && (
                    <p className="font-normal text-[12px] cursor-pointer">
                      +{items.subcategories.length - 5} more
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))} */}

      </div>

      <div className=" mt-8 relative">
        <div className="flex items-center justify-between gap-4 cursor-pointer overflow-x-auto whitespace-nowrap scrollbar-hide ">

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "profession" ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActiveTab("profession")}
          >
            <p className="font-normal text-base transition mx-[5px]">Profession</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />
            </div>
          </div>

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "education" ? "border-blue-500" : "border-transparent "
              }`}
            onClick={() => setActiveTab("education")}
          >
            <p className="font-normal text-base transition mx-[5px]">Education</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />
            </div>
          </div>

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "foodStay" ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActiveTab("foodStay")}
          >
            <p className="font-normal text-base transition mx-[5px]">Food & Stay</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />
            </div>
          </div>

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "vehicle" ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActiveTab("vehicle")}
          >
            <p className="font-normal text-base transition mx-[5px]">Vehicle Booking & Ride</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />
            </div>
          </div>

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "job" ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActiveTab("job")}
          >
            <p className="font-normal text-base transition mx-[5px]">Job/Work</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />

            </div>
          </div>

          <div
            className={`flex items-center pb-2 border-b-2 px-5 ${activeTab === "job" ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActiveTab("job")}
          >
            <p className="font-normal text-base transition mx-[5px]">Job/Work</p>
            <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">32</span>
            <div className="border-r px-2">
              <Editicon />
            </div>
            <div className="ms-2">
              <DisableRedicon />

            </div>
          </div>

          <div className="absolute -top-[10%] right-[0%]">
            <img
              className=" w-[300px] h-[60px] z-50"
              src={overlay}
              alt="#"
            />
          </div>

          {/*  Button */}
          <button
            className="absolute right-[1%] top-[3%] z-50 text-[#6C4DEF] font-normal text-base"
            onClick={() => setIsVisible(!isVisible)}
          >
            View Blocked list
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-between gap-[18px] mt-6 flex-wrap whitespace-nowrap cursor-pointer">
        
        <div className="">
          <div className="group hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] border border-[#0000001A] p-5 rounded-[10px] h-full transition">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] mx-[5px] transition group-hover:text-[#6C4DEF]">
                Profession
              </p>
              <div className="flex gap-2">
                <div className="border-r px-2">
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition">Denting & Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">AC Service</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Parts Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Tyre Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] border border-[#0000001A] p-5 rounded-[10px] h-full transition">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">AC Service</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition">Parts Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Tyre Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Denting & Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Oil Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] border border-[#0000001A] p-5 rounded-[10px] h-full transition">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Denting & Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition">Oil Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Tyre Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Parts Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">AC Service</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] border border-[#0000001A] p-5 rounded-[10px] h-full transition">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">AC Service</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition">Oil Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Denting & Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Tyre Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Parts Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] border border-[#0000001A] p-5 rounded-[10px] h-full transition">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Denting & Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition">AC Service</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Parts Repair</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Oil Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] hover:text-[#6C4DEF] transition-all  border border-[#0000001A] p-5 rounded-[10px] h-full">
            <div className="flex items-center justify-between">
              <p className="font-normal text-sm text-[#00000099] transition mx-[5px]">Tyre Change</p>
              <div className="flex gap-2">
                <div className="border-r px-2" >
                  <Editicon />
                </div>
                <div>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="inline-block mt-8">
        <div
          onClick={handleNewServicePopUp}
          className="whitespace-nowrap cursor-pointer bg-[#0832DE] flex items-center h-[42px] px-[16px] py-2.5 rounded-[10px]"
        >
          <Plusicon />
          <p className="font-normal text-[16px] text-white ms-[12px]">
            Add Sub Category
          </p>
        </div>
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


      {/* Popup */}
      <div className="flex justify-center items-center">
        {isVisible && (
          <div onClick={() => setIsVisible(false)} className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div onClick={(e) => e.stopPropagation()} className="mt-2 w-[401px] bg-white shadow-lg rounded-lg">
              <div className="p-4 bg-[#EEEEEE] flex justify-between items-center rounded-t-lg">
                <span className="font-normal text-base">Blocked Services</span>

                <button
                  onClick={toggleOptionsVisibility}
                  className="focus:outline-none me-2.5 transition-transform duration-300"
                  style={{ transform: optionsVisible ? "rotate(0deg)" : "rotate(180deg)" }}
                >
                  <ArowImage />
                </button>
              </div>

              {optionsVisible && (
                <div className="py-2.5 px-5">
                  {["Profession", "Profession", "Profession", "Profession"].map(
                    (item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div className="flex items-center">
                          <label className="custom-radio">
                            <input type="radio" name="blockedService" />
                          </label>
                          <span className="text-[#999999] font-normal text-base px-2.5">
                            {item}
                          </span>
                        </div>
                        <div>
                          <DisableRedicon />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
