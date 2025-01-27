import React, { useState ,useEffect,useRef} from "react";
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
      <div className="lg:flex justify-between gap-5">
        <div className="bg-[#6C4DEF] p-5 rounded-[10px] mt-5 w-full md:w-[489px] lg:w-[379px]">
          <h2 className="font-medium text-sm lg:text-lg text-white">
            Customer Detail
          </h2>
          <div className="w-full border-[0.5px] border-dashed border-white border-opacity-60 opacity-60 my-3"></div>
          <div className="flex items-center gap-5">
            <div className="w-1/4">
              <img src={imgCustemer} alt="Customer" />
              <h2 className="font-medium text-white pt-2 text-sm md:text-base">
                Jhon Deo
              </h2>
            </div>
            <div className="border border-dashed border-white border-opacity-60 opacity-60 h-24"></div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <PhnIcon />
                <h2 className="text-white text-sm">+91 89979 87908</h2>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <EmailIcon />
                <h2 className="text-white text-sm">johndeo12@gmail.com</h2>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <LocsionIcon />
                <h2 className="text-white text-sm">
                  Hisar Haryana B street 352
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F1F1F1] p-5 rounded-[10px] mt-5 w-full md:w-[489px] lg:w-[379px]">
          <h2 className="font-medium text-sm lg:text-lg text-black">
            Provider Detail
          </h2>
          <div className="w-full border-[0.5px] border-dashed border-black border-opacity-60 opacity-60 my-3"></div>
          <div className="flex items-center gap-5">
            <div className="w-1/4">
              <img src={imgCustemer} alt="Provider" />
              <h2 className="font-medium text-black pt-2 text-sm md:text-base">
                Mike Tyson
              </h2>
            </div>
            <div className="border border-dashed border-black border-opacity-60 opacity-60 h-24 "></div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <PhnIcon2 />
                <h2 className="text-black text-sm">+91 89979 87908</h2>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <EmailIcon2 />
                <h2 className="text-black text-sm">johndeo12@gmail.com</h2>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <LocsionIcon2 />
                <h2 className="text-black text-sm">
                  Hisar Haryana B street 352
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Complaint Description */}
      <div className="lg:flex justify-between gap-5 pt-8">
        <div className="lg:w-6/12">
          <h2 className="font-medium text-lg text-black">
            Complaint Description
          </h2>
          <div className="w-full border-[0.5px] border-dashed border-black border-opacity-40 opacity-40 my-3"></div>
          <p className="text-base text-black opacity-70">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>
        <div className="w-full lg:w-[382px] md:w-[489px] border-[1px] border-[#ebeaea] rounded-[10px]  mt-4">
          <img
            className="w-full rounded-[10px]"
            src={HouseCleaner}
            alt="House Cleaner"
          />
          <div className="p-3 flex items-center justify-between">
            <h3 className="font-medium text-base text-black">House Cleaner</h3>
            <div className="flex items-center gap-3">
              <StarIcon />
              <h2 className="text-sm">
                4.2 <span className="px-2">|</span> 1452 reviews
              </h2>
            </div>
          </div>
          <p className="text-sm opacity-60 px-3 pb-4">
            Lorem ipsum dolor sit amet consectetur. urna mattis mi at sed
            dapibus. Blandit non lacus nisi donec a sagittis.
          </p>
        </div>
      </div>
      {/* Images Section */}
      <h2 className="font-medium text-lg pt-8">Images</h2>
      <div className="w-full border-[0.5px] border-dashed border-black border-opacity-40 opacity-40 my-3"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-[10px]  pt-5">
        {[img1, img2, img3, img4, img5, img6, img7].map((img, index) => (
          <img
            onClick={handleImagePreviewPopUp}
            key={index}
            className="w-[200px] h-[200px] 2xl:w-full rounded-[10px] "
            src={img}
            alt={`img-${index + 1}`}
          />
        ))}
      </div>
      {showImagePreviewPopUp && (
        <ImagePreviewPopUp
          images={[img1, img2, img3, img4, img5, img6, img7]}
          onCancel={handleImagePreviewPopUp}
        />
      )}
    </div>
  );
};

export default Provider_Detail;
