import React from 'react';
import { UserIcon } from '../assets/icon/Icons';
import ChatImg1 from '../assets/png/chatImg 1.png';
import ChatImg2 from '../assets/png/chatImg2.png';
import ChatImg3 from '../assets/png/chatImg3.png';
import ChatImg4 from '../assets/png/chatImg4.png';
import ChatImg5 from '../assets/png/chatImg5.png';
import ChatImg6 from '../assets/png/chatImg6.png';
import ChatImg7 from '../assets/png/chatImg7.png';

import { Icon1, Icon3, MessageSendIcon, PepaerClikupIcon } from '../assets/icon/Icons';

const Chat = () => {
  const chatData = [
    {
      id: 1,
      imgSrc: ChatImg1,
      name: 'Sharuka Nijibum',
      message: 'I have got a date at quater to eight; I’LL...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 2,
      imgSrc: ChatImg2,
      name: 'Sharuka Nijibum',
      message: 'I have got a date at quater to eight; I’LL...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 3,
      imgSrc: ChatImg3,
      name: 'Urito Nisemuno',
      message: 'I have got a date at quater to eight; I’LL...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 4,
      imgSrc: ChatImg4,
      name: 'Abshini Thipano',
      message: 'An anchor, right?',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 5,
      imgSrc: ChatImg5,
      name: 'Xiang ledepisipang',
      message: 'A tree-toad loved she-toad who lived up in ..',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 6,
      imgSrc: ChatImg6,
      name: 'Sharuka Nijibum',
      message: 'When a doctor doctors,a  doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 7,
      imgSrc: ChatImg7,
      name: 'Sharuka Nijibum',
      message: 'When a doctor doctors,a  doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 8,
      imgSrc: ChatImg7,
      name: 'Sharuka Nijibum',
      message: 'When a doctor doctors,a  doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5 h">
      <div className="lg:w-[100vh] w-full p-3 border rounded-lg overflow-x-auto h-[80vh]">
        <div className="flex items-center sticky w-[54vh] top-0 px-4 bg-white border border-opacity-30 border-gray-800 rounded-lg z-10">
          <UserIcon />
          <input
            type="text"
            placeholder="People,  Groups and Messages"
            className="w-full outline-none  bg-white ms-2.5 h-[40px] text-sm md:text-sm placeholder:text-gray-400"
          />
        </div>
        <div className="border rounded-md  border-gray-300 h-[40px] mt-5  bg-gray-100">
          <div className="flex text-center ">
            <h2 className="flex-1 font-normal  pt-2 text-sm rounded-md md:text-sm text-gray-700 hover:bg-blue-500 h-[38px]   hover:text-white cursor-pointer ">
              All
            </h2>
            <h2 className="flex-1 font-normal pt-2  text-sm md:text-sm text-gray-700 hover:bg-blue-500  hover:text-white h-[38px]  rounded-md cursor-pointer">
              Read
            </h2>
            <h2 className="flex-1 font-normal pt-2  text-sm md:text-sm text-gray-700 hover:bg-blue-500  hover:text-white  h-[38px]  rounded-md cursor-pointer rounded-tr-lg">
              Unread
            </h2>
          </div>
        </div>

        {chatData.map((chat, index) => (
          <div
            key={chat.id}
            className="flex items-center mt-4 hover:bg-purple-100 px-[17%] py-3 cursor-pointer rounded-lg ps-3">
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <img src={chat.imgSrc} alt="Chat" className=" h-full object-cover" />
            </div>
            <div className="w-8/12 ps-4 flex flex-col justify-center">
              <h2 className="font-medium text-sm md:text-sm text-black">{chat.name}</h2>
              <p className="font-normal text-sm md:text-sm text-gray-600 pt-3 lg:pt-1 truncate">
                {chat.message}
              </p>
            </div>
            <div className="lg:w-3/12 text-right flex flex-col justify-center">
              <p className="font-normal text-sm md:text-sm whitespace-nowrap">{chat.time}</p>
              <div className="flex justify-end pt-2">
                {index < 2 ? <Icon1 /> : index === 2 ? <Icon3 /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border w-full p-3 lg:pe-[40px] rounded-lg h-[80vh] flex flex-col">
        <div className="overflow-y-auto flex-grow mb-3 pr-2">
          <div className="bg-gray-300 p-4 rounded-t-xl rounded-br-xl lg:w-[400px]">
            <p className="font-normal text-sm md:text-sm">
              Hi, there I am having some problem with my delivered product
            </p>
          </div>
          <p className="font-normal text-xs md:text-sm pt-2">12 Min Ago</p>
          <div className="flex justify-end flex-col items-end">
            <div className="bg-gray-800 text-white p-4 rounded-t-xl rounded-bl-xl w-[60vh]">
              <p className="font-normal text-sm md:text-sm">
                Lorem ipsum dolor sit amet consectetur. Luctus duis feugiat ac tristique leo vitae
                lobortis. Nisl ultricies felis a sed egestas netus. Velit viverra morbi nec
                scelerisque aliquam.
              </p>
            </div>
            <p className="font-normal text-xs md:text-sm pt-2">Just Now</p>
          </div>
          <div className="bg-gray-300 p-4 rounded-t-xl rounded-br-xl lg:w-[400px]">
            <p className="font-normal text-sm md:text-sm">
              Hi, there I am having some problem with my delivered product
            </p>
          </div>
          <p className="font-normal text-xs md:text-sm pt-2">12 Min Ago</p>
          <div className="flex justify-end flex-col items-end">
            <div className="bg-gray-800 text-white p-4 rounded-t-xl rounded-bl-xl w-[60vh]">
              <p className="font-normal text-sm md:text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde modi minus
              </p>
            </div>
            <p className="font-normal text-xs md:text-sm pt-2">Just Now</p>
          </div>
        </div>

        {/* Fixed input area at the bottom */}
        <div className="flex items-center gap-3 w-full border-t pt-4">
          <div className="flex-grow bg-gray-300 rounded-full px-4">
            <input
              type="text"
              placeholder="Enter your message"
              className="w-full outline-none bg-transparent py-4 placeholder:text-black text-sm md:text-base"
            />
          </div>

          <PepaerClikupIcon className="cursor-pointer " />

          <MessageSendIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
