import React, { useEffect, useState } from "react";
import {
  Editicon,
  Greenicon,
  Plusicon,
  DisableRedicon,
  Searchicon,
  ArowImage,
} from "../../assets/icon/Icons";
import Actions from "../Popups/Actions";
import AddNewServicePopUp from "../Popups/AddNewServicePopUp";
import DisablePopUp from "../Popups/DisablePopUp";
import { useServiceContext } from "../../store/ServiceContext";
import AddSubCategoryPopUp from "../Popups/SubcategoryPopup";
import { AiOutlineClose } from "react-icons/ai";

function Services() {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNewServicePopUp, setShowNewServicePopUp] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [subcategorypopup, setSubCategoryPopup] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [catEditIndex, setCatEditIndex] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);

  const {
    categories,
    updateSubcategoryName,
    toggleSubcategoryStatus,
    getCategoriesWithSubcategories,
    updateCategoryName,
    loading,
  } = useServiceContext();

  useEffect(() => {
    getCategoriesWithSubcategories().then(() => {
      if (categories.length > 0) {
        setActiveTab(0);
        setSelectedSubcategories(categories[0].subcategory);
      }
    });
  }, [categories.length]);

  const toggle = () => {
    setShowForm((prev) => !prev);
    if (!showForm) {
      setCategoryName("");
      setEditingCategoryId(null);
      setEditingSubcategoryId(null);
    }
  };

  const handleNewServicePopUp = () => {
    setShowNewServicePopUp(!showNewServicePopUp);
  };

  const handleSubcategory = () => {
    setEditingSubcategoryId(null); // Reset editingSubcategoryId when adding a new subcategory
    setSubCategoryPopup(!subcategorypopup);
  };

  const handleEditClick = (index, categoryName) => {
    setEditIndex(index);
    setEditData(categoryName);
  };

  const handleInputChange = (e) => {
    setEditData(e.target.value);
  };

  const handleSaveEdit = (subcategoryId) => {
    if (editData.trim() !== "") {
      updateSubcategoryName(subcategoryId, editData);
      setEditIndex(null);
      setEditData("");
    }
  };

  const handleCategoryInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSaveEditPopup = async () => {
    if (categoryName.trim() !== "") {
      if (editingCategoryId) {
        const success = await updateCategoryName(
          editingCategoryId,
          categoryName
        );
        if (success) {
          toggle();
        } else {
          console.error("Failed to update category name");
        }
      } else if (editingSubcategoryId) {
        const success = await updateSubcategoryName(
          editingSubcategoryId,
          categoryName
        );
        if (success) {
          toggle();
        } else {
          console.error("Failed to update subcategory name");
        }
      }
    }
  };

  const handleOverlayClick = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  const toggleDisableCard = (subcategoryId, newStatus, action) => {
    if (action === "confirm") {
      toggleSubcategoryStatus(subcategoryId, newStatus);
    }
    setShowDisablePopup(false);
    setCurrentCardIndex(null);
  };

  const filteredCategoriesData = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (index, subcategories) => {
    setActiveTab(index);
    setSelectedSubcategories(subcategories);
    setSelectedCategoryId(categories[index].id);
  };

  const handleCategoryEdit = (categoryId, currentName, e) => {
    e.stopPropagation();
    setEditingCategoryId(categoryId);
    setEditingSubcategoryId(null);
    setCategoryName(currentName);
    setShowForm(true);
  };

  const handleSubcategoryEdit = (subcategoryId, currentName, e) => {
    e.stopPropagation();
    setSubCategoryPopup(true); // Open AddSubCategoryPopUp instead
    setEditingSubcategoryId(subcategoryId); // Track the subcategory being edited
  };

  const handleDisableClick = (subcategoryId) => {
    setCurrentCardIndex(subcategoryId);
    setShowDisablePopup(true);
  };

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!optionsVisible);
  };

  return (
    <div className="p-[14px] rounded-[10px] shadow-md bg-white">
      {loading && <p>Loading...</p>}
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

      <div className="mt-8 relative">
        <div className="flex whitespace-nowrap">
          <div className="gap-4 flex items-center cursor-pointer overflow-x-auto scrollbar-hide">
            {filteredCategoriesData.map((items, index) => (
              <div
                key={index}
                className={`flex items-center pb-2 border-b-2 px-5 ${
                  activeTab === index
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => handleCategoryClick(index, items.subcategory)}
              >
                <p className="font-normal text-base transition mx-[5px]">
                  {items.categoryName}
                </p>
                <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">
                  {items.subcategory.length}
                </span>
                <div className="flex gap-2">
                  <div
                    onClick={(e) =>
                      handleCategoryEdit(items.id, items.categoryName, e)
                    }
                  >
                    <Editicon />
                  </div>
                  <div className="ms-2">
                    <DisableRedicon />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border-b border-[rgb(128,128,128)]">
            <button
              className="text-[#6C4DEF] font-normal text-base"
              onClick={() => setIsVisible(!isVisible)}
            >
              View Blocked list
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-between gap-[18px] mt-6 flex-wrap whitespace-nowrap cursor-pointer">
        {selectedSubcategories.map((sub, index) => (
          <div
            key={index}
            className="group hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] border border-[#0000001A] p-5 rounded-[10px] h-full transition"
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
                <p className="font-normal text-sm text-[#00000099] mx-[5px] transition group-hover:text-[#6C4DEF]">
                  {sub.categoryName}
                </p>
              )}
              <div className="flex gap-4">
                <div
                  onClick={(e) =>
                    handleSubcategoryEdit(sub.id, sub.categoryName, e)
                  }
                >
                  <Editicon />
                </div>
                <div onClick={() => handleDisableClick(sub.id)}>
                  <DisableRedicon />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inline-block mt-8">
        <div
          onClick={handleSubcategory}
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
      {subcategorypopup && (
        <AddSubCategoryPopUp
          handleClose={handleSubcategory}
          selectedCategoryId={selectedCategoryId}
          isEditMode={!!editingSubcategoryId} // Enable edit mode if editingSubcategoryId is set
          initialData={
            editingSubcategoryId
              ? selectedSubcategories.find(
                  (sub) => sub.id === editingSubcategoryId
                )
              : null
          } // Pass the subcategory being edited
        />
      )}
      {showDisablePopup && (
        <DisablePopUp
          onConfirm={() =>
            toggleDisableCard(currentCardIndex, false, "confirm")
          }
          onCancel={() => setShowDisablePopup(false)}
        />
      )}

      <div className="flex justify-center items-center">
        {isVisible && (
          <div
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-2 w-[401px] bg-white shadow-lg rounded-lg"
            >
              <div className="p-4 bg-[#EEEEEE] flex justify-between items-center rounded-t-lg">
                <span className="font-normal text-base">Blocked Services</span>
                <button
                  onClick={toggleOptionsVisibility}
                  className="focus:outline-none me-1 transition-transform duration-300"
                  style={{
                    transform: optionsVisible
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <ArowImage />
                </button>
              </div>
              {optionsVisible && (
                <div className="py-2.5 px-5">
                  {["Profession", "Profession", "Profession", "Profession"].map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2"
                      >
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

        {showForm && (
          <div
            onClick={toggle}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
          >
            <div className="bg-white p-6 rounded-lg w-[649px] shadow-lg relative">
              <div className="flex justify-center items-center border-b pb-6">
                <h2 className="text-lg font-semibold">
                  {editingCategoryId ? "Edit Category" : "Edit Subcategory"}
                </h2>
                <button
                  onClick={toggle}
                  className="text-gray-600 hover:text-black absolute right-6 top-4"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              <div className="mt-6">
                <label className="block text-base font-normal text-[#000000]">
                  {editingCategoryId ? "Category Name" : "Subcategory Name"}
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={handleCategoryInputChange}
                  className="w-full mt-[10px] p-2 border rounded text-[#000000] focus:outline-none"
                  placeholder={
                    editingCategoryId
                      ? "Enter category name"
                      : "Enter subcategory name"
                  }
                />
              </div>
              <button
                onClick={handleSaveEditPopup}
                className="w-full bg-[#0832DE] font-normal text-base text-white mt-6 py-2 rounded-[10px]"
              >
                Save Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
