/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import ResolveIssuePopus from "../../Components/Popups/ResolveIssuePopus";
import {
  ArrowIcon,
  Resolve_Issue,
  PhnIcon,
  EmailIcon,
  LocsionIcon,
  LocsionIcon2,
  PhnIcon2,
  EmailIcon2,
  StarIcon,
} from "../../assets/icon/Icons";
import imgCustemer from "../../assets/png/Frame 1000004210.png";
import HouseCleaner from "../../assets/png/HouseCleaner.png";
import img1 from "../../assets/png/Frame 1171276954.png";
import img2 from "../../assets/png/img 2.png";
import img3 from "../../assets/png/img3.png";
import img4 from "../../assets/png/img4.png";
import img5 from "../../assets/png/img5.png";
import img6 from "../../assets/png/img6.png";
import img7 from "../../assets/png/img7.png";
import ImagePreviewPopUp from "../../Components/Popups/ImagePreviewPopUp";
import robert from "../../assets/Images/Png/robert.png"
import cleaning from "../../assets/Images/Png/cleaning.png"

const Provider_Detail = () => {
  const [popup, setPopup] = useState(false);
  const [showImagePreviewPopUp, setShowImagePreviewPupUp] = useState(false);
  const popupRef = useRef(null);

  const handleImagePreviewPopUp = () => {
    setShowImagePreviewPupUp(!showImagePreviewPopUp);
  };

  // Toggle the visibility of the popup
  const togglePopup = () => {
    setPopup(!popup);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopup(false);
      }
    };

    if (popup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popup]);

  return (
    <div className="">
      <div className="flex justify-end relative items-center flex-wrap gap-y-4 mt-5 md:mt-0">
        <button
          onClick={togglePopup}
          className="bg-[#0832DE] flex items-center text-white font-normal text-sm md:text-base px-3 md:px-4 py-2.5 h-[42px] rounded-[10px] mt-5 md:mt-0"
        >
          <Resolve_Issue />
          <h5 className="ms-2 md:ms-3">Resolve Issue</h5>
        </button>
        {popup && <div ref={popupRef}><ResolveIssuePopus onClose={togglePopup} /></div>}
      </div>
      <div className=" flex lg:flex justify-between gap-5 mt-5">
        <div className="bg-white w-7/12">
          <div className="flex justify-between">
            <div className="flex">
              <div>
                <img src={robert} alt="" />
              </div>

              <div className="ms-3">
                <div className="flex items-center gap-[10px]">
                  <p className="font-semibold text-lg ">Robert Fox</p>
                  <p className="text-[#6C4DEF] font-normal text-sm bg-[#6C4DEF1A] px-2.5 py-1 rounded-[90px]">Processing</p>
                </div>
                <p className="">House Cleaning</p>
              </div>
            </div>
            <div>
              <button className="px-[12px] py-[15px] text-[#6C4DEF] border-[#6C4DEF] border font-normal text-base rounded-[10px]">
                Contact Now
              </button>
            </div>
          </div>

          <div className="mt-5">
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {/* Complaint ID and Date */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm  text-[#1D1617]">Complaint Id :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">#12345567</span>
              </div>
              <div className="flex mt-[16px]">
                <span className="font-medium">Date :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">11 Dec, 2024</span>
              </div>

              {/* Complaint Type and Email */}
              <div className="flex mt-[16px]">
                <span className="font-medium">Complaint Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">Cushion Damaged</span>
              </div>
              <div className="flex mt-[16px]">
                <span className="font-medium">Email :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">john@gmail.com</span>
              </div>

              {/* Service Type and Status */}
              <div className="flex mt-[16px]">
                <span className="font-medium">Service Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">Plumbing</span>
              </div>
              <div className="flex items-center mt-[16px]">
                <span className="font-medium">Status :</span>
                <select className="ml-2 bg-[#6C4DEF1A] rounded-[90px] text-purple-700 px-2 py-0.5  border-none outline-none">
                  <option>Processing</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border my-[24px]"></div>

          {/* Complaint Description */}
          <div className="p-[14px] rounded-[10px] bg-[#DDDADA4D]">
            <h2 className="font-medium text-lg text-black">
              Complaint
            </h2>
            <div className="w-full border-[0.5px] border-dashed border-black border-opacity-40 opacity-40 my-3"></div>
            <p className="text-base text-black opacity-70">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
            <div className="flex gap-[14px] mt-2.5">
              <img src={cleaning} alt="" />
              <img src={cleaning} alt="" />
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button className="px-[15px] py-[12px] font-normal text-base rounded-[10px] bg-[#0832DE] text-white">Update complaint state</button>
          </div>
        </div>


        <div className="border"></div>

        <div className="rounded-md p-4 max-w-md shadow-sm w-4/12">
          <h2 className="font-semibold text-lg mb-4">History Log</h2>
          <div className="">
            {/* Received */}
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-10 bg-[#6C4DEF]"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Received</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Complaint logged and acknowledged.</p>
              </div>
            </div>

            {/* In Review */}
            <div className="flex items-start mt-10">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-10 bg-[#6C4DEF]"></div>
              </div>
              <div className="ml-4 flex items-center">
                <div>
                  <h3 className="font-semibold font-base">In Review</h3>
                  <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Assigned to the concerned department for investigation.</p>
                </div>
                {/* Profile Icon */}

              </div>
            </div>

            {/* Action Taken */}
            <div className="flex items-start mt-10">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-10 bg-[#6C4DEF]"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Action Taken</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Resolution steps initiated.</p>
              </div>
            </div>

            {/* Resolved */}
            <div className="flex items-start mt-10">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-10 bg-[#6C4DEF]"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Resolved</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Complaint successfully addressed.</p>
              </div>
            </div>

            {/* Closed */}
            <div className="flex items-start mt-10">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Closed</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Confirmed resolution and feedback received.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider_Detail;
