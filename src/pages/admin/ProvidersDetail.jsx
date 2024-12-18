import React from "react";
import { BackArrowIcon } from "../../assets/icon/Icon";
import GalleryImg1 from "../../assets/png/galleryImg1.png";

function ProvidersDetail() {
  return (
    <div className="p-4">
      <div className="flex items-center">
        <BackArrowIcon />
        <h3 className="font-medium text-[28px] text-black ms-4">
          Providers Details
        </h3>
      </div>
      <div className="bg-white rounded-[10px] p-4 mt-4">
        <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
          Personal details
        </p>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Name:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">John Leo</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Mobile Number:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">
              + 91 89979 87908
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Email:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">
              johnleo12@gmail.com
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Address:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">
              Hisar Haryana B street 352
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Business Name:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">
              John Car Solutions
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Service Name:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">Mechanic</h3>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4">
          <div className="w-[140px]">
            <h3 className="text-base font-medium leading-[20px] text-black">
              Categories:
            </h3>
          </div>
          <div className="px-[30px]">
            <h3 className="font-normal text-base text-[#000000B2]">
              1.Oil Change 2.Parts Repai 3.Tyre Change 4.Denting & Repair 5.AC
              Service
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px] p-4 mt-4">
        <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
          Gallery
        </p>
        <div className="flex flex-row flex-wrap -mx-3">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <div key={index} className="w-[20%] px-3 mt-4">
                <div>
                  <img className="w-full" src={GalleryImg1} alt="image of provider" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProvidersDetail;
