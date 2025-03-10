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
  EnableRedIcon,
} from "../../assets/icon/Icons";
import Actions from "../Popups/Actions";
import AddNewServicePopUp from "../Popups/AddNewServicePopUp";
import DisablePopUp from "../Popups/DisablePopUp";
import { useServiceContext } from "../../store/ServiceContext";
import AddSubCategoryPopUp from "../Popups/SubcategoryPopup";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "./Loader";

function Services() {
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNewServicePopUp, setShowNewServicePopUp] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isCategoryToggle, setIsCategoryToggle] = useState(false);
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
    toggleCategoryStatus,
    loading,
  } = useServiceContext();

  useEffect(() => {
    getCategoriesWithSubcategories().catch((error) => {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to load categories. Please refresh the page.");
    });
  }, [getCategoriesWithSubcategories]);

  useEffect(() => {
    if (
      categories.length > 0 &&
      selectedSubcategories.length === 0 &&
      !loading
    ) {
      const firstActiveCategory =
        categories.find((cat) => cat.isActive) || categories[0];
      const index = categories.indexOf(firstActiveCategory);
      setActiveTab(index);
      setSelectedSubcategories(firstActiveCategory?.subcategory || []);
      setSelectedCategoryId(firstActiveCategory?.id || null);
    }
  }, [categories, loading, selectedSubcategories]);

  const filteredCategoriesData = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    return categories
      .map((category) => {
        const categoryMatches = category?.categoryName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        const filteredSubcategories = (category.subcategory || []).filter(
          (sub) =>
            sub?.categoryName?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (categoryMatches || filteredSubcategories.length > 0) {
          return {
            ...category,
            subcategory:
              filteredSubcategories.length > 0 || categoryMatches
                ? category.subcategory
                : [],
          };
        }
        return null;
      })
      .filter((cat) => cat !== null);
  }, [categories, searchQuery]);

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
    async (subcategoryId) => {
      if (editData.trim() !== "") {
        try {
          const currentSubcategory = selectedSubcategories.find(
            (sub) => sub.id === subcategoryId
          );
          const newStatus = !currentSubcategory?.isActive;

          const nameSuccess = await updateSubcategoryName(
            subcategoryId,
            editData
          );
          const statusSuccess = await toggleSubcategoryStatus(
            subcategoryId,
            newStatus
          );

          if (nameSuccess && statusSuccess) {
            setEditIndex(null);
            setEditData("");
            setSelectedSubcategories((prev) =>
              prev.map((sub) =>
                sub.id === subcategoryId
                  ? { ...sub, categoryName: editData, isActive: newStatus }
                  : sub
              )
            );
            await getCategoriesWithSubcategories();
            toast.success(
              `Subcategory updated and ${
                newStatus ? "enabled" : "disabled"
              } successfully!`
            );
          } else {
            toast.error("Failed to update subcategory or toggle status.");
          }
        } catch (error) {
          console.error("Error updating subcategory:", error);
          toast.error("An error occurred while updating the subcategory.");
        }
      }
    },
    [
      editData,
      updateSubcategoryName,
      toggleSubcategoryStatus,
      selectedSubcategories,
      getCategoriesWithSubcategories,
    ]
  );

  const handleCategoryInputChange = useCallback((e) => {
    setCategoryName(e.target.value);
  }, []);

  const handleSaveEditPopup = useCallback(async () => {
    if (categoryName.trim() === "") {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      if (editingCategoryId) {
        // Editing a Category
        const success = await updateCategoryName(
          editingCategoryId,
          categoryName
        );
        if (success) {
          const updatedIndex = categories.findIndex(
            (cat) => cat.id === editingCategoryId
          );
          if (updatedIndex !== -1) {
            setActiveTab(updatedIndex);
            setSelectedSubcategories(
              categories[updatedIndex]?.subcategory || []
            );
            setSelectedCategoryId(categories[updatedIndex]?.id || null);
          }
          toggle(); // Close the form
          await getCategoriesWithSubcategories(); // Refresh data
          toast.success("Category updated successfully!");
        } else {
          toast.error("Failed to update category.");
        }
      } else if (editingSubcategoryId) {
        // Editing a Subcategory
        const currentSubcategory = selectedSubcategories.find(
          (sub) => sub.id === editingSubcategoryId
        );
        if (!currentSubcategory) {
          toast.error("Subcategory not found.");
          return;
        }

        // Update only the name (do not toggle the status)
        const nameSuccess = await updateSubcategoryName(
          editingSubcategoryId,
          // categoryName // Pass the new name here
          updateSubcategoryName
        );

        if (!nameSuccess) {
          toast.error("Failed to update subcategory name.");
          return;
        }

        // Update local state only with the new name
        setSelectedSubcategories((prev) =>
          prev.map((sub) =>
            sub.id === editingSubcategoryId
              ? { ...sub, categoryName } // Only update the name
              : sub
          )
        );

        toggle(); // Close the form
        await getCategoriesWithSubcategories(); // Refresh data
        toast.success("Subcategory name updated successfully!");
      } else {
        toast.error("No valid category or subcategory selected for editing.");
      }
    } catch (error) {
      console.error(
        `Error in handleSaveEditPopup (${
          editingCategoryId ? "category" : "subcategory"
        }):`,
        error
      );
      toast.error(`An error occurred: ${error.message}`);
    }
  }, [
    categoryName,
    editingCategoryId,
    editingSubcategoryId,
    categories,
    updateCategoryName,
    updateSubcategoryName,
    selectedSubcategories,
    getCategoriesWithSubcategories,
    toggle,
  ]);

  const handleOverlayClick = useCallback(() => {
    setShowPopup(false);
    setSelectedItem(null);
  }, []);

  const toggleDisableCard = useCallback(
    async (itemId, currentStatus, action, isCategory = false) => {
      if (action === "confirm") {
        setShowDisablePopup(false);
        setCurrentCardIndex(null);
        if (showForm) toggle();

        const newStatus = !currentStatus;
        try {
          if (isCategory) {
            await toggleCategoryStatus(itemId, newStatus);
            const updatedCategories = categories.map((cat) =>
              cat.id === itemId ? { ...cat, isActive: newStatus } : cat
            );
            const activeCategoryIndex = updatedCategories.findIndex(
              (cat) => cat.isActive
            );
            if (newStatus) {
              const enabledIndex = updatedCategories.findIndex(
                (cat) => cat.id === itemId
              );
              setActiveTab(enabledIndex);
              setSelectedSubcategories(
                updatedCategories[enabledIndex]?.subcategory || []
              );
              setSelectedCategoryId(
                updatedCategories[enabledIndex]?.id || null
              );
            } else if (
              activeTab === categories.findIndex((cat) => cat.id === itemId)
            ) {
              setActiveTab(
                activeCategoryIndex !== -1 ? activeCategoryIndex : 0
              );
              setSelectedSubcategories(
                activeCategoryIndex !== -1
                  ? updatedCategories[activeCategoryIndex]?.subcategory || []
                  : []
              );
              setSelectedCategoryId(
                activeCategoryIndex !== -1
                  ? updatedCategories[activeCategoryIndex]?.id || null
                  : null
              );
            }
          } else {
            await toggleSubcategoryStatus(itemId, newStatus);
            setSelectedSubcategories((prev) =>
              prev.map((sub) =>
                sub.id === itemId ? { ...sub, isActive: newStatus } : sub
              )
            );
          }
          await getCategoriesWithSubcategories();
          toast.success(
            newStatus
              ? `${
                  isCategory ? "Category" : "Subcategory"
                } enabled successfully!`
              : `${
                  isCategory ? "Category" : "Subcategory"
                } disabled successfully!`
          );
        } catch (error) {
          console.error(
            `Error toggling ${isCategory ? "category" : "subcategory"} status:`,
            error
          );
          toast.error(
            `Failed to toggle ${
              isCategory ? "category" : "subcategory"
            } status: ${error.message}`
          );
        }
      } else {
        setShowDisablePopup(false);
        setCurrentCardIndex(null);
      }
    },
    [
      toggleSubcategoryStatus,
      toggleCategoryStatus,
      getCategoriesWithSubcategories,
      showForm,
      toggle,
      categories,
      activeTab,
    ]
  );

  const handleCategoryClick = useCallback(
    (index) => {
      const sourceArray = searchQuery.trim()
        ? filteredCategoriesData
        : categories;
      if (sourceArray[index]?.isActive) {
        setActiveTab(index);
        setSelectedSubcategories(sourceArray[index]?.subcategory || []);
        setSelectedCategoryId(sourceArray[index]?.id || null);
      }
    },
    [categories, filteredCategoriesData, searchQuery]
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

  const handleDisableClick = useCallback(
    (subcategoryId) => {
      setCurrentCardIndex(subcategoryId);
      setIsCategoryToggle(false);
      setShowDisablePopup(true);
      if (showForm) toggle();
    },
    [showForm, toggle]
  );

  const handleCategoryDisable = useCallback(
    (categoryId) => {
      setCurrentCardIndex(categoryId);
      setIsCategoryToggle(true);
      setShowDisablePopup(true);
      if (showForm) toggle();
    },
    [showForm, toggle]
  );

  const toggleOptionsVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const blockedSubcategories = useMemo(() => {
    return categories
      .flatMap((category) => category.subcategory || [])
      .filter((sub) => sub.isActive === false);
  }, [categories]);

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

  const handleNewServiceSuccess = async () => {
    toast.success("New service added successfully!");
    await getCategoriesWithSubcategories();
    handleNewServicePopUp();
    // Set the newly added category as active with 0 subcategories
    const newCategoryIndex = categories.length - 1; // Changed to length - 1 to get the last added category
    setActiveTab(newCategoryIndex);
    setSelectedSubcategories([]); // Ensure no subcategories are set initially
    setSelectedCategoryId(categories[newCategoryIndex]?.id || null);
  };

  const handleSubcategorySuccess = async () => {
    toast.success("Subcategory added successfully!");
    await getCategoriesWithSubcategories();
    handleSubcategory();
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-[14px] rounded-[10px] shadow-md bg-white">
      {!categories && (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <Loader />
          </div>
        </div>
      )}
      {!loading && categories.length === 0 && <p>No categories available.</p>}
      {!loading && categories.length > 0 && (
        <>
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
                    } ${!items.isActive ? "opacity-50" : ""}`}
                    onClick={() => handleCategoryClick(index)}
                  >
                    <img
                      className="h-[30px] w-[30px] object-cover rounded-full"
                      src={items.image}
                      alt=""
                    />
                    <p className="font-normal text-base transition mx-[5px]">
                      {highlightText(items?.categoryName)}
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
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryDisable(items.id);
                        }}
                        className="ms-2"
                      >
                        {items.isActive ? (
                          <EnableRedIcon />
                        ) : (
                          <DisableRedicon />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border-b border-[rgb(128,128,128)] ps-5">
                <button
                  className="text-[#6C4DEF] font-normal text-base"
                  onClick={toggleOptionsVisibility}
                >
                  View Blocked List
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-[18px] mt-6 flex-wrap whitespace-nowrap cursor-pointer">
            {selectedSubcategories.length > 0 &&
              selectedSubcategories.map((sub, index) => (
                <div
                  key={index}
                  className="group hover:bg-[#6C4DEF1A] hover:border-[#6C4DEF1A] border border-[#0000001A] lg:p-5 p-3  rounded-[10px] h-full transition w-full"
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
                    ) : selectedSubcategories.length > 0 ? (
                      <p className="font-normal text-sm text-[#00000099] lg:mx-[5px] transition group-hover:text-[#6C4DEF] flex items-center lg:gap-4 gap-2">
                        <img
                          className="w-[25px] h-[25px] object-cover rounded-full"
                          src={sub.image}
                          alt=""
                        />
                        {highlightText(
                          sub?.categoryName || "un-named category",
                          searchQuery
                        )}
                      </p>
                    ) : (
                      "No category found"
                    )}
                    <div className="flex lg:gap-4 gap-2">
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
                Add New Service
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
            <AddNewServicePopUp
              handleNewServicePopUp={handleNewServicePopUp}
              onSuccess={handleNewServiceSuccess}
            />
          )}
          {subcategoryPopup && (
            <AddSubCategoryPopUp
              handleClose={handleSubcategory}
              selectedCategoryId={selectedCategoryId}
              isEditMode={false}
              initialData={null}
              onSuccess={handleSubcategorySuccess}
            />
          )}
          {showDisablePopup && (
            <DisablePopUp
              onConfirm={() =>
                toggleDisableCard(
                  currentCardIndex,
                  isCategoryToggle
                    ? categories.find((cat) => cat.id === currentCardIndex)
                        ?.isActive
                    : selectedSubcategories.find(
                        (sub) => sub.id === currentCardIndex
                      )?.isActive,
                  "confirm",
                  isCategoryToggle
                )
              }
              onCancel={() => setShowDisablePopup(false)}
              isActive={
                isCategoryToggle
                  ? categories.find((cat) => cat.id === currentCardIndex)
                      ?.isActive
                  : selectedSubcategories.find(
                      (sub) => sub.id === currentCardIndex
                    )?.isActive
              }
              confirmText={
                isCategoryToggle &&
                !categories.find((cat) => cat.id === currentCardIndex)?.isActive
                  ? "Yes Enable"
                  : "Yes Disable"
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
                    <div className="p-4 bg-[#EEEEEE] flex justify-between items-center rounded-t-lg">
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
                  <div className="py-2.5 px-5 h-[250px] overflow-y-scroll">
                    {blockedSubcategories.length === 0 ? (
                      <p className="text-[#999999] font-normal text-base py-2">
                        No blocked subcategories found.
                      </p>
                    ) : (
                      blockedSubcategories.map((sub, index) => (
                        <div
                          key={sub.id}
                          className="flex justify-between items-center py-2"
                        >
                          <div
                            className={`flex items-center ${
                              index === 1 ? "mt-3" : ""
                            }`}
                          >
                            <label className="custom-radio">
                              <input type="radio" name="blockedService" />
                            </label>
                            <span className="text-[#999999] font-normal text-base px-2.5">
                              {highlightText(
                                sub.categoryName || "Unnamed Subcategory",
                                searchQuery
                              )}
                            </span>
                          </div>
                          <div>
                            <DisableRedicon />
                          </div>
                        </div>
                      ))
                    )}
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
        </>
      )}
    </div>
  );
}

export default Services;
