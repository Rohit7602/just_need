import React, { useState } from "react";
import SuscriptionPopUp from "./Popups/SuscriptionPopUp";
import { EditiconSubscription, RedDeleteIcon } from "../assets/icon/Icons";
import ConfirmDeltePopUp from "./Popups/ConfirmDeltePopUp";
import { useSubscriptionContext } from "../store/SubscriptionContext";

const Subscription = () => {
  const [deletePopUp, setDeletePouUp] = useState(false);
  const [deleteItemId, setDeleteItmeId] = useState("");
  const [updateItemId, setUpdateItemId] = useState("");

  const { plans, showPopup, setShowPopup } = useSubscriptionContext();

  function handlePopup(plan) {
    setUpdateItemId(plan.planId);
    setShowPopup(!showPopup);
  }

  const handleDeletePopUp = (deleteId) => {
    setDeleteItmeId(deleteId);
    setDeletePouUp(!deletePopUp);
  };
  return (
    <div className="w-full p-[15px] bg-white rounded-[10px]">
      <div className="rounded-lg mb-5">
        <div className="flex justify-end items-center">
          <button
            onClick={handlePopup}
            className="bg-[#0832DE] font-normal text-base text-white py-2 xl:py-2.5 h-[42px] px-3 xl:px-[15px] rounded-[10px] mt-3 float-right"
          >
            <span className="me-3">+</span> Add Plan
          </button>
        </div>
      </div>
      <div className="flex -mx-3 flex-wrap">
        {plans.map((item) => {
          return (
            <div
              key={item.planId}
              className=" w-6/12 xl:w-4/12 2xl:w-3/12 px-3 mt-3"
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${item.color}, black)`,
                }}
                className=" p-5 rounded-[10px] group "
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-xl xl:text-[26px] font-semibold text-white">
                    {item.planName}
                  </h1>
                  <div className="flex items-center gap-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handlePopup(item)}>
                      <EditiconSubscription />
                    </button>
                    <button onClick={() => handleDeletePopUp(item.planId)}>
                      <RedDeleteIcon />
                    </button>
                  </div>
                </div>
                <div className="border-t-[1px] border-dashed border-white my-2.5"></div>
                <p className="text-center font-normal text-[10px] xl:text-xs text-white">
                  {item.cancellationPolicy}
                </p>
                <p className="text-white text-center mt-[15px] leading-none border-[1px] border-dashed border-[#FFFFFF4D] rounded-[10px] py-3">
                  <sup className="text-xl font-normal relative top-[-30px] pe-3">
                    {item.currency}
                  </sup>
                  <span className="text-[48px] xl:text-[64px] font-semibold">
                    {item.price}
                  </span>
                  {/* <div className="inline-block h-[40px] w-[3px] bg-white rotate-[-140deg] mx-2 "></div> */}
                  <sub className="text-xl font-normal">
                    /{item.durationInDays} Days
                  </sub>
                </p>
                <p className="mt-[15px] text-[#FFFFFF99] text-sm xl:text-base font-normal">
                  How It Works?
                </p>
                <div className="flex items-center gap-[15px] mt-[15px]">
                  <div>
                    <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                      <span>1</span>
                    </div>
                  </div>
                  <p className=" text-xs lg:text-sm font-normal text-[#FFFFFF99]">
                    Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit
                    amet consectetur.
                  </p>
                </div>
                <div className="flex items-center gap-[15px] mt-[15px]">
                  <div>
                    <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                      <span>2</span>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
                    Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit
                    amet consectetur.
                  </p>
                </div>
                <div className="flex items-center gap-[15px] mt-[15px]">
                  <div>
                    <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                      <span>3</span>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
                    Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit
                    amet consectetur.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {showPopup && (
        <SuscriptionPopUp
          updateItemId={updateItemId}
          handlePopup={handlePopup}
        />
      )}
      {deletePopUp && (
        <ConfirmDeltePopUp
          deleteId={deleteItemId}
          onCancel={handleDeletePopUp}
        />
      )}
    </div>
  );
};

export default Subscription;
