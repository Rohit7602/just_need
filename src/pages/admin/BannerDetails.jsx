// import React from "react";
// // import girl from "../../assets/Images/Png/gitl.png";
// // import Driver from "../../assets/images/png/Driver.png";
import banner from "../../assets/Images/Png/banner.png";
import { DeleteSvg, EditSvg } from "../../assets/icon/Icon";

// function BannerDetails() {
//   return (
//     <>
//       <div className=" bg-white rounded-[10px] h-[calc(100vh-135px)]">
//         <div className="flex items-center justify-between ">
//           <div className="w-6/12 p-5">
//             <img src={banner} alt="" />
//           </div>

//           <div className="w-6/12 pe-5"></div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default BannerDetails;


import React, { useState } from "react";

function BannerDetails() {
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="bg-white">
      <div className="mt-5 flex justify-end mx-10">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0832DE] text-white rounded-[10px] py-2 px-[15px]"
        >
          <span className="me-4 text-xl">+</span> Add New Banner
        </button>
      </div>

      <div className="flex items-center justify-between mx-5 my-5">
        <div className="w-6/12 pe-5 relative">
          <img src={banner} alt="" />
          <div className="absolute top-[10px] right-[29.8px]">
            <DeleteSvg />
          </div>
          <div className="absolute top-[10px] right-[61px]">
            <EditSvg />
          </div>
        </div>

        <div className="w-6/12 pe-5 relative">
          <img src={banner} alt="" />
          <div className="absolute top-[10px] right-[29.8px]">
            <DeleteSvg />
          </div>
          <div className="absolute top-[10px] right-[61px]">
            <EditSvg />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-center items-center mb-4">
              <h2 className="text-lg font-medium">Add Service</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-3xl font-light absolute top-1.5 right-5"
              >
                ×
              </button>
            </div>
            <div className="border-b border-gray-300 mb-4"></div>

            <label className="text-gray-600 block mb-2">No Image Chosen</label>
            <div className="flex justify-between items-center gap-2 bg-[#F2F2F2] rounded-lg">
              <input
                type="text"
                value={image ? image.name : "No Image Chosen"}
                className="px-4 py-2 border rounded-lg border-none text-gray-500"
                disabled
              />
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="fileUpload"
                className="px-4 py-1 me-2 my-2 border border-[#E03F3F] text-[#E03F3F] text-base font-normal rounded-lg cursor-pointer"
              >
                + Upload Image
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-gray-600 block font-normal text-base mb-2">
                  Tag
                </label>
                <input
                  type="text"
                  value="Best Offer"
                  className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                  disabled
                />
              </div>
              <div>
                <label className="text-gray-600 block font-normal text-base mb-2">
                  Discount %
                </label>
                <input
                  type="text"
                  value="15 % off"
                  className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                  disabled
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 font-normal text-base block mb-2">
                Select Service
              </label>
              <select className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600">
                <option>Painting</option>
                <option>Dress</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 block font-normal text-base mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg bg-[#F2F2F2] text-gray-600"
                placeholder="Type Here"
                disabled
              ></textarea>
            </div>

            <button className="w-full mt-4 bg-[#0832DE] font-normal text-base text-white py-2 rounded-lg">
              Save Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerDetails;
