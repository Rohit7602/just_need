import { useEffect, useState } from "react";
import user from "../../assets/png/user for listing.png";
import star from "../../assets/png/star.png";
import { useParams } from "react-router-dom";
import disable_img from "../../assets/png/disable_img.png";
import enable_img from "../../assets/png/enable_img.png";
import { supabase } from "../../store/supabaseCreateClient";
import { EmailIcon, LocationIcon, PhoneIcon } from "../../assets/icon/Icons";
import { useListingContext } from "../../store/ListingContext";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const ListingDetails = () => {
  const [listData, setListData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const { id } = useParams();
  const { fetchlistingWithId } = useListingContext();

  // Fetch listing data
  async function getData() {
    try {
      setLoading(true); // Start loading
      const value = await fetchlistingWithId(id);
      if (!value || !value.images) {
        throw new Error("No data or images found");
      }
      setListData(value);
      setError(null);
    } catch (err) {
      console.error("Error fetching listing:", err);
      setError("Failed to load listing details. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Handle image view
  const handleViewImage = (image) => {
    if (image) {
      console.log("Opening image:", image); // Debug log
      setCurrentImage(image);
      setIsOpen(true);
    } else {
      console.error("No image provided to view");
    }
  };

  // Handle block/unblock
  async function handleBlock(e, val) {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("service_listings")
          .update({
            blockStatus: {
              isBlocked: !val.isBlocked,
              reason: val.reason,
              blockedBy: val.blockedBy,
            },
          })
          .eq("id", id);

        if (error) throw error;

        setListData((prev) => ({
          ...prev,
          blockStatus: {
            ...prev.blockStatus,
            isBlocked: !prev.blockStatus.isBlocked,
          },
        }));
      } catch (err) {
        console.error("Error updating block status:", err);
        alert("Something went wrong. Please try again.");
      }
    }
  }

  useEffect(() => {
    getData();
  }, [id]); // Add `id` as dependency to refetch if it changes

  // Render loading, error, or content
  if (loading) {
    return (
      <div className="bg-white rounded-md p-3 text-center">
        <p>Loading...</p> {/* Replace with a spinner if desired */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-md p-3 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md">
      <div className="p-3">
        <div className="flex justify-between flex-wrap">
          <div className="w-[60%]">
            <div className="flex justify-between mb-[14px]">
              <h3 className="text-[20px] font-semibold">{listData.title}</h3>
              <div className="flex gap-1 items-center">
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
            <p className="mb-[18px] text-[14px] text-[#00000099]">
              {listData?.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {listData?.images?.length > 0 ? (
                listData.images.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-md w-[250px] overflow-hidden group"
                  >
                    <img
                      className="rounded-md w-full object-cover cursor-pointer"
                      src={item}
                      onClick={() => handleViewImage(item)}
                      alt={`listDetail-${index}`}
                      onError={(e) => {
                        e.target.src = "path/to/fallback-image.png"; // Fallback image if loading fails
                        console.error(`Failed to load image: ${item}`);
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleViewImage(item)}
                        className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium shadow-lg hover:bg-gray-200 transition"
                      >
                        View Image
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
              {isOpen && currentImage && (
                <Lightbox
                  mainSrc={currentImage}
                  onCloseRequest={() => setIsOpen(false)}
                  enableZoom={true}
                  imageLoadErrorMessage="Failed to load image"
                />
              )}
            </div>
          </div>

          <div className="">
            <h3 className="text-[20px] font-medium mb-[24px]">Posted By</h3>
            <div className="xl:flex mt-[30px]">
              <div className="w-full lg:w-7/12 xl:w-[399px] lg:flex">
                <div className="bg-[#6C4DEF] px-[30px] py-5 rounded-[10px] flex-grow flex">
                  <div className="flex items-center">
                    <div className="pe-5 border-e-[1px] border-[#FFFFFF66]">
                      <img
                        className="w-[78px] h-[78px] rounded-full object-cover"
                        src={listData?.user_detail?.image || user} // Fallback to default user image
                        alt="user"
                        onError={(e) => (e.target.src = user)} // Fallback on error
                      />
                      <h1 className="font-medium lg:text-base xl:text-lg text-white mt-2.5 text-center">
                        {listData?.user_detail?.firstName || "Unknown"}
                      </h1>
                      <h2 className="text-sm font-normal text-white mt-1 text-center">
                        {listData?.user_detail?.lastName || ""}
                      </h2>
                    </div>
                    <div className="ps-5">
                      <div className="flex gap-2.5 items-center">
                        <PhoneIcon />
                        <h3 className="text-sm font-normal text-white">
                          {listData?.user_detail?.mobile_number || "N/A"}
                        </h3>
                      </div>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <EmailIcon />
                        <h3 className="text-sm font-normal text-white">
                          {listData?.user_detail?.useremail || "email@gmail.com"}
                        </h3>
                      </div>
                      <div className="flex gap-2.5 items-center mt-2.5">
                        <LocationIcon />
                        <h3 className="text-sm font-normal text-white">
                          {listData?.user_detail?.address?.[0]?.city
                            ? `${listData.user_detail.address[0].city}, ${listData.user_detail.address[0].state}`
                            : "Hisar, Haryana B street 352"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-[32px] border-dotted border-t-0 border-2" />

        <div className="rounded-md">
          <div className="bg-[#DDDADA4D] p-3 rounded-md">
            <h4 className="font-semibold text-[20px]">Reviews</h4>
            <div className="flex gap-[83px] items-center flex-wrap">
              <div className="flex items-center gap-5">
                <span className="text-[48px]">{listData?.rating || "N/A"}</span>
                <div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={star} alt="star" />
                    ))}
                  </div>
                  <p className="mt-2">{listData?.reviewCount || 0} reviews</p>
                </div>
              </div>
              {/* Reviews section remains unchanged */}
            </div>
          </div>
        </div>

        {/* Testimonial section remains unchanged */}
        <div className="flex flex-col gap-5">
          {[0, 1, 2, 3, 4].map((item, index) => (
            <div key={index}>
              <hr className="my-[32px] border-dotted border-t-0 border-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user} alt="user" />
                  <div>
                    <h5 className="font-medium text-[14px]">Rovert Fox</h5>
                    <p className="text-[#00000099] text-[10px]">Nov 25, 2024</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={star} alt="star" />
                  ))}
                </div>
              </div>
              <p className="text-[#00000099] text-[14px] mt-[22px]">
                It is a long established fact that a reader will be distracted...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;