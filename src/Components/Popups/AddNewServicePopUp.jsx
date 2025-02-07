import React, { useState } from "react";
import { Plusicon, Redcrossicon } from "../../assets/icon/Icons";
import { useServiceContext } from "../../store/ServiceContext";

function AddNewServicePopUp({ handleNewServicePopUp }) {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoriesName, setSubCategoriesName] = useState("");
  const [serviceData, setServiceData] = useState([]);

  // Get the addCategoriesSubCategories function from context
  const { addCategoriesSubCategories } = useServiceContext();

  const handleAddMore = () => {
    if (subCategoriesName) {
      setServiceData((prev) => [...prev, subCategoriesName]);
      setSubCategoriesName("");
    }
  };

  const deleteSubCategories = (item) => {
    setServiceData((prev) => prev.filter((val) => val !== item));
  };

  const handleSaveDetails = async () => {
    if (categoryName && serviceData.length > 0) {
      await addCategoriesSubCategories(categoryName, serviceData);
      handleNewServicePopUp(); // Close the popup after saving
    } else {
      alert("Please enter a category name and at least one subcategory.");
    }
  };

  return (
    <>
      <div
        onClick={() => handleNewServicePopUp()}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50  h-[458px] w-[500px] xl:w-[694px] m-auto">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={() => handleNewServicePopUp()}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            aria-label="Close"
          >
            &#10005;
          </button>
          <p className="font-normal text-lg text-black text-center pb-[15px] border-b-[0.5px] border-dashed border-[#00000066]">
            Add Service
          </p>
          <div className="mt-[15px]">
            <label
              htmlFor="serviceName"
              className="block text-base font-normal text-gray-700 mb-2.5"
            >
              Service Name
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              id="serviceName"
              name="serviceName"
              type="text"
              placeholder="Service Type"
              className="w-full px-3 py-[12px] bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
            />
          </div>
          <div className="w-full mt-[15px]">
            <label
              htmlFor="subCategories"
              className="block text-base font-normal text-gray-700 mb-2.5"
            >
              Sub Categories
            </label>
            <input
              value={subCategoriesName}
              onChange={(e) => setSubCategoriesName(e.target.value)}
              id="subCategories"
              name="subCategories"
              type="text"
              placeholder="Oil Add"
              className="w-full px-3 py-[12px] bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal "
            />
          </div>
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

          {/* Service Items in rows of 3 */}
          <div className="flex flex-wrap -mx-3 mt-[15px]">
            {serviceData.map((item, index) => (
              <div key={index} className="w-4/12 px-3 mb-[15px]">
                <div className="flex gap-3 items-center">
                  <span className="text-base font-normal text-black ">
                    {index + 1}.
                  </span>
                  <span className="text-base font-normal text-black">
                    {item}
                  </span>
                  <button onClick={() => deleteSubCategories(item)}>
                    <Redcrossicon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveDetails}
            className="w-full bg-[#0832DE] text-base text-white font-medium h-[42px] py-2.5 rounded-[10px] mt-[15px]"
          >
            Save Details
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewServicePopUp;
