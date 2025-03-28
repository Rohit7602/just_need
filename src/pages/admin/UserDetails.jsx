/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EmailIcon,
  LocationIcon,
  PhoneIcon,
  RatingStarIcon,
  DisableRedicon,
  EnableRedIcon,
} from "../../assets/icon/Icons";
import MechanicImage from "../../assets/Images/Png/dummyimage.jpg";
import DisableProviderPopUp from "../../Components/Popups/DisableProviderPopUp";
import disable_img from "../../assets/png/disable_img.png";
import enable_img from "../../assets/png/enable_img.png";
import { useListingContext } from "../../store/ListingContext";
import { supabase } from "../../store/supabaseCreateClient";
import { toast } from "react-toastify";
import { truncateText } from "../../utility/wordTruncate";
import { useCustomerContext } from "../../store/CustomerContext";
import { useUserContext } from "../../store/UserContext";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [showPopupDisable, setShowPopupDisable] = useState(false);
  const [listings, setListings] = useState([]);

  const { users, loading, setLoading } = useCustomerContext();
  const { fetchlisting } = useListingContext();

  const { setUserName } = useUserContext()


  // Fetch user details and listings
  useEffect(() => {
    const fetchData = async () => {
      if (users && users.length > 0) {
        const foundUser = users.find((user) => user.id === id);
        if (foundUser) {
          setUser(foundUser);
          if (setUser) {
            setUserName(foundUser?.firstName)
          }

          const listingVal = await fetchlisting();
          const filteredListings = listingVal?.filter(
            (item) => item?.user_detail?.id === id
          );
          setListings(filteredListings || []);
        } else {
          console.error("User not found");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [users, id, setLoading, fetchlisting]);

  // Handle disable/enable provider popup
  const handlePopupDisable = () => {
    setShowPopupDisable(!showPopupDisable);
  };

  // Handle block/unblock listing
  const handleBlock = async (e, listing) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      const updatedBlockStatus = {
        isBlocked: !listing.blockStatus.isBlocked,
        reason: listing.blockStatus.reason || "",
        blockedBy: listing.blockStatus.blockedBy || "admin",
      };

      const { data, error } = await supabase
        .from("service_listings")
        .update({ blockStatus: updatedBlockStatus })
        .eq("id", listing.id);

      if (!error) {
        setListings((prev) =>
          prev.map((item) =>
            item.id === listing.id
              ? { ...item, blockStatus: updatedBlockStatus }
              : item
          )
        );
        toast.success("Update successful");
      } else {
        console.error("Error updating block status:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const isActive = user.accountStatus === "active";

  return (
    <div className="px-4">
      <div className="flex items-center justify-center">
        <button
          onClick={handlePopupDisable}
          className="flex items-center gap-3 py-2.5 h-[42px] px-3 xl:px-[15px] rounded-[10px]"
        >
          {isActive ? (
            <>
              <DisableRedicon />
              <span className="text-black font-normal text-base">
                Disable Provider
              </span>
            </>
          ) : (
            <>
              <EnableRedIcon />
              <span className="text-black font-normal text-base">
                Enable Provider
              </span>
            </>
          )}
        </button>
      </div>

      <div className="xl:flex mt-[30px]">
        <div className="w-full lg:w-7/12 xl:w-[399px] xl:pe-2.5 lg:flex">
          <div className="bg-[#6C4DEF] px-[30px] py-5 rounded-[10px] flex-grow flex">
            <div className="flex items-center">
              <div className="pe-5 border-e-[1px] border-[#FFFFFF66]">
                <img
                  className="w-[78px] h-[78px] rounded-full object-cover"
                  src={user?.image || MechanicImage}
                  alt="user"
                />
                <h1 className="font-medium lg:text-base xl:text-lg text-white mt-2.5 text-center">
                  {user?.firstName}
                </h1>
                <h2 className="text-sm font-normal text-white mt-1 text-center">
                  {user?.category}
                </h2>
              </div>
              <div className="ps-5">
                <div className="flex gap-2.5 items-center">
                  <PhoneIcon />
                  <h3 className="text-sm font-normal text-white">
                    {user?.mobile_number}
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <EmailIcon />
                  <h3 className="text-sm font-normal text-white">
                    {user?.useremail}
                  </h3>
                </div>
                <div className="flex gap-2.5 items-center mt-2.5">
                  <LocationIcon />
                  <h3 className="text-sm font-normal text-white">
                    {user?.address?.map((item) => `${item.city}/${item.state}`)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {user?.IsSeller && (
          <div className="w-full lg:w-7/12 xl:w-[646px] xl:ps-2.5 mt-3 xl:mt-0 flex">
            <div className="bg-[#F1F1F1] rounded-[10px] p-[15px] pb-7 flex-grow flex flex-col">
              <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066]">
                Business details
              </p>
              <div className="flex items-center mt-3 xl:mt-[15px]">
                <div className="w-4/12">
                  <h2 className="font-medium text-sm xl:text-base text-black">
                    Business Name:
                  </h2>
                </div>
                <div className="w-10/12">
                  <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                    {user?.businessDetail?.businessName}
                  </h2>
                </div>
              </div>
              <div className="flex items-center mt-3 xl:mt-[15px]">
                <div className="w-4/12">
                  <h2 className="font-medium text-sm xl:text-base text-black">
                    Service Name:
                  </h2>
                </div>
                <div className="w-10/12">
                  <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                    {user?.businessDetail?.description}
                  </h2>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="w-4/12">
                  <h2 className="font-medium text-sm xl:text-base text-black">
                    Categories:
                  </h2>
                </div>
                <div className="w-10/12">
                  <h2 className="text-[#000000B2] text-sm xl:text-base font-normal">
                    {user?.businessDetail?.categories?.map((item, index) => (
                      <span key={index}>
                        {item.categoryName}
                        {index < user.businessDetail.categories.length - 1 && ', '}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {user?.IsSeller && (
        <>
          <p className="font-medium text-lg leading-[22px] text-black pb-2.5 border-b-[0.5px] border-dashed border-[#00000066] mt-[30px]">
            Posted Listing
          </p>
          {listings.length > 0 ? (
            <div className="flex flex-row flex-wrap -mx-3">
              {listings.map((item) => (
                <Link
                  to={`/dashboard/listings/${item.id}`}
                  key={item.id}
                  className="w-6/12 mt-3 xl:mt-[15px] xl:w-3/12 px-3"
                >
                  <div className="border-[1px] border-[#ebeaea] rounded-[10px] relative group transition-all cursor-pointer">
                    <img
                      className="rounded-[10px] w-full group-hover:opacity-70 hover:bg-gray-100"
                      src={item.images?.[0]}
                      alt="Listing"
                    />
                    <div className="p-2.5">
                      <div className="flex items-center justify-between h-[40px]">
                        <p className="font-medium text-sm text-black">
                          {item.title}
                        </p>
                        <div className="p-2">
                          <button onClick={(e) => handleBlock(e, item)}>
                            {item?.blockStatus?.isBlocked ? (
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
                      <p className="font-normal text-[14px] text-[#00000099] mt-1">
                        {truncateText(item.description, 50)}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <RatingStarIcon />
                        <h3 className="text-[#000F02] text-[10px] font-normal">
                          {item.rating} | {item.reviewCount} reviews
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-center">No listings found</p>
          )}
        </>
      )}

      {showPopupDisable && (
        <DisableProviderPopUp
          handlePopupDisable={handlePopupDisable}
          userId={id}
        />
      )}
    </div>
  );
}

export default UserDetails;