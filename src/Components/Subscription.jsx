import React, { useState } from "react";
import SuscriptionPopUp from "./Popups/SuscriptionPopUp";

const Subscription = () => {
  const [showPopup, setShowPopup] = useState(false);
  function handlePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <div className="w-full min-h-screen p-[15px] bg-white rounded-[10px]">
      <div className="rounded-lg mb-5">
        <div className="flex justify-end items-center">
          
          <button
            onClick={handlePopup}
            className="bg-[#0832DE] font-normal text-base text-white py-2 xl:py-3 px-3 xl:px-[15px] rounded-[10px] mt-3 float-right"
          >
            <span className="me-3">+</span> Add Plan
          </button>
        </div>
      </div>
      <div className="flex gap-[15px]">
        <div className="w-6/12 xl:w-4/12 bg-gradient-to-r from-[#8970F2] to-[#321A95] p-5 rounded-[10px]">
          <h1 className="text-center text-xl xl:text-[26px] font-semibold text-white">
            STANDARD
          </h1>
          <div className="border-t-[1px] border-dashed border-white my-2.5"></div>
          <p className="text-center font-normal text-[10px] xl:text-xs text-white">
            Lorem ipsum dolor sit amet consectetur. Consequat ullamcorper
            accumsan nibh{" "}
          </p>
          <p className="text-white text-center mt-[15px] leading-[80px] border-[1px] border-dashed border-[#FFFFFF4D] rounded-[10px]">
            <sup className="text-xl font--normal">₹</sup>
            <span className="text-[48px] xl:text-[64px] font-semibold">99</span>
            <sub className="text-xl font-normal">/2 Year</sub>
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
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <div>
              <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                <span>2</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <div>
              <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                <span>3</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
        </div>
        <div className="w-6/12 xl:w-4/12 bg-gradient-to-r from-[#B870F2] to-[#3A1479] p-5 rounded-[10px]">
          <h1 className="text-center text-xl xl:text-[26px] font-semibold text-white">
            PREMIUM
          </h1>
          <div className="border-t-[1px] border-dashed border-white my-2.5"></div>
          <p className="text-center font-normal text-[10px] xl:text-xs text-white">
            Lorem ipsum dolor sit amet consectetur. Consequat ullamcorper
            accumsan nibh{" "}
          </p>
          <p className="text-white text-center mt-[15px] leading-[80px] border-[1px] border-dashed border-[#FFFFFF4D] rounded-[10px]">
            <sup className="text-xl font--normal">₹</sup>
            <span className="text-[48px] xl:text-[64px] font-semibold">199</span>
            <sub className="text-xl font-normal">/2 Year</sub>
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
            <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <div>
              <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                <span>2</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
          <div className="flex items-center gap-[15px] mt-[15px]">
            <div>
              <div className="rounded-[50px] text-white h-[24px] w-[24px] bg-[#382488] text-sm font-normal flex items-center justify-center">
                <span>3</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm font-normal text-[#FFFFFF99]">
              Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet
              consectetur.
            </p>
          </div>
        </div>
      </div>
      {showPopup && (
        <SuscriptionPopUp handlePopup={handlePopup}/>
      )}
    </div>
  );
};

export default Subscription;
