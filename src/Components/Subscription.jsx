/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SuscriptionPopUp from "./Popups/SuscriptionPopUp";
import { EditiconSubscription, Plusicon, RedDeleteIcon } from "../assets/icon/Icons";
import ConfirmDeltePopUp from "./Popups/ConfirmDeltePopUp";
import { useSubscriptionContext } from "../store/SubscriptionContext";

const Subscription = () => {
  const [deletePopUp, setDeletePopUp] = useState(false); // Fixed typo
  const [deleteItemId, setDeleteItemId] = useState(""); // Fixed typo
  const [updateItemId, setUpdateItemId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [plans, setPlans] = useState([]);

  const { fetchSubscription } = useSubscriptionContext();

  useEffect(() => {
    async function getPlans() {
      const data = await fetchSubscription();
      console.log("Fetched plans:", data);
      if (data) setPlans(data);
    }
    getPlans();
  }, []);

  function handlePopup(plan) {
    setUpdateItemId(plan?.planId || ""); // Handle null plan for "Add Plan"
    setShowPopup(!showPopup);
  }

  const handleDeletePopUp = (deleteId) => {
    setDeleteItemId(deleteId); // Fixed typo
    setDeletePopUp(!deletePopUp); // Fixed typo
  };

  return (
    <div className="w-full p-[15px] bg-white rounded-[10px]">
      <div className="rounded-lg mb-5">
        <div className="flex justify-end items-center">
          <button
            onClick={() => handlePopup(null)} // Pass null for new plan
            className="bg-[#0832DE] font-normal text-base text-white py-2 xl:py-2.5 h-[42px] px-3 xl:px-[15px] rounded-[10px] mt-3 float-right"
          >
            <div className="flex items-center">
              <span className="me-3"><Plusicon /></span> Add Plan
            </div>
          </button>
        </div>
      </div>
      <div className="flex -mx-3 flex-wrap">
        {plans?.map((item) => (
          <div key={item.id} className="w-6/12 xl:w-4/12 2xl:w-3/12 px-3 mt-3">
            <div
              style={{
                background: `linear-gradient(135deg, ${item.color || "#8970F2"}, black)`,
              }}
              className="p-5 rounded-[10px] group bg-gradient-to-br from-[#8970F2] to-[#321A95]"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-xl xl:text-[26px] font-semibold text-white">
                  {item.PlanName || "Unnamed Plan"}
                </h1>
                <div className="flex items-center gap-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button onClick={() => handlePopup(item)}>
                    <EditiconSubscription />
                  </button>
                  <button onClick={() => handleDeletePopUp(item.id)}>
                    <RedDeleteIcon />
                  </button>
                </div>
              </div>
              <div className="border-t-[1px] border-dashed border-white my-2.5"></div>
              <p className="text-center font-normal text-[10px] xl:text-xs text-white">
                {item.cancellationPolicy || "No cancellation policy"}
              </p>
              <p className="text-white text-center mt-[15px] leading-none border-[1px] border-dashed border-[#FFFFFF4D] rounded-[10px] py-3">
                <sup className="text-xl font-normal relative top-[-30px] pe-3">
                  {item.currency || "$"}
                </sup>
                <span className="text-[48px] xl:text-[64px] font-semibold">
                  {item.Price || "0"}
                </span>
                <sub className="text-xl font-normal">
                  /{item.durationInDays || "0"} Days
                </sub>
              </p>
              {/* Rest of the JSX remains unchanged */}
            </div>
          </div>
        ))}
      </div>
      {showPopup && <SuscriptionPopUp updateItemId={updateItemId} handlePopup={handlePopup} />}
      {deletePopUp && <ConfirmDeltePopUp deleteId={deleteItemId} onCancel={handleDeletePopUp} />}
    </div>
  );
};

export default Subscription;