import React, { useState } from "react";
import {
  BackArrowIcon,
  DisalbleIcon,

} from "../../assets/icon/Icon";
import GalleryImg1 from "../../assets/png/galleryImg1.png";
import MechanicImage from "../../assets/png/mechanicImage.png";
import HouseCleaner from "../../assets/png/houseCleaner.png"
import { EmailIcon, LocationIcon, PhoneIcon, RatingStarIcon, DisableRedicon } from "../../assets/icon/Icons";
import DisableProviderPopUp from "../../Components/Popups/DisableProviderPopUp";
import DisablePopUp from "../../Components/Popups/DisablePopUp";
import EnablePopUp from "../../Components/Popups/EnablePopUp";
import ImagePreviewPopUp from "../../Components/Popups/ImagePreviewPopUp";

function UserDetails() {
  const [showPopupDisable, setShowPopupDisable] = useState(false);
  const [showImagePreviewPopUp,setShowImagePreviewPupUp] = useState(false)


  function handlePopupDisable() {
    setShowPopupDisable(!showPopupDisable);
  }

  const handleImagePreviewPopUp = ()=>{
    setShowImagePreviewPupUp(!showImagePreviewPopUp)
    console.log("first")
  }

   const [listings, setListings] = useState([
    { id: 1, name: "House Cleaner", description: "Lorem ipsum...", rating: 4.2, reviews: 1452, isEnabled: true },
    { id: 2, name: "Plumber", description: "Lorem ipsum...", rating: 4.5, reviews: 980, isEnabled: true },
    { id: 3, name: "Electrician", description: "Lorem ipsum...", rating: 4.0, reviews: 870, isEnabled: true },
    { id: 4, name: "Gardener", description: "Lorem ipsum...", rating: 4.3, reviews: 450, isEnabled: true },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); 
  const [currentListingId, setCurrentListingId] = useState(null);

  const handlePopup = (id, type) => {
    setShowPopup(true);
    setPopupType(type);
    setCurrentListingId(id);
  };

  const handleConfirm = () => {
    setListings((prevListings) =>
      prevListings.map((listing) =>
        listing.id === currentListingId
          ? { ...listing, isEnabled: popupType === "enable" }
          : listing
      )
    );
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };


 
  return (
    <div className="px-4">
      <div className="flex items-center justify-center">
          <button onClick={handlePopupDisable} className="flex items-center gap-3 bg-[#0832DE] py-2.5 h-[42px] px-3 xl:px-[15px] rounded-[10px]">
            <DisalbleIcon />
            <span className="text-white font-normal text-base">
              Disable Provider
            </span>
          </button>
      </div>
      <div className="flex flex-wrap  mt-[30px] ">
        <div className="w-10/12 xl:w-5/12 xl:pe-2.5">
          <div className="bg-[#6C4DEF] px-[30px] py-5 rounded-[10px] ">
            <div className="flex items-center">
              <div className="pe-5 border-e-[1px] border-[#FFFFFF66]">
                <img src={MechanicImage} alt="image of user" />
                <h1 className="font-medium text-lg text-white mt-2.5 text-center">
                  Jhon Deo
                </h1>
                <h2 className="text-sm font-normal text-white mt-1 text-center">
                  Mechanic
                </h2>
              </div>
              <div className="ps-5">
                <div className="flex gap-2.5 items-center">
                  <PhoneIcon />
                  <h3 className="text-sm font-normal text-white">
                    + 91 89979 87908
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <EmailIcon />
                  <h3 className="text-sm font-normal text-white">
                    johndeo12@gmail.com
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <LocationIcon />
                  <h3 className="text-sm font-normal text-white">
                    Hisar Haryana B street 352
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-7/12 xl:ps-2.5 mt-3 xl:mt-0">
          <div className="bg-[#F1F1F1] rounded-[10px] p-[15px] pb-7">
            <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
              Business details
            </p>
            <div className="flex items-center mt-3 xl:mt-[15px]">
              <div className="w-[30%] xl:w-[40%]">
                <h2 className="font-medium text-sm xl:text-base text-black">
                  Business Name:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                  John Car Solutions
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-3 xl:mt-[15px]">
              <div className="w-[30%] xl:w-[40%]">
                <h2 className="font-medium text-sm xl:text-base text-black">
                  Service Name:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                  Mechanic
                </h2>
              </div>
            </div>
            <div className="flex items-center mt-3 xl:mt-[15px]">
              <div className="w-[30%] xl:w-[40%]">
                <h2 className="font-medium text-sm  xl:text-base text-black">
                  Categories:
                </h2>
              </div>
              <div>
                <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                  1.Oil Change 2.Parts Repair 3.AC Service + 4 More
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066] mt-[30px]">
        Posted Listing
      </p>
      <div className="flex flex-row flex-wrap -mx-3">
        {listings.map((item) => (
          <div
            key={item.id}
            className="w-6/12 mt-3 xl:mt-[15px] xl:w-3/12 px-3"
            style={{ opacity: item.isEnabled ? 1 : 0.5 }}
          >
            <div className="border-[0.5px] border-[#0000004D] rounded-[10px]">
              <img className="rounded-[10px] w-full" src={HouseCleaner} alt="Listing" />
              <div className="p-2.5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm text-black">{item.name}</p>
                  <button
                    onClick={() =>
                      handlePopup(item.id, item.isEnabled ? "disable" : "enable")
                    }
                  >
                    {item.isEnabled ? <DisableRedicon /> : <span className="text-xs font-normal text-[#0DA800] opacity-100">Enable</span>}
                  </button>
                </div>
                <p className="font-normal text-[10px] text-[#00000099] mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <RatingStarIcon />
                  <h3 className="text-[#000F02] text-[10px] font-normal">
                    {item.rating} | {item.reviews} reviews
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[10px] p-4 mt-3">
        <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
          Images
        </p>
        <div className="flex flex-row flex-wrap -mx-3">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <div key={index} className="w-[33%] xl:w-[20%] px-3 mt-4">
                <div onClick={handleImagePreviewPopUp} className="cursor-pointer">
                  <img
                    className="w-full"
                    src={GalleryImg1}
                    alt="image of provider"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showPopupDisable && (
       <DisableProviderPopUp handlePopupDisable={handlePopupDisable}/>
      )}
      {showPopup && (
        <div>
          {popupType === "disable" ? (
            <DisablePopUp onConfirm={handleConfirm} onCancel={handleCancel} />
          ) : (
            <EnablePopUp onConfirm={handleConfirm} onCancel={handleCancel} />
          )}
        </div>
      )}
      {showImagePreviewPopUp && (<ImagePreviewPopUp images={[GalleryImg1,GalleryImg1,GalleryImg1,GalleryImg1,GalleryImg1,GalleryImg1]} onCancel={handleImagePreviewPopUp}/>)}
    </div>
  );
}

export default UserDetails;
