/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import user from "../../assets/png/user for listing.png";
import star from "../../assets/png/star.png";
import { Link, useParams } from "react-router-dom";
import disable_img from "../../assets/png/disable_img.png";
import enable_img from "../../assets/png/enable_img.png";
import { supabase } from "../../store/supabaseCreateClient";

import {
  EmailIcon,
  LocationIcon,
  PhoneIcon,

} from "../../assets/icon/Icons";
import { useListingContext } from "../../store/ListingContext";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ListingDetails = () => {
  const [listData, setListData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleViewImage = (image) => {
    setCurrentImage(image);
    setIsOpen(true);
  };

  const { id } = useParams();

  // console.log(id,"id");

  const { fetchlistingWithId } = useListingContext();

  async function getData() {
    const value = await fetchlistingWithId(id);

    setListData(value);
  }
  if (typeof global === 'undefined') {
    window.global = window;
  }



  async function handleBlock(e, val) {
    console.log(val, "val")
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const { data, error } = await supabase
        .from("service_listings") // Replace with your table name
        .update({
          blockStatus: {
            isBlocked: !val.isBlocked,
            reason: val.reason,
            blockedBy: val.blockedBy,
          },
        }) // Pass the updated data object
        .eq("id", id); // Filter by id

      if (!error) {
        setListData((prev) => ({
          ...prev,
          blockStatus: {
            ...listData.blockStatus,
            isBlocked: !prev.blockStatus.isBlocked,
          },
        }));
      } else {
        alert("something went wrong. Please try again");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white rounded md">
      <div className="p-3">
        <div className="flex justify-between flex-wrap">
          <div className="w-[60%]">
            <div className="flex justify-between mb-[14px]">
              <h3 className="text-[20px] font-semibold">{listData.title}</h3>
              <div className="flex gap-1 items-center">
                <div className="group-hover:hidden transition-opacity duration-300">
                  <button
                    className="py-1"
                    onClick={(e) => handleBlock(e, listData.blockStatus)}
                  >
                    {listData?.blockStatus?.isBlocked ? (
                      <div className="flex justify-center items-center gap-2">
                        <img src={disable_img} alt="disable_img" />
                        <p className="text-[20px]">Disable</p>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <img src={enable_img} alt="enable_img" />
                        <p className="text-[20px]">Enable</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <p className="mb-[18px] text-[14px] text-[#00000099]">
              {listData?.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {listData?.images?.length > 0 &&
                listData?.images?.map((item, index) => (
                  <div key={index} className="relative rounded-md w-[250px] overflow-hidden group">
                    {/* Image */}
                    <img
                      className="rounded-md w-full object-cover cursor-pointer"
                      src={item}
                      onClick={() => handleViewImage(item)}
                      alt="listDetail"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleViewImage(item)}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium shadow-lg hover:bg-gray-200 transition"
                      >
                        View Image
                      </button>
                    </div>
                  </div>
                ))}
              {isOpen && (
                <Lightbox
                  mainSrc={currentImage}
                  onCloseRequest={() => setIsOpen(false)}
                  enableZoom={true} // Allows zooming
                />
              )}
            </div>

          </div>

          <div className="">
            <h3 className="text-[20px] font-medium mb-[24px]">Posted By</h3>
            <div className="xl:flex mt-[30px]">
              <div className="w-full lg:w-7/12 xl:w-[399px] lg:flex">
                <div className="bg-[#6C4DEF] px-[30px] py-5 rounded-[10px] flex-grow flex relative group overflow-hidden">
                  {/* User Info */}
                  <div className="flex items-center">
                    <div className="pe-5 border-e-[1px] border-[#FFFFFF66]">
                      <img
                        className="w-[78px] h-[78px] rounded-full object-cover"
                        src={listData?.user_detail?.image}
                        alt="image of user"
                      />
                      <h1 className="font-medium lg:text-base xl:text-lg text-white mt-2.5 text-center">
                        {listData?.user_detail?.firstName}
                      </h1>
                      <h2 className="text-sm font-normal text-white mt-1 text-center">
                        {listData?.user_detail?.lastName}
                      </h2>
                    </div>
                    <div className="ps-5">
                      <div className="flex gap-2.5 items-center">
                        <PhoneIcon />
                        <h3 className="text-sm font-normal text-white">
                          {listData?.user_detail?.mobile_number}
                        </h3>
                      </div>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <EmailIcon />
                        <h3 className="text-sm font-normal text-white">
                          {"email@gmail.com"}
                        </h3>
                      </div>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <LocationIcon />
                        <h3 className="text-sm font-normal text-white">
                          {"Hisar, Haryana B street 352"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Link to={`/dashboard/usersList/userDetails/${listData?.user_detail?.id}`}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-medium rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"

                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr className="my-[32px] border-dotted border-t-0 border-2 " />

        <div className="rounded-md">
          <div className="bg-[#DDDADA4D] p-3 rounded-md ">
            <h4 className="font-semibold text-[20px]">Reviews</h4>

            <div className="flex gap-[83px] items-center flex-wrap">
              <div className="flex items-center gap-5">
                <span className="text-[48px]">{listData?.rating}</span>
                <div>
                  <div className="flex gap-2">
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                  </div>
                  <p className="mt-2">{listData?.reviewCount} reviews</p>
                </div>
              </div>

              <div className="flex gap-5 items-center">
                <div>
                  <img src={star} alt="star" />
                </div>
                <div className="flex">
                  <div className="relative group">
                    <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity  rounded-md h-[50px] w-[90px] py-[2px] bg-[#FF7F00] text-center -top-[60px] -left-[20px] ">
                      <p className="text-white">1.44k</p>
                      <p className="text-white text-[12px]">1 star Ratings</p>
                    </div>
                    <div className=" rounded-md h-[7px] w-[20px] bg-[#FF7F00]"></div>
                  </div>

                  <div className="relative group">
                    <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity  rounded-md h-[50px] w-[90px] py-[2px] bg-[#FF6565] text-center -top-[60px] -left-[20px] ">
                      <p className="text-white">2.41k</p>
                      <p className="text-white text-[12px]">2 star Ratings</p>
                    </div>
                    <div className=" rounded-md h-[7px] w-[40px] bg-[#FF6565]"></div>
                  </div>

                  <div className="relative group">
                    <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity  rounded-md h-[50px] w-[90px] py-[2px] bg-[#6C4DEF] text-center -top-[60px] -left-[20px] ">
                      <p className="text-white">1.44k</p>
                      <p className="text-white text-[12px]">3 star Ratings</p>
                    </div>
                    <div className=" rounded-md h-[7px] w-[40px] bg-[#6C4DEF]"></div>
                  </div>

                  <div className="relative group">
                    <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity  rounded-md h-[50px] w-[90px] py-[2px] bg-[#0DA800] text-center -top-[60px] -left-[20px] ">
                      <p className="text-white">2.44k</p>
                      <p className="text-white text-[12px]">4 star Ratings</p>
                    </div>
                    <div className=" rounded-md h-[7px] w-[50px] bg-[#0DA800]"></div>
                  </div>

                  <div className="relative group">
                    <div className=" absolute opacity-0 group-hover:opacity-100 transition-opacity  rounded-md h-[50px] w-[90px] py-[2px] bg-[#a84c00] text-center -top-[60px] -left-[20px] ">
                      <p className="text-white">4.44k</p>
                      <p className="text-white text-[12px]">5 star Ratings</p>
                    </div>
                    <div className=" rounded-md h-[7px] w-[30px] bg-[#a84c00]"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[18px] font-medium">5.12k</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* testimonial section */}

        <div className="flex  flex-col gap-5">
          {[0, 1, 2, 3, 4].map((item, index) => {
            return (
              <div key={index}>
                <hr className="my-[32px] border-dotted border-t-0 border-2 " />
                <div className="flex  items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <img src={user} alt="user" />
                    </div>
                    <div>
                      <h5 className="font-medium text-[14px]">Rovert Fox</h5>

                      <p className="text-[#00000099] text-[10px]">
                        Nov 25, 2024{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                    <div>
                      <img src={star} alt="star" />
                    </div>
                  </div>
                </div>

                <p className="text-[#00000099] text-[14px] mt-[22px]">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here to a , content here', making it look like readable
                  English. Many desktop publishing packages and web page editors
                  now use Lorem Ipsum as their default model text, and a search
                  for 'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};

export default ListingDetails;
