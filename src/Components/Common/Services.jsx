import React, { useState } from 'react';
import { Editicon, Greenicon, Plusicon, Redicon, Searchicon } from './Icons';
import { servicedata } from "../../Components/Common/Helper";
import Actions from '../Popups/Actions'; 

function Services() {
    const [editIndex, setEditIndex] = useState(null);
    const [editData, setEditData] = useState("");
const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
const [selectedItem, setSelectedItem] = useState(null);

    const handleEditClick = (index, data) => {
        setEditIndex(index); // Set the card to edit mode
        setEditData(data); // Pre-fill the input with the existing data
    };

    const handleInputChange = (e) => {
        setEditData(e.target.value); // Update the input value dynamically
    };

    const handleBlur = (index) => {
        if (editData.trim() !== "") {
            servicedata[index].data = editData; 
        }
        setEditIndex(null); // Exit edit mode
    };
const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item
    setShowPopup(true); // Show the popup
};
const handleOverlayClick = () => {
    setShowPopup(false); // Hide the popup and overlay when overlay is clicked
    setSelectedItem(null); // Clear the selected item
};
  

    return (
        <div className="p-[14px] rounded-[10px] shadow-md bg-white">
            <div className="xl:flex-row flex-col flex xl:items-center justify-between">
                <div>
                    <p className="font-medium text-[28px]">Services</p>
                    <p className="text-[16px] font-normal opacity-[70%] mt-1">
                        Plan, prioritize, and accomplish your tasks with ease.
                    </p>
                </div>
                <div className="flex items-center mt-[20px] xl:mt-[0px]">
                    <div className="bg-[#F1F1F1] w-[337px] p-[16px] rounded-[10px]">
                        <div className="flex items-center">
                            <Searchicon />
                            <input
                                className="text-[16px] font-normal outline-none ms-[10px] bg-transparent"
                                type="text"
                                placeholder="Search Task"
                            />
                        </div>
                    </div>
                    <div className="whitespace-nowrap cursor-pointer bg-[#0832DE] flex items-center px-[16px] py-[12px] rounded-[10px] ms-[20px]">
                        <Plusicon />
                        <p className="font-normal text-[16px] text-white ms-[12px]">
                            Add New Service
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap mt-[16px] -mx-2">
                {servicedata.map((items, index) => (
                    <div key={index} className="w-full md:w-1/2 xl:w-1/3 px-2 mt-4">
                        <div className="relative z-[20] cursor-pointer h-full border-[#0000001A] rounded-[10px] p-[20px] hover:shadow-lg border-[1px] bg-[white] hover:bg-[#6C4DEF] hover:text-white group duration-300">
                            <div className="flex items-center justify-between">
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editData}
                                        onChange={handleInputChange}
                                        onBlur={() => handleBlur(index)}
                                        className="w-full bg-transparent border border-white focus:outline-none p-1 rounded-[10px]"
                                        autoFocus
                                    />
                                ) : (
                                    <p className="p-1 border border-transparent">{items.data}</p>
                                )}
                                <div className="flex items-center">
                                    {editIndex !== index ? (
                                        <>
                                            <div onClick={() => handleEditClick(index, items.data)}>
                                                <Editicon />
                                            </div>
                                            <div className="ms-[20px]">
                                                <Redicon />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="ms-[20px]">
                                            <Greenicon />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="border-t border-dashed border-[#00000066] my-[16px] group-hover:border-[white]"></div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                                       1. {items.val2}
                                    </p>
                                    <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                                       2. {items.val3}
                                    </p>
                                    <p className="opacity-[60%] font-normal text-[12px]">3.{items.val4}</p>
                                </div>
                                <div>
                                    <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                                        4. {items.val5}
                                    </p>
                                    <p className="opacity-[60%] font-normal text-[12px] mb-[10px]">
                                      5.  {items.val6}
                                    </p>
                                    <p className=" font-normal text-[12px]" onClick={() => handleItemClick(items)} >  {items.val7}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
{showPopup && (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[50] flex items-center justify-center " onClick={handleOverlayClick} >
        <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} 
        >
            <Actions selectedItem={selectedItem} />
        </div>
    </div>
)}
         </div>
     );
 }

 export default Services;








