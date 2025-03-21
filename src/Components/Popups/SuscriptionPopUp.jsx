/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";


function SuscriptionPopUp({ handlePopup, updateItemId }) {
  const initialData = {
    planName: "",
    price: "",
    durationInDays: "",
    currency: "",
  };


  const [color, setColor] = useState("#0832DE");
  const [subscriptionData, setSubscriptionData] = useState(initialData);
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const primaryColorPickerRef = useRef(null);


  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    setSubscriptionData((prev) => ({
      ...prev,
      color: selectedColor,
    }));
  };

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color.hex);
    setColor(color.hex);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetails = () => {
    const updatedSubscriptionData = {
      ...subscriptionData,
      color: color,
    };
    if (updateItemId) {
      updatePlan(updatedSubscriptionData, updateItemId);
    } else {
      addPlan(updatedSubscriptionData);
    }
    setSubscriptionData(initialData);
    setColor("");
  };

  useEffect(() => {
    if (updateItemId) {
      const existingPlan = plans.find((plan) => plan.planId === updateItemId);
      if (existingPlan) {
        setSubscriptionData(existingPlan);
        setColor(existingPlan.color || "");
        setPrimaryColor(existingPlan.color || "#000000");
      }
    }
  }, [updateItemId, plans]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        primaryColorPickerRef.current &&
        !primaryColorPickerRef.current.contains(e.target)
      ) {
        setShowPrimaryPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        onClick={handlePopup}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 h-[458px] w-[500px] xl:w-[694px] m-auto">
        <div className="w-full bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={handlePopup}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            aria-label="Close"
          >
            &#10005;
          </button>
          <p className="font-normal text-lg text-black text-center pb-[15px] border-b-[0.5px] border-dashed border-[#00000066]">
            Add Subscription
          </p>
          <div className="mt-[15px]">
            <label
              htmlFor="planName"
              className="block text-base font-normal text-gray-700 mb-2.5"
            >
              Plan Name
            </label>
            <input
              id="planName"
              name="planName"
              type="text"
              onChange={handleOnChange}
              value={subscriptionData.planName}
              placeholder="subscription type"
              className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
            />
          </div>
          <div className="flex justify-between mt-[15px]">
            <div className="w-[48%]">
              <label
                htmlFor="price"
                className="block text-base font-normal text-gray-700 mb-2.5"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                onChange={handleOnChange}
                value={subscriptionData.price}
                placeholder="₹000.00"
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            <div className="w-[48%]">
              <label
                htmlFor="durationInDays"
                className="block text-base font-normal text-gray-700 mb-2.5"
              >
                Duration (In Days)
              </label>
              <input
                id="durationInDays"
                name="durationInDays"
                type="number"
                onChange={handleOnChange}
                value={subscriptionData.durationInDays}
                placeholder="0"
                onWheel={(e) => e.target.blur()}
                className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="mt-[15px]">
            <label
              htmlFor="currency"
              className="block text-base font-normal text-gray-700 mb-2.5"
            >
              Currency
            </label>
            <input
              id="currency"
              name="currency"
              type="text"
              onChange={handleOnChange}
              value={subscriptionData.currency}
              placeholder="Currency"
              className="w-full px-3 py-[12px] rounded-[7px] bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
            />
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <div className="flex items-center gap-2.5">
              <button
                className="px-[50px] lg:px-[15px] xl:px-[50px] py-3 h-[42px] rounded-[10px] text-white text-sm font-normal"
                style={{ backgroundColor: primaryColor }}
                onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
              >
                {primaryColor}
              </button>

              {showPrimaryPicker && (
                <div ref={primaryColorPickerRef} className="absolute z-10">
                  <ChromePicker
                    color={primaryColor}
                    onChange={handlePrimaryColorChange}
                  />
                </div>
              )}
            </div>

            <input
              className="w-full px-3 py-[12px] bg-gray-100 rounded-[7px] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
              value={color}
              onChange={handleColorChange}
              placeholder={color}
            />
          </div>

          <button
            onClick={handleDetails}
            className="w-full bg-[#0832DE] text-base text-white font-medium py-2.5 h-[42px] rounded-[10px] mt-[15px]"
          >
            Save Details
          </button>
        </div>
      </div>
    </>
  );
}

export default SuscriptionPopUp;
