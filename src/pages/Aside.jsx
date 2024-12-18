import React from 'react';
import { Arrowicon, Message, Notificationicon, Searchicon } from '../Components/Common/Icons';
import Boy from "../assets/Images/Png/Boy.png";
import Graph1 from "../assets/Images/Png/Graph1.png";
import Graph2 from "../assets/Images/Png/Graph2.png";
import { cardData } from '../Components/Common/Helper';
import Charts from '../Components/Charts';
import Piechart from '../Components/Common/Piechart';


function Aside() {


    return (
        <div>
            <div className='bg-[#F7F7F7] py-3 px-[14px]'>
                <div className='flex items-center justify-between'>
                    <div className='flex bg-[white] lg:w-[337px] rounded-[20px] px-[13px] py-[16px] items-center shadow-lg'>
                        <Searchicon />
                        <input type="text" className='outline-none bg-[transparent] opacity-[50%] ms-[10px]' placeholder='search task' />
                    </div>

                    <div className='flex items-center'>
                        <div className='h-[50px] w-[50px] rounded-full bg-[white] flex items-center justify-center'>
                            <Message />
                        </div>
                        <div className='h-[50px] w-[50px] rounded-full bg-[white] flex items-center justify-center mx-[14px]'>
                            <Notificationicon />
                        </div>
                        <div className='flex items-center'>
                            <div className='h-[56px] w-[56px] bg-[#6C4DEF] rounded-full flex items-center justify-center'>
                                <img src={Boy} alt="Boy" />
                            </div>
                            <div className='ms-2'>
                                <p className='font-normal text-[16px] leading-[20px]'>Super Admin</p>
                                <p className='font-normal text-[16px] leading-[20px] opacity-[60%]'>superadmin@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-[#F7F7F7] mt-[15px] px-[14px] py-[15px]'>
                <p className='font-medium text-[28px]'>Dashboard</p>
                <p className='font-normal text-[16px]'>Plan, prioritize, and accomplish your tasks with ease.</p>
                <div className='flex  mt-[16px] -mx-2'>
                    {cardData.map((card, index) => (
                        <div key={index} className=' w-[25%] px-2'>
                            <div className='h-full  border rounded-[10px] px-[20px] py-[24px] shadow-lg bg-[white] hover:bg-[#6C4DEF] hover:text-white group'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-[16px] font-normal'>{card.title}</p>
                                    <div className='h-[28px] w-[28px] rounded-full border border-black group-hover:bg-[white] group-hover:border-none flex items-center justify-center'>
                                        <Arrowicon />
                                    </div>
                                </div>
                                <p className='text-[50px] font-medium mt-[15px]'>{card.count}</p>
                                <div className='flex items-center mt-[12px]'>
                                    <div className='border group-hover:bg-[transparent] group-hover:border-white border-black items-center justify-center flex w-[27px] h-[19px] rounded-[5px] py-2 px-4 opacity-[70%]'>
                                        <p className='text-[12px] font-normal'>{card.increase}</p>
                                    </div>
                                    <p className='text-[12px] font-normal leading-[15px] ms-[10px]'>{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex mt-[15px]'>
                    <div className='w-[79%] bg-[white] rounded-[15px] px-[13px] py-[15px] '>
                        <p className='font-medium text-[18px] text-center'>Overall Performance</p>
                        {/* <img className='w-full mt-[16px]' src={Graph1} alt="graph1" /> */}
                        <Charts/>

                    </div>
                    <div className='bg-white rounded-[10px] w-[25%] ms-[20px] px-[13px] py-[15px] '>
                        <p className='font-medium text-[18px] text-center'>Popular Services</p>
                        {/* <img className='mx-auto' src={Graph2} alt="Graph2" /> */}
                     <div className='flex items-center justify-center my-[22px]'>   <Piechart/></div>

                        <div className='flex items-center justify-between mx-[36px] mt-[15px]'>
                            <div className='flex items-center'>
                                <div className='h-[14px] w-[14px] rounded-full bg-[#2B4DED]'></div>
                                <p className='text-[12px] font-medium ms-[10px]'>Car Washing</p>
                            </div>
                            <p className='text-[12px] font-medium'>65%</p>
                        </div>
                        <div className='flex items-center justify-between mx-[36px] mt-[15px]'>
                            <div className='flex items-center'>
                                <div className='h-[14px] w-[14px] rounded-full bg-[#FF9E69]'></div>
                                <p className='text-[12px] font-medium ms-[10px]'>Plumbing</p>
                            </div>
                            <p className='text-[12px] font-medium'>65%</p>
                        </div>
                        <div className='flex items-center justify-between mx-[36px] mt-[15px]'>
                            <div className='flex items-center'>
                                <div className='h-[14px] w-[14px] rounded-full bg-[#FFD1A7]'></div>
                                <p className='text-[12px] font-medium ms-[10px]'>Carpainter</p>
                            </div>
                            <p className='text-[12px] font-medium'>65%</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default Aside;
