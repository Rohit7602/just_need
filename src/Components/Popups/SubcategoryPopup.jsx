import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useServiceContext } from "../../store/ServiceContext";

function AddSubCategoryPopUp({
  handleClose,
  selectedCategoryId,
  isEditMode = false,
  initialData = null,
}) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const { updateSubcategoryName, addSubcategory } = useServiceContext();

  useEffect(() => {
    if (isEditMode && initialData) {
      setSubCategoryName(initialData.categoryName);
    }
  }, [isEditMode, initialData]);

  const handleSaveDetails = async () => {
    if (!subCategoryName.trim()) {
      toast.info("Please enter a subcategory name.");
      return;
    }

    try {
      if (isEditMode) {
        if (initialData?.id) {
          await updateSubcategoryName(initialData.id, subCategoryName);
          toast.success("Subcategory updated successfully!");
          handleClose();
        }
      } else {
        if (!selectedCategoryId) {
          toast.error("Category ID is required to add a subcategory.");
          return;
        }
        await addSubcategory(selectedCategoryId, subCategoryName);
        toast.success("Subcategory added successfully!");
        handleClose();
      }
    } catch (error) {
      toast.error(`Failed to ${isEditMode ? "update" : "add"} subcategory.`);
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} subcategory:`,
        error
      );
    }
  };

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 w-[500px] xl:w-[694px] mx-auto">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
          <p className="font-normal text-lg text-black text-center pb-[15px] border-b border-dashed border-gray-400">
            {isEditMode ? "Edit Subcategory" : "Add Subcategory"}
          </p>
          <div className="mt-[15px]">
            <label className="block text-base font-normal text-gray-700 mb-2.5">
              Subcategory Name
            </label>
            <input
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              type="text"
              placeholder="Enter Subcategory"
              className="w-full px-3 py-[12px] bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSaveDetails}
            className="w-full bg-[#0832DE] text-base text-white font-medium h-[42px] py-2.5 rounded-[10px] mt-[15px]"
          >
            {isEditMode ? "Update Subcategory" : "Save Subcategory"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddSubCategoryPopUp;
