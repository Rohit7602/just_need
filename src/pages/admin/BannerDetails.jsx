import React from "react";
// import girl from "../../assets/Images/Png/gitl.png";
// import Driver from "../../assets/images/png/Driver.png";
import banner from "../../assets/Images/Png/banner.png";
// import { DeleteSvg, EditSvg } from "../../assets/icon/Icon";

function BannerDetails() {
  return (
    <>
      <div className=" bg-white rounded-[10px] h-[calc(100vh-135px)]">
        <div className="flex items-center justify-between ">
          <div className="w-6/12 p-5">
            <img src={banner} alt="" />
          </div>

          <div className="w-6/12 pe-5"></div>
        </div>
      </div>
    </>
  );
}

export default BannerDetails;
