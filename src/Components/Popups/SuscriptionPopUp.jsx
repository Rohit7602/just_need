import React, { useState } from "react";
import { GiDuration } from "react-icons/gi";

function SuscriptionPopUp({ handlePopup }) {
  const initialData = {
    subscriptionName: "",
    price: "",
    duration: "",
  };
  const [color, setColor] = useState("");
  const [subscriptionData, setSubscriptionData] = useState(initialData);

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    setSubscriptionData((prev) => ({
      ...prev,
      color: selectedColor,
    }));
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDetails = () => {
    console.log(subscriptionData);
    setSubscriptionData(initialData)
  };
  return (
    <>
      <div
        onClick={() => handlePopup()}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50  h-[458px] w-[500px] xl:w-[694px] m-auto">
        <div className="w-full  bg-white rounded-lg shadow-lg p-6 relative">
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
          <div className=" mt-[15px]">
            <label
              htmlFor="subscriptionName"
              className="block text-base font-normal text-gray-700 mb-2.5"
            >
              Subscription Name
            </label>
            <input
              id="subscriptionName"
              name="subscriptionName"
              type="text"
              onChange={handleOnChange}
              value={subscriptionData.subscriptionName}
              placeholder="Standard"
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
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
                placeholder="₹199.00"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
              />
            </div>
            <div className="w-[48%]">
              <label
                htmlFor="duration"
                className="block text-base font-normal text-gray-700 mb-2.5"
              >
                Duration (In Years)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                onChange={handleOnChange}
                value={subscriptionData.duration}
                placeholder="1"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
              />
            </div>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <input
              type="color"
              className="h-[50px] w-[163px] rounded-[10px] border-none outline-none appearance-none"
              id="color"
              value={color}
              onChange={handleColorChange}
              style={{ backgroundColor: color }}
            />
            <input
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-base placeholder:font-normal"
              value={color}
              onChange={handleColorChange}
            />
          </div>

          <button onClick={handleDetails} className="w-full bg-[#0832DE] text-base text-white font-medium py-3 rounded-[10px] mt-[15px]">
            Save Details
          </button>
        </div>
      </div>
    </>
  );
}

export default SuscriptionPopUp;
