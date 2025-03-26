/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { useSubscriptionContext } from "../../store/SubscriptionContext"; // Import context

function SuscriptionPopUp({ handlePopup, updateItemId }) {
  const initialData = {
    planName: "",
    price: "",
    durationInDays: "",
    currency: "",
    color: "0832DE", // Default color
  };

  const { addPlan, updatePlan, plans } = useSubscriptionContext(); // Access context functions and plans

  const [color, setColor] = useState("#0832DE");
  const [subscriptionData, setSubscriptionData] = useState(initialData);
  const [primaryColor, setPrimaryColor] = useState("#0832DE");
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
    setSubscriptionData((prev) => ({
      ...prev,
      color: color.hex,
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetails = async () => {
    const updatedSubscriptionData = {
      ...subscriptionData,
      color: color,
      PlanName: subscriptionData.planName, // Map to match Supabase schema
      Price: Number(subscriptionData.price), // Convert to number for Supabase
      durationInDays: Number(subscriptionData.durationInDays), // Convert to number
      currency: subscriptionData.currency,
    };

    // Remove fields not needed for Supabase
    delete updatedSubscriptionData.planName;
    delete updatedSubscriptionData.price;

    if (updateItemId) {
      await updatePlan(updatedSubscriptionData, updateItemId);
    } else {
      await addPlan(updatedSubscriptionData);
    }

    // Reset form and close popup
    setSubscriptionData(initialData);
    setColor("0832DE"); // Reset to default color
    handlePopup(); // Close the popup
  };

  useEffect(() => {
    if (updateItemId) {
      const existingPlan = plans.find((plan) => plan.planId === updateItemId);
      if (existingPlan) {
        setSubscriptionData({
          planName: existingPlan.PlanName || "",
          price: existingPlan.Price || "",
          durationInDays: existingPlan.durationInDays || "",
          currency: existingPlan.currency || "",
          color: existingPlan.color || "0832DE",
        });
        setColor(existingPlan.color || "0832DE");
        setPrimaryColor(existingPlan.color || "0832DE");
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
            ✕
          </button>
          <p className="font-normal text-lg text-black text-center pb-[15px] border-b-[0.5px] border-dashed border-[#00000066]">
            {updateItemId ? "Edit Subscription" : "Add Subscription"}
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
              placeholder="Subscription type"
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
                #{primaryColor}
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