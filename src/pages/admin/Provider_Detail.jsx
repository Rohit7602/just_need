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
import { DropdownIcon } from "../../assets/icon/Icon";

const Provider_Detail = () => {
  const [popup, setPopup] = useState(false);
  const [showImagePreviewPopUp, setShowImagePreviewPupUp] = useState(false);
  const popupRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false)
  const [AssignDropdown, setAssignDropDown] = useState(false)

  function toggleDropdown() {
    setDropdown(!dropdown)
  }

  function assignDropdown() {
    setAssignDropDown(!AssignDropdown)
  }

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
      <div className="flex flex-col xl:flex-row justify-between gap-5 ">
        <div className="xl:w-7/12 w-full">
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
                <p className="font-normal text-sm text-[#ADA4A5]">House Cleaning</p>
              </div>
            </div>
            <div>
              <button className="px-[28px] py-[12px] text-[#6C4DEF] border-[#6C4DEF] border font-normal text-base rounded-[10px]">
                Show Contact Detail
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
                <span className="font-normal text-sm">Date :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">11 Dec, 2024</span>
              </div>

              {/* Complaint Type and Email */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Complaint Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">Cushion Damaged</span>
              </div>
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Email :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">john@gmail.com</span>
              </div>

              {/* Service Type and Status */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Service Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">Plumbing</span>
              </div>
              <div className="flex items-center mt-[16px]">
                <span className="font-normal text-sm">Status :</span>
                <span className="ml-2 bg-[#6C4DEF1A] font-normal text-sm rounded-[90px] text-purple-700 px-2 py-0.5  border-none outline-none">Processing</span>


              </div>
            </div>
          </div>

          <div className="border my-[24px]"></div>

          {/* Complaint Description */}
          <div className="p-[14px] rounded-[10px] bg-[#DDDADA4D]">
            <h2 className="font-semibold text-base text-black">
              Complaint
            </h2>
            <div className="w-full  opacity-40 my-3"></div>
            <p className="text-sm font-normal text-black opacity-70">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
            <div className="flex gap-[14px] mt-2.5">
              <img src={cleaning} alt="" />
              <img src={cleaning} alt="" />
            </div>
          </div>

          <div className="relative">
            {/* Button to open the popup */}
            <div className="flex justify-end mt-5">
              <button
                className="px-[15px] py-[12px] font-normal text-base rounded-[10px] bg-[#0832DE] text-white"
                onClick={() => setIsOpen(true)}
              >
                Update complaint state
              </button>
            </div>

            {/* Popup */}
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-[18px] rounded-[14px] shadow-[#00000040] w-[350px]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">Update complaint state</h2>
                    <button
                      className="text-4xl font-normal"
                      onClick={() => setIsOpen(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="mt-3">
                      <p className="font-normal text-base whitespace-nowrap">1. Assign to</p>
                    <div onClick={assignDropdown} className={`flex bg-[#F2F2F2] py-3 rounded-md mt-2 pe-4 ${!assignDropdown && "flex"}`} >
                      <span className="flex justify-end w-full">
                        <DropdownIcon />
                      </span>
                    </div>

                    {AssignDropdown && (
                      <div className="mt-2 rounded-md bg-[#F2F2F2] overflow-hidden">
                        <div
                          className="p-2 cursor-pointer rounded-[90px]"
                        >
                          Seller
                        </div>
                        <div
                          className="p-2 cursor-pointer rounded-[90px] "
                        >
                      Admin
                        </div>
                        <div
                          className="p-2  cursor-pointer rounded-[90px] "
                        >
                          Technical Engineer
                        </div>
                      </div>
                    )}


                    <hr className="my-2.5" />
                    <p className="font-normal text-base whitespace-nowrap ">2. Instructions</p>
                    <input className="font-normal text-base outline-none border-none bg-[#F2F2F2] py-3 rounded-md mt-2 px-4 w-full placeholder-black" type="text" placeholder="" />
                    <hr className="my-2.5" />

                      <p className="whitespace-nowrap">3. Status</p>
                    <div onClick={toggleDropdown} className={`flex bg-[#F2F2F2] py-3 rounded-md mt-2 pe-4 ${!dropdown && "flex"}`}>
                      <span className="flex justify-end w-full">
                        <DropdownIcon />
                      </span>

                    </div>
                    {dropdown && (
                      <div className="mt-2 rounded-md bg-[#F2F2F2] overflow-hidden">
                        <div
                          className="p-2 cursor-pointer hover:bg-[#6C4DEF1A] text-[#6C4DEF]"
                        >
                          Process
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-[#FFA50029] text-[#FFA500]"
                        >
                          Pending
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-[#0080001A] text-[#008000]"
                        >
                          Done
                        </div>
                      </div>
                    )}
                    {/* <select className="bg-white border-none outline-none text-base">
                      <option className="font-normal text-base" value="process">3. Status</option>
                      <option className="font-normal text-base" value="process">Process</option>
                      <option className="font-normal text-base" value="pending">Pending</option>
                      <option className="font-normal text-base" value="done">Done</option>
                    </select> */}
                  </div>
                  <div className="flex  gap-3 mt-[30px]">
                    <button className="font-normal text-base px-[34px] py-2 bg-[#0832DE] text-white rounded-[10px]">
                      Apply
                    </button>
                    <button
                      className="font-normal text-base px-[34px] py-2 bg-[#F1F1F1] rounded-[10px]"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="border"></div>

        <div className="rounded-md p-4  xl:w-4/12 w-full">
          <h2 className="font-semibold text-base mb-4">History Log</h2>
          <div>
            {/* Received */}
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-20 border border-dashed border-[#6C4DEF] "></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Received</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Complaint logged and acknowledged.</p>
              </div>
            </div>

            {/* In Review */}
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-20 border border-dashed border-[#000] opacity-10"></div>
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
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-20 border border-dashed border-[#000] opacity-10"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Action Taken</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Resolution steps initiated.</p>
              </div>
            </div>

            {/* Resolved */}
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-2 border-[#6C4DEF] rounded-full"></div>
                <div className="w-[2px] h-20 border border-dashed border-[#000] opacity-10"></div>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold font-base">Resolved</h3>
                <p className="text-sm font-normal text-black opacity-[80%] mt-2.5">Complaint successfully addressed.</p>
              </div>
            </div>

            {/* Closed */}
            <div className="flex items-start">
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