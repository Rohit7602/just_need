import React from 'react';
import { Arrowicon, Message, Notificationicon, Searchicon } from '../Components/Common/Icons';


import { cardData } from '../Components/Common/Helper';
import Charts from '../Components/Charts';
import Piechart from '../Components/Common/Piechart';
import blur from "../assets/Images/Png/blur.png"
import CustomerTable from '../Components/CustomerTable';


function Aside() {


    return (
        <div>


            <div className='  px-[14px] bg-white'>
                <p className='font-medium text-[28px]'>Dashboard</p>
                <p className='font-normal text-[16px] opacity-[70%]'>Plan, prioritize, and accomplish your tasks with ease.</p>


                <div className='flex flex-wrap mt-[16px] -mx-2'>
                    {cardData.map((card, index) => (
                        <div key={index} className='w-full sm:w-[50%] lg:w-[25%] px-2 mb-4'>
                            <div className='relative z-[20] cursor-pointer h-full border-[#0000001A] rounded-[10px] px-[20px] py-[24px] hover:shadow-lg border-[1px] bg-[white] hover:bg-[#6C4DEF] hover:text-white group duration-300'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[16px] font-normal opacity-[80%]'>{card.title}</p>
                                    <div className='h-[28px] w-[28px] rounded-full border border-black group-hover:bg-[white] group-hover:border-none flex items-center justify-center'>
                                        <Arrowicon />
                                    </div>
                                </div>
                                <p className='text-[50px] font-medium mt-[15px]'>{card.count}</p>
                                <div className='flex items-center mt-[12px]'>
                                    <div className='border group-hover:bg-[transparent] group-hover:border-white border-black items-center justify-center flex w-[27px] h-[19px] rounded-[5px] py-2 px-4 opacity-[70%]'>
                                        <p className='text-[12px] font-normal'>{card.increase}</p>
                                    </div>
                                    <p className='text-[12px] font-normal leading-[15px] ms-[10px] '>{card.description}</p>
                                </div>
                                {/* Absolute div to show on hover */}

                                <img className='absolute z-[10] start-[0px] bottom-[20px] ' src={blur} alt="blur" />

                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-wrap justify-between mt-[15px] gap-y-[15px]'>
                    {/* Overall Performance Section */}
                    <div className='w-full lg:w-[75%]'>
                        <div className=' bg-[white] rounded-[15px] px-[13px] py-[15px] '>
                            <p className='font-medium text-[18px] text-center'>Users Requisition Performance</p>
                            <Charts />
                        </div>
                    </div>

                    {/* Popular Services Section */}
                    <div className='w-full lg:w-[25%] ps-4 '>
                        <div className=' bg-white rounded-[10px] px-[13px] py-[15px] h-full border-[#0000001A] border-[1px]'>
                            <p className='font-medium text-[18px] text-center'>Popular Services</p>
                            <div className='flex items-center justify-center my-[22px]'>
                                <Piechart />
                            </div>

                            {/* Service Details */}
                            <div className='w-[60%] xl:w-4/5 lg:w-full mx-auto'>
                                <div className='flex items-center justify-between gap-10 mt-[15px]'>
                                    <div className='flex items-center'>
                                        <div className='h-[14px] w-[14px] rounded-full bg-[#2B4DED]'></div>
                                        <p className='text-[12px] font-medium ms-[10px] opacity-[50%]'>Car Washing</p>
                                    </div>
                                    <p className='text-[12px] font-medium opacity-[90%]'>60%</p>
                                </div>
                                <div className='flex items-center justify-between gap-10 mt-[15px]'>
                                    <div className='flex items-center'>
                                        <div className='h-[14px] w-[14px] rounded-full bg-[#FF9E69]'></div>
                                        <p className='text-[12px] font-medium ms-[10px] opacity-[50%]'>Plumbing</p>
                                    </div>
                                    <p className='text-[12px] font-medium opacity-[90%]'>20%</p>
                                </div>
                                <div className='flex items-center justify-between gap-10 mt-[15px]'>
                                    <div className='flex items-center'>
                                        <div className='h-[14px] w-[14px] rounded-full bg-[#FFD1A7]'></div>
                                        <p className='text-[12px] font-medium ms-[10px] opacity-[50%]'>Carpainter</p>
                                    </div>
                                    <p className='text-[12px] font-medium opacity-[90%]'>15%</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='mt-[45px]'>  <CustomerTable /></div>

            </div>


        </div>
    );
}

export default Aside;




