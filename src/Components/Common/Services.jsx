import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Editicon,
  Plusicon,
  DisableRedicon,
  Searchicon,
  ArowImage,
  EnableRedIcon,
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
  const [activeTab, setActiveTab] = useState(0);
  const [subcategoryPopup, setSubCategoryPopup] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const {
    categories = [],
    updateSubcategoryName,
    toggleSubcategoryStatus,
    getCategoriesWithSubcategories,
    updateCategoryName,
    addSubcategory,
    loading,
  } = useServiceContext();

  useEffect(() => {
    getCategoriesWithSubcategories().catch((error) => {
      console.error("Failed to fetch categories:", error);
      alert("Failed to load categories. Please refresh the page.");
    });
  }, [getCategoriesWithSubcategories]);

  useEffect(() => {
    if (
      categories.length > 0 &&
      selectedSubcategories.length === 0 &&
      !loading
    ) {
      setActiveTab(0);
      setSelectedSubcategories(categories[0]?.subcategory || []);
      setSelectedCategoryId(categories[0]?.id || null);
    }
  }, [categories, loading, selectedSubcategories]);

  const toggle = useCallback(() => {
    setShowForm((prev) => {
      if (!prev) {
        setCategoryName("");
        setEditingCategoryId(null);
        setEditingSubcategoryId(null);
      }
      return !prev;
    });
  }, []);

  const handleNewServicePopUp = useCallback(() => {
    setShowNewServicePopUp((prev) => !prev);
  }, []);

  const handleSubcategory = useCallback(() => {
    setSubCategoryPopup((prev) => !prev);
  }, []);

  const handleEditClick = useCallback((index, categoryName) => {
    setEditIndex(index);
    setEditData(categoryName || "");
  }, []);

  const handleInputChange = useCallback((e) => {
    setEditData(e.target.value);
  }, []);

  const handleSaveEdit = useCallback(
    (subcategoryId) => {
      if (editData.trim() !== "") {
        updateSubcategoryName(subcategoryId, editData)
          .then((success) => {
            if (success) {
              setEditIndex(null);
              setEditData("");
              setSelectedSubcategories((prev) =>
                prev.map((sub) =>
                  sub.id === subcategoryId
                    ? { ...sub, categoryName: editData }
                    : sub
                )
              );
            } else {
              alert("Failed to update subcategory.");
            }
          })
          .catch((error) => {
            console.error("Error updating subcategory:", error);
            alert("An error occurred while updating the subcategory.");
          });
      }
    },
    [editData, updateSubcategoryName]
  );

  const handleCategoryInputChange = useCallback((e) => {
    setCategoryName(e.target.value);
  }, []);

  const handleSaveEditPopup = useCallback(async () => {
    if (categoryName.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }
    try {
      if (editingCategoryId) {
        const success = await updateCategoryName(
          editingCategoryId,
          categoryName
        );
        if (success) {
          const updatedIndex = categories.findIndex(
            (cat) => cat.id === editingCategoryId
          );
          if (updatedIndex !== -1) {
            const updatedCategories = categories.map((cat, idx) =>
              idx === updatedIndex ? { ...cat, categoryName } : cat
            );
            setActiveTab(updatedIndex);
            setSelectedSubcategories(
              updatedCategories[updatedIndex]?.subcategory || []
            );
            setSelectedCategoryId(updatedCategories[updatedIndex]?.id || null);
          }
          toggle();
        } else {
          alert("Failed to update category.");
        }
      } else if (editingSubcategoryId) {
        const success = await updateSubcategoryName(
          editingSubcategoryId,
          categoryName
        );
        if (success) {
          setSelectedSubcategories((prev) =>
            prev.map((sub) =>
              sub.id === editingSubcategoryId ? { ...sub, categoryName } : sub
            )
          );
          toggle();
        } else {
          alert("Failed to update subcategory.");
        }
      }
    } catch (error) {
      console.error("Error in handleSaveEditPopup:", error);
      alert("An error occurred while saving.");
    }
  }, [
    categoryName,
    editingCategoryId,
    editingSubcategoryId,
    categories,
    updateCategoryName,
    updateSubcategoryName,
    toggle,
  ]);

  const handleOverlayClick = useCallback(() => {
    setShowPopup(false);
    setSelectedItem(null);
  }, []);

  const toggleDisableCard = useCallback(
    (subcategoryId, currentStatus, action) => {
      if (action === "confirm") {
        const newStatus = !currentStatus;
        toggleSubcategoryStatus(subcategoryId, newStatus)
          .then(() => {
            setSelectedSubcategories((prev) =>
              prev.map((sub) =>
                sub.id === subcategoryId ? { ...sub, isActive: newStatus } : sub
              )
            );
          })
          .catch((error) => {
            console.error("Error toggling subcategory status:", error);
            alert("Failed to toggle subcategory status: " + error.message);
          });
      }
      setShowDisablePopup(false);
      setCurrentCardIndex(null);
    },
    [toggleSubcategoryStatus]
  );

  const handleCategoryClick = useCallback(
    (index, subcategories) => {
      // if (!isEditing) {
        setActiveTab(index);
        setSelectedSubcategories(subcategories || []);
        setSelectedCategoryId(categories[index]?.id || null);
      // }
    },
    [isEditing, categories]
  );

  const handleCategoryEdit = useCallback((categoryId, currentName, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditingCategoryId(categoryId);
    setEditingSubcategoryId(null);
    setCategoryName(currentName || "");
    setShowForm(true);
  }, []);

  const handleSubcategoryEdit = useCallback((subcategoryId, currentName, e) => {
    e.stopPropagation();
    setEditingSubcategoryId(subcategoryId);
    setEditingCategoryId(null);
    setCategoryName(currentName || "");
    setShowForm(true);
  }, []);

  const handleDisableClick = useCallback((subcategoryId) => {
    setCurrentCardIndex(subcategoryId);
    setShowDisablePopup(true);
  }, []);

  const toggleOptionsVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const filteredCategoriesData = useMemo(() => {
    return categories.filter((item) =>
      item?.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        toggle();
      }
    };
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm, toggle]);

  return (
    <div className="p-[14px] rounded-[10px] shadow-md bg-white">
      {loading && <p>Loading...</p>}
      {!loading && categories.length === 0 && <p>No categories available.</p>}
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
                className={`flex items-center pb-2 border-b-2 px-5 hover:text-blue-500 hover:border-blue-500 ${
                  activeTab === index
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-700"
                }`}
                onClick={() => handleCategoryClick(index, items.subcategory)}
              >
                <p className="font-normal text-base transition mx-[5px]">
                  {items?.categoryName || "Unnamed Category"}
                </p>
                <span className="font-normal text-xs flex justify-center items-center w-[25px] h-[17px] bg-[#0000000F] rounded-[60px] py-1 px-1.5 me-1">
                  {items?.subcategory?.length || 0}
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
              onClick={toggleOptionsVisibility}
            >
              View Blocked list
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-between gap-[18px] mt-6 flex-wrap whitespace-nowrap cursor-pointer">
        {selectedSubcategories.length === 0 && !loading && (
          <p>No subcategories available for this category.</p>
        )}
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
                  onBlur={() => handleSaveEdit(sub.id)}
                  className="w-full bg-transparent border border-black me-2 focus:outline-none p-1 rounded-[10px]"
                  autoFocus
                />
              ) : (
                <p className="font-normal text-sm text-[#00000099] mx-[5px] transition group-hover:text-[#6C4DEF]">
                  {sub?.categoryName || "Unnamed Subcategory"}
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
                  {sub.isActive ? <EnableRedIcon /> : <DisableRedicon />}
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
      {subcategoryPopup && (
        <AddSubCategoryPopUp
          handleClose={handleSubcategory}
          selectedCategoryId={selectedCategoryId}
          isEditMode={false}
          initialData={null}
        />
      )}
      {showDisablePopup && (
        <DisablePopUp
          onConfirm={() =>
            toggleDisableCard(
              currentCardIndex,
              selectedSubcategories.find((sub) => sub.id === currentCardIndex)
                ?.isActive,
              "confirm"
            )
          }
          onCancel={() => setShowDisablePopup(false)}
          isActive={
            selectedSubcategories.find((sub) => sub.id === currentCardIndex)
              ?.isActive
          }
        />
      )}

      <div className="flex justify-center items-center">
        {isVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={() => setIsVisible(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-[401px] bg-white shadow-lg rounded-lg flex flex-col"
            >
              <div className="fixed z-10 w-[400px]">
                <div className="p-4 bg-[#EEEEEE] flex justify-between items-center rounded-t-lg ">
                  <span className="font-normal text-base">
                    Blocked Services
                  </span>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="focus:outline-none me-1"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              </div>
              <div className="py-2.5 px-5  h-[250px] overflow-y-scroll">
                {[
                  "Profession",
                  "Profession",
                  "Profession",
                  "Profession",
                  "Profession",
                  "Profession",
                  "Profession",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div
                      className={`flex items-center ${
                        index === 1 ? "mt-2" : ""
                      }`}
                    >
                      <label className="custom-radio">
                        <input type="radio" name="blockedService" />
                      </label>
                      <span
                        className={`text-[#999999] font-normal text-base px-2.5 `}
                      >
                        {item}
                      </span>
                    </div>
                    <div>
                      <DisableRedicon />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div
              ref={popupRef}
              className="bg-white p-6 rounded-lg w-[649px] shadow-lg relative"
            >
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
