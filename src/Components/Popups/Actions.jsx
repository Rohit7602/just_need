import React, { useState } from 'react';
import { Crossicon, Editicon, Redcrossicon } from '../Common/Icons';
import { Actiondata } from '../Common/Helper';

function Actions() {
    const [showRedIcons, setShowRedIcons] = useState(false);


    const handleDeleteClick = () => {
        setShowRedIcons(true); 
    };

    const handleCancelClick = () => {
        setShowRedIcons(false); 
    };
    function datass(){
        console.log("good")
    }

    return (
        <div>
            <div className="w-[700px] bg-white absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 p-4 rounded-lg shadow-lg ">
               
                <div className="flex items-center justify-between">
                    <p className="text-[18px] font-medium">Profession</p>
                    {showRedIcons ? (
                        <div
                            className="rounded-[10px] bg-[#0832DE] text-white px-[16px] py-3 font-normal text-[16px] cursor-pointer"
                            onClick={handleCancelClick}
                        >
                            Cancel
                        </div>
                    ) : (
                        <div
                            className="bg-[#F1F1F1] py-[12px] ps-[6px] pe-3 flex items-center rounded-[10px] cursor-pointer opacity-[80%]"
                            onClick={handleDeleteClick}
                        >
                            <div className="mx-3">
                                <Crossicon />
                            </div>
                            <p className="font-normal text-[16px]">Delete</p>
                        </div>
                    )}
                </div>

                {/* Data Section */}
                <div className="flex flex-row justify-between mt-[30px]">
                    {Actiondata.map((item, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex items-center">
                                <p className="font-normal text-[16px] me-[12px] cursor-pointer">{item.val1}</p>
                                {showRedIcons ? <Redcrossicon /> : <Editicon  />}
                            </div>
                            <div className="flex items-center mt-[30px]">
                                <p className="font-normal text-[16px] me-[12px] cursor-pointer">{item.val2}</p>
                                {showRedIcons ? <Redcrossicon /> : <Editicon />}
                            </div>
                            <div className="flex items-center mt-[30px]">
                                <p className="font-normal text-[16px] me-[12px] cursor-pointer">{item.val3}</p>
                                {showRedIcons ? <Redcrossicon /> : <Editicon />}
                            </div>
                            <div className="flex items-center mt-[30px]">
                                <p className="font-normal text-[16px] me-[12px] cursor-pointer">{item.val4}</p>
                                {showRedIcons ? <Redcrossicon /> : <Editicon />}
                            </div>
                            <div className="flex items-center mt-[30px]">
                                <p className="font-normal text-[16px] me-[12px] cursor-pointer">{item.val5}</p>
                                {showRedIcons ? <Redcrossicon /> : <Editicon />}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="rounded-[10px] bg-[#0832DE] text-white w-full py-3 mt-[16px] font-normal text-[16px]">
                    Update status
                </button>
            </div>
        </div>
    );
}

export default Actions;





















































































