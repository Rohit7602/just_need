/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import disable_img from "../../assets/png/disable_img.png";
import enable_img from "../../assets/png/enable_img.png";
import {

  DownArrow,
  FilterSvg,
  RatingStarIcon,
} from "../../assets/icon/Icons";
import { Link } from "react-router-dom";
import { useListingContext } from "../../store/ListingContext";
import { supabase } from "../../store/supabaseCreateClient";
import { truncateText } from "../../utility/wordTruncate";
import { CiFilter, CiSearch } from "react-icons/ci";
import FiltersPopup from "../../Components/Popups/Filterpop";
import FilterComponent from "../../Components/Popups/Filterpop";


const Listing = () => {
  const { fetchlisting } = useListingContext();
  const [listData, setListData] = useState([]);
  const [isFilterPopup, setIsfilterPopup] = useState(false)






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
          <div className="flex justify-between items-center mb-[17px]">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="font-medium text-[20px] text-[#000000] opacity-[70%]">posted listing</h1>
              </div>
              <button className="border border-[#F1F1F1] text-[#00000099] py-[7px] px-[20px] rounded-[10px] flex items-center gap-2">
                My Action
                <span>
                  <DownArrow />
                </span>
              </button>
            </div>

            <div className="flex items-center">
              <div className="flex rounded-[10px] items-center p-2 h-[42px] bg-[#F1F1F1] xl:me-[20px]">
                <CiSearch className="ms-2" />
                <input
                  type="text"
                  placeholder="Search task"
                  className="ms-2.5 focus:outline-none focus:ring-gray-400 bg-[#F1F1F1]"
                />
              </div>
              <button
                className="mx-5 w-[40px] h-[40px] bg-[#F1F1F1] flex items-center justify-center rounded-[10px]"
              >
                <FilterSvg />
              </button>

              <button onClick={() => setIsfilterPopup(!isFilterPopup)}
                className="bg-[#0832DE] text-white px-[15px] py-2 rounded-[10px] flex items-center"
              >
                <span>
                  <CiFilter className="w-[24px] h-[24px] me-[12px]" />
                </span>
                Filter
              </button>
            </div>
          </div>

          <div className="flex flex-row flex-wrap -mx-3">
            {listData?.map((item) => (
              <Link
                to={`${item.id}`}
                className="w-6/12 mt-3 xl:mt-[15px] xl:w-3/12 px-3 "
                key={item.id}
              >

                <div className="h-full">
                  <div className="border-[1px] h-full border-[#ebeaea] rounded-[15px] relative group">
                    <div className="relative">
                      <img
                        className=" w-full rounded-t-md group-hover:opacity-70 "
                        src={item.images[0]}
                        alt="Listing"
                      />
                      <button className="absolute bg-[#6C4DEF] z-20 text-white py-[2px] px-2 rounded-tr-[20px] rounded-br-[20px] bottom-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item?.categoryName}</button>
                    </div>

                    <div className="p-2.5">
                      <div className="flex  justify-between items-center">
                        <p className="font-medium text-sm text-black">
                          {item.title}
                        </p>
                        <p>Feb 12</p>
                      </div>


                      <div className="flex justify-between mt-[5px]">
                        <div>
                          <p className="font-medium text-[18px]">₹ 2,500</p>
                        </div>
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
                      <div className="flex items-center justify-between gap-1 mt-2">
                        <div>
                          <p className="font-normal text-[#00000099] text-[12px]">Hisar, Haryana</p>
                        </div>
                        <div className="flex gap-3 items-center bg-[#FFA5001A] rounded-[50px] py-[2px] px-[5px]">
                          <RatingStarIcon />
                          <h3 className="text-[#000F02] text-[10px] font-normal">
                            {item.rating}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {isFilterPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white w-[325px]">
              <FilterComponent onClose={() => setIsfilterPopup(false)} />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <div>No data found</div>;
  }
};

export default Listing;
