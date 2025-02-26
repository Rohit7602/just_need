import React, { useState, useEffect } from "react";
import { Plusicon, Redcrossicon } from "../../assets/icon/Icons";
import { useServiceContext } from "../../store/ServiceContext";
import { toast } from "react-toastify";

function AddSubCategoryPopUp({
  handleClose,
  selectedCategoryId,
  isEditMode = false,
  initialData = null,
}) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const { getsubcategoriesData, updateSubcategoryName } = useServiceContext();

  // Pre-fill input if in edit mode
  useEffect(() => {
    if (isEditMode && initialData) {
      setSubCategoryName(initialData.categoryName); // Pre-fill with existing subcategory name
    }
  }, [isEditMode, initialData]);

  // Add subcategory to list (only for add mode)
  const handleAddMore = () => {
    if (subCategoryName.trim() && !isEditMode) {
      setSubCategories((prev) => [
        ...prev,
        { categoryName: subCategoryName, createdAt: Date.now() },
      ]);
      setSubCategoryName("");
    }
  };

  // Remove subcategory (only for add mode)
  const deleteSubCategory = (item) => {
    if (!isEditMode) {
      setSubCategories((prev) =>
        prev.filter((val) => val.categoryName !== item.categoryName)
      );
    }
  };

  // Save or update subcategories
  const handleSaveDetails = async () => {
    if (isEditMode) {
      // Update existing subcategory
      if (subCategoryName.trim() && initialData?.id) {
        try {
          await updateSubcategoryName(initialData.id, subCategoryName);
          toast.success("Subcategory updated successfully!");
          handleClose();
        } catch (error) {
          toast.error("Failed to update subcategory.");
          console.error("Error updating subcategory:", error);
        }
      } else {
        toast.info("Please enter a subcategory name.");
      }
    } else {
      // Add new subcategories
      if (subCategories.length > 0) {
        if (!selectedCategoryId) {
          toast.error("Category ID is required to add subcategories.");
          return;
        }
        try {
          await getsubcategoriesData(selectedCategoryId, subCategories);
          toast.success("Subcategories added successfully!");
          handleClose();
        } catch (error) {
          toast.error("Failed to add subcategories.");
          console.error("Error inserting subcategories:", error);
        }
      } else {
        toast.info("Please add at least one subcategory.");
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 w-[500px] xl:w-[694px] mx-auto">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Popup Title */}
          <p className="font-normal text-lg text-black text-center pb-[15px] border-b border-dashed border-gray-400">
            {isEditMode ? "Edit Subcategory" : "Add Subcategory"}
          </p>

          {/* Subcategory Input */}
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

          {/* Add More Button (only visible in add mode) */}
          {!isEditMode && (
            <div className="flex justify-end mt-[15px]">
              <button
                onClick={handleAddMore}
                className="bg-[#0832DE] flex items-center px-[16px] py-2.5 h-[42px] rounded-[10px]"
              >
                <Plusicon />
                <p className="font-normal text-[16px] text-white ms-[12px]">
                  Add More
                </p>
              </button>
            </div>
          )}

          {/* Subcategories List (only visible in add mode) */}
          {!isEditMode && (
            <div className="flex flex-wrap -mx-3 mt-[15px]">
              {subCategories.map((item, index) => (
                <div key={index} className="w-4/12 px-3 mb-[15px]">
                  <div className="flex gap-3 items-center">
                    <span className="text-base font-normal text-black">
                      {index + 1}.
                    </span>
                    <span className="text-base font-normal text-black">
                      {item.categoryName}
                    </span>
                    <button onClick={() => deleteSubCategory(item)}>
                      <Redcrossicon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSaveDetails}
            className="w-full bg-[#0832DE] text-base text-white font-medium h-[42px] py-2.5 rounded-[10px] mt-[15px]"
          >
            {isEditMode ? "Update Subcategory" : "Save Subcategories"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddSubCategoryPopUp;