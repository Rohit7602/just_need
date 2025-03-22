/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import disable_img from "../../assets/png/disable_img.png";
import enable_img from "../../assets/png/enable_img.png";
import {

  RatingStarIcon,
} from "../../assets/icon/Icons";
import { Link } from "react-router-dom";
import { useListingContext } from "../../store/ListingContext";
import { supabase } from "../../store/supabaseCreateClient";
import { truncateText } from "../../utility/wordTruncate";


const Listing = () => {
  const { fetchlisting } = useListingContext();
  const [listData, setListData] = useState([]);

  async function getData() {
    const value = await fetchlisting();

    setListData([...value]);
  }
  //handle block
  async function handleBlock(e, id, val) {
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
        setListData((prevState) =>
          prevState.map((item) =>
            item.id == id
              ? {
                ...item,
                blockStatus: {
                  ...item.blockStatus,
                  isBlocked: !item.blockStatus.isBlocked,
                },
              }
              : item
          )
        );
      } else {
        alert("something went wrong. Please try again");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (listData.length !== 0) {
    return (
      <div>
        <div className="bg-white rounded-md p-5">
          <div className="flex flex-row flex-wrap -mx-3">
            {listData?.map((item) => (
              <Link
                to={`${item.id}`}
                className="w-6/12 mt-3 xl:mt-[15px] xl:w-3/12 px-3"
                key={item.id}
              >
                <div className="h-full">
                  <div className="border-[1px] h-full border-[#ebeaea] rounded-[15px] relative group">
                    <img
                      className=" w-full rounded-t-md group-hover:opacity-70"
                      src={item.images[0]}
                      alt="Listing"
                    />

                    <div className="p-2.5">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-black">
                          {item.title}
                        </p>
                        <div className="group-hover:hidden transition-opacity duration-300">
                          <button className="py-1">
                            {item.blockStatus.isBlocked ? (
                              <img src={disable_img} alt="disable_img" />
                            ) : (
                              <span className="text-xs font-normal text-[#0DA800] hover:opacity-100 opacity-100">
                                <img src={enable_img} alt="enable_img" />
                              </span>
                            )}
                          </button>
                        </div>
                        <div className="hidden py-[3px] group-hover:block  transition-opacity duration-300">
                          <button
                            onClick={(e) =>
                              handleBlock(e, item.id, item.blockStatus)
                            }
                          >
                            {item.blockStatus.isBlocked ? (
                              <span className="text-sm font-normal text-[#0DA800] hover:opacity-100 opacity-100">
                                <p>Enable</p>
                              </span>
                            ) : (
                              <span className="text-sm font-normal text-[#a81400] hover:opacity-100 opacity-100">
                                <p>Disable</p>
                              </span>
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No data found</div>;
  }
};

export default Listing;
