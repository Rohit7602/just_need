import React, { useState } from "react";
import {
  BackArrowIcon,
  DisalbleIcon,

} from "../../assets/icon/Icon";
import GalleryImg1 from "../../assets/png/galleryImg1.png";
import MechanicImage from "../../assets/png/mechanicImage.png";
import HouseCleaner from "../../assets/png/houseCleaner.png"
import { EmailIcon, LocationIcon, PhoneIcon, RatingStarIcon, Redicon } from "../../Components/Common/Icons";

function UserDetails() {
  const [showPopup, setShowPopup] = useState(false);
  const [popUpData, setPopUpData] = useState({
    status: "",
    reason: "",
  });

  function handlePopup() {
    setShowPopup(!showPopup);
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPopUpData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = () => {
    console.log(popUpData);
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[15px]">
          <BackArrowIcon />
          <h1 className="text-black text-[28px] font-medium">User’s Details</h1>
        </div>
        <div>
          <button onClick={handlePopup} className="flex items-center gap-3 bg-[#0832DE] py-3 px-[15px] rounded-[10px]">
            <DisalbleIcon />
            <span className="text-white font-normal text-base">
              Disable Provider
            </span>
          </button>
        </div>
      </div>
      <div className="flex mt-[30px] ">
        <div className="w-5/12 pe-2.5">
          <div className="bg-[#6C4DEF] px-[30px] py-5 rounded-[10px] ">
            <div className="flex items-center">
              <div className="pe-5 border-e-[1px] border-[#FFFFFF66]">
                <img src={MechanicImage} alt="image of user" />
                <h1 className="font-medium text-lg text-white mt-2.5 text-center">
                  Jhon Deo
                </h1>
                <h2 className="text-sm font-normal text-white mt-1 text-center">
                  Mechanic
                </h2>
              </div>
              <div className="ps-5">
                <div className="flex gap-2.5 items-center">
                  <PhoneIcon />
                  <h3 className="text-sm font-normal text-white">
                    + 91 89979 87908
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <EmailIcon />
                  <h3 className="text-sm font-normal text-white">
                    johndeo12@gmail.com
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <LocationIcon />
                  <h3 className="text-sm font-normal text-white">
                    Hisar Haryana B street 352
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-7/12 ps-2.5">
          <div className="bg-[#F1F1F1] rounded-[10px] p-[15px] pb-7">
            <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
              Business details
            </p>
            <div className="flex items-center mt-[15px]">
              <div className="w-[40%]">
                <h2 className="font-medium text-base text-black">
                  Business Name:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-base font-normal">
                  John Car Solutions
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-[15px]">
              <div className="w-[40%]">
                <h2 className="font-medium text-base text-black">
                  Service Name:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-base font-normal">
                  Mechanic
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-[15px]">
              <div className="w-[40%]">
                <h2 className="font-medium text-base text-black">
                  Categories:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-base font-normal">
                  1.Oil Change 2.Parts Repair 3.AC Service + 4 More
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066] mt-[30px]">
        Posted Listing
      </p>
      <div className="flex flex-row flex-wrap -mx-3 mt-[15px]">
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <div className="w-3/12 px-3">
              <div className="border-[0.5px] border-[#0000004D] rounded-[10px]">
                <img className="rounded-[10px] w-full " src={HouseCleaner} alt="house cleaner image" />
                <div className="p-2.5">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-black">House Cleaner</p>
                    <button><Redicon /></button>
                  </div>
                  <p className="font-normal text-[10px] text-[#00000099] mt-1">Lorem ipsum dolor sit amet consectetur. Venenatis urna mattis mi at sed dapibus.</p>
                  <div className="flex items-center gap-1 mt-2">
                    <RatingStarIcon/>
                    <h3 className="text-[#000F02] text-[10px] font-normal">4.2   |   1452 reviews</h3>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-white rounded-[10px] p-4 mt-3">
        <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
          Images
        </p>
        <div className="flex flex-row flex-wrap -mx-3">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <div key={index} className="w-[20%] px-3 mt-4">
                <div>
                  <img
                    className="w-full"
                    src={GalleryImg1}
                    alt="image of provider"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showPopup && (
        <>
          <div
            onClick={() => handlePopup()}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 h-[368px] w-[448px] m-auto">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
              <button
                onClick={handlePopup}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                aria-label="Close"
              >
                &#10005;
              </button>

              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-base font-normal text-gray-700 mb-2.5"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  onChange={handleOnChange}
                  value={popUpData.status}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Block">Block</option>
                  <option value="Unblock ">Unblock</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="reason"
                  className="block font-normal text-base mb-2.5"
                >
                  Reason
                </label>
                <textarea
                  name="reason"
                  onChange={handleOnChange}
                  value={popUpData.reason}
                  placeholder="type here.."
                  className="w-full h-28 px-3 py-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleUpdate}
                className="w-full bg-[#0832DE] text-base text-white font-medium py-3 rounded-[10px]"
              >
                Update Status
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDetails;
