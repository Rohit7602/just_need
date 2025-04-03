/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { DropdownIcon } from "../../assets/icon/Icon";
import { useLocation } from "react-router-dom";
import cleaning from "../../assets/Images/Png/cleaning.png";

const Provider_Detail = () => {
  const [popup, setPopup] = useState(false);
  const [showImagePreviewPopUp, setShowImagePreviewPupUp] = useState(false);
  const popupRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [assignDropdown, setAssignDropDown] = useState(false);

  // State to store the selected values
  const [assignTo, setAssignTo] = useState("Select Assignee");
  const [instructions, setInstructions] = useState("");
  const [status, setStatus] = useState("Processing");

  // State to manage history log updates
  const [historyLog, setHistoryLog] = useState([
    { status: "Received", description: "Complaint logged and acknowledged.", active: true },
    { status: "In Review", description: "Assigned to the concerned department for investigation.", active: false },
    { status: "Action Taken", description: "Resolution steps initiated.", active: false },
    { status: "Resolved", description: "Complaint successfully addressed.", active: false },
    { status: "Closed", description: "Confirmed resolution and feedback received.", active: false },
  ]);

  const location = useLocation();
  const complaint = location.state?.complaint;

  console.log(complaint, "data");

  // Toggle dropdowns using arrow functions to avoid binding issues
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
    setAssignDropDown(false); // Close the other dropdown
  };

  // const assignDropdown = () => {
  //   setAssignDropDown((prev) => !prev);
  //   setDropdown(false); // Close the other dropdown
  // };

  // Handle selection of "Assign to"
  const handleAssignToSelect = (value) => {
    setAssignTo(value);
    setAssignDropDown(false);
  };

  // Handle selection of "Status"
  const handleStatusSelect = (value) => {
    setStatus(value);
    setDropdown(false);
  };

  // Handle instructions input change
  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  // Handle applying the changes and updating history log
  const handleApply = () => {
    if (assignTo === "Select Assignee") {
      alert("Please select an assignee.");
      return;
    }

    // Update history log based on the selected status
    const statusToHistoryMap = {
      Process: "In Review",
      Pending: "Action Taken",
      Done: "Resolved",
    };

    const newStatus = statusToHistoryMap[status] || "In Review";
    const updatedHistoryLog = historyLog.map((log) => {
      if (log.status === newStatus) {
        return { ...log, active: true, description: `Assigned to ${assignTo}. ${instructions}` };
      } else if (log.status === "Closed" && status === "Done") {
        return { ...log, active: true };
      }
      return { ...log, active: log.status === "Received" || log.status === newStatus };
    });

    setHistoryLog(updatedHistoryLog);
    setIsOpen(false); // Close the popup
  };

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


  const toggleAssignDropdown = () => {
    setAssignDropDown((prev) => !prev);
    setDropdown(false); // Close the other dropdown
  };

  const formatDate = (epochTime) => {
    const date = new Date(epochTime); // Convert epoch to Date object
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const [showContact, setShowContact] = useState(false);

  return (
    <div>
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="xl:w-7/12 w-full">
          <div className="flex justify-between">
            <div className="flex">
              <div>
                <img
                  className="w-[52px] h-[52px] rounded-[80px] object-cover"
                  src={complaint?.images[0]}
                  alt=""
                />
              </div>

              <div className="ms-3">
                <div className="flex items-center gap-[10px]">
                  <p className="font-semibold text-lg">
                    {complaint?.userdetails?.firstName} {complaint?.userdetails?.lastName}
                  </p>
                  <p className="text-[#6C4DEF] font-normal text-sm bg-[#6C4DEF1A] px-2.5 py-1 rounded-[90px]">
                    {complaint?.userdetails?.verificationStatus}
                  </p>
                </div>
                <p className="font-normal text-sm text-[#ADA4A5]">{complaint?.subject}</p>
              </div>
            </div>
            <div className="relative">
              <button
                className="px-[28px] py-[12px] text-[#6C4DEF] border-[#6C4DEF] border font-normal text-base rounded-[10px]"
                onClick={() => setShowContact(!showContact)}
              >
                Show Contact Detail
              </button>

              {/* Contact Info Box */}
              {showContact && (
                <div className="absolute top-1/2 mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-white shadow-lg p-3 rounded-md border border-gray-200 z-10">
                  <button
                    className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 text-lg"
                    onClick={() => setShowContact(false)}
                  >
                    ✖
                  </button>
                  <p className="font-semibold text-sm">
                    Name: {complaint?.userdetails?.firstName}
                  </p>
                  <p className="text-sm">Contact: {complaint?.userdetails?.mobile_number}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              {/* Complaint ID and Date */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm text-[#1D1617]">Complaint Id :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">
                  {complaint?.id}
                </span>
              </div>
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Date :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">
                  {formatDate(complaint?.created_at)}
                </span>
              </div>

              {/* Complaint Type and Email */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Complaint Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">
                  {complaint?.complaintType}
                </span>
              </div>
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Email :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">
                  {complaint?.userdetails?.useremail}
                </span>
              </div>

              {/* Service Type and Status */}
              <div className="flex mt-[16px]">
                <span className="font-normal text-sm">Service Type :</span>
                <span className="ml-2 text-[#1D1617] font-normal text-sm opacity-[50%]">
                  Plumbing
                </span>
              </div>
              <div className="flex items-center mt-[16px]">
                <span className="font-normal text-sm">Status :</span>
                <span className="ml-2 bg-[#6C4DEF1A] font-normal text-sm rounded-[90px] text-purple-700 px-2 py-0.5 border-none outline-none">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="border my-[24px]"></div>

          {/* Complaint Description */}
          <div className="p-[14px] rounded-[10px] bg-[#DDDADA4D]">
            <h2 className="font-semibold text-base text-black">Complaint</h2>
            <div className="w-full opacity-40 my-3"></div>
            <p className="text-sm font-normal text-black opacity-70">
              It is a long established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using Lorem Ipsum is
              that it has a more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable English.
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
                      ×
                    </button>
                  </div>
                  <div className="mt-3">
                    {/* Assign to */}
                    <p className="font-normal text-base whitespace-nowrap">1. Assign to</p>
                    <div
                      onClick={toggleAssignDropdown}
                      className="flex justify-between items-center bg-[#F2F2F2] py-3 px-4 rounded-md mt-2 cursor-pointer"
                    >
                      <span className="font-normal text-base text-gray-700">
                        {assignTo}
                      </span>
                      <span>
                        <DropdownIcon />
                      </span>
                    </div>

                    {assignDropdown && (
                      <div className="mt-2 rounded-md bg-[#F2F2F2] overflow-hidden">
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-300"
                          onClick={() => handleAssignToSelect("Seller")}
                        >
                          Seller
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-300"
                          onClick={() => handleAssignToSelect("Admin")}
                        >
                          Admin
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-gray-300"
                          onClick={() => handleAssignToSelect("Technical Engineer")}
                        >
                          Technical Engineer
                        </div>
                      </div>
                    )}

                    <hr className="my-2.5" />

                    {/* Instructions */}
                    <p className="font-normal text-base whitespace-nowrap">2. Instructions</p>
                    <input
                      className="font-normal text-base outline-none border-none bg-[#F2F2F2] py-3 rounded-md mt-2 px-4 w-full placeholder-gray-500"
                      type="text"
                      placeholder="Enter instructions"
                      value={instructions}
                      onChange={handleInstructionsChange}
                    />
                    <hr className="my-2.5" />

                    {/* Status */}
                    <p className="whitespace-nowrap">3. Status</p>
                    <div
                      onClick={toggleDropdown}
                      className="flex justify-between items-center bg-[#F2F2F2] py-3 px-4 rounded-md mt-2 cursor-pointer"
                    >
                      <span
                        className={`font-normal text-base ${status === "Processing" ? "text-gray-700" : ""
                          } ${status === "Process" ? "text-[#6C4DEF]" : ""} ${status === "Pending" ? "text-[#FFA500]" : ""
                          } ${status === "Done" ? "text-[#008000]" : ""}`}
                      >
                        {status}
                      </span>
                      <span>
                        <DropdownIcon />
                      </span>
                    </div>
                    {dropdown && (
                      <div className="mt-2 rounded-md bg-[#F2F2F2] overflow-hidden">
                        <div
                          className="p-2 cursor-pointer hover:bg-[#6C4DEF1A] text-[#6C4DEF]"
                          onClick={() => handleStatusSelect("Process")}
                        >
                          Process
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-[#FFA50029] text-[#FFA500]"
                          onClick={() => handleStatusSelect("Pending")}
                        >
                          Pending
                        </div>
                        <div
                          className="p-2 cursor-pointer hover:bg-[#0080001A] text-[#008000]"
                          onClick={() => handleStatusSelect("Done")}
                        >
                          Done
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 mt-[30px]">
                    <button
                      className="font-normal text-base px-[34px] py-2 bg-[#0832DE] text-white rounded-[10px]"
                      onClick={handleApply}
                    >
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

        <div className="rounded-md p-4 xl:w-4/12 w-full">
          <h2 className="font-semibold text-base mb-4">History Log</h2>
          <div>
            {historyLog.map((log, index) => (
              <div key={index} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 border-2 rounded-full ${log.active ? "border-[#6C4DEF]" : "border-gray-300"
                      }`}
                  ></div>
                  {index < historyLog.length - 1 && (
                    <div
                      className={`w-[2px] h-20 border border-dashed ${log.active && historyLog[index + 1].active
                          ? "border-[#6C4DEF]"
                          : "border-[#000] opacity-10"
                        }`}
                    ></div>
                  )}
                </div>
                <div className="ml-4">
                  <h3
                    className={`font-semibold font-base ${log.active ? "text-black" : "text-gray-400"
                      }`}
                  >
                    {log.status}
                  </h3>
                  <p
                    className={`text-sm font-normal text-black opacity-[80%] mt-2.5 ${log.active ? "text-black" : "text-gray-400"
                      }`}
                  >
                    {log.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provider_Detail;