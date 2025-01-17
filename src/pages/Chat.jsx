import React, { useState } from 'react';
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
  const [selectedChat, setSelectedChat] = useState(null);

  const chatData = [
    {
      id: 1,
      imgSrc: ChatImg1,
      name: 'Sharuka Nijibum',
      message: 'I have got a date at quarter to eight; I’LL...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 2,
      imgSrc: ChatImg2,
      name: 'Sharuka Nijibum',
      message: 'I have got a date at quarter to eight; I’LL...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 3,
      imgSrc: ChatImg3,
      name: 'Urito Nisemuno',
      message: 'I have got a date at quarter to eight; I’LL...',
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
      message: 'When a doctor doctors, a doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
    {
      id: 7,
      imgSrc: ChatImg7,
      name: 'Sharuka Nijibum',
      message: 'When a doctor doctors, a doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
  ];

  const defaultChat = chatData[0];

  const handleBackClick = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div
        className={`p-3 border rounded-lg overflow-x-auto custom-scrollbar w-full lg:w-[40%] md:h-[70vh] lg:h-[80vh] ${
          selectedChat ? 'hidden lg:block' : 'block'
        }`}>
        <div className="flex items-center sticky top-0 px-4 bg-white border border-opacity-30 border-gray-800 rounded-lg z-10">
          <UserIcon />
          <input
            type="text"
            placeholder="People, Groups and Messages"
            className="w-full outline-none bg-white ms-2.5 h-[40px] text-sm placeholder:text-gray-400"
          />
        </div>
        <div className="border rounded-md border-gray-300 mt-5 h-[40px] bg-gray-100">
          <div className="flex text-center">
            <h2 className="flex-1 font-normal pt-2 text-sm rounded-[7px] h-[40px] text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer">
              All
            </h2>
            <h2 className="flex-1 font-normal pt-2 text-sm h-[40px] rounded-[7px] text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer">
              Read
            </h2>
            <h2 className="flex-1 font-normal pt-2 text-sm h-[40px] rounded-[7px] text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer">
              Unread
            </h2>
          </div>
        </div>
        {chatData.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="flex items-center mt-4 hover:bg-purple-100 px-3 py-3 cursor-pointer rounded-lg">
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <img src={chat.imgSrc} alt="Chat" className="h-full object-cover" />
            </div>
            <div className="w-8/12 ps-4 flex flex-col justify-center">
              <h2 className="font-medium text-sm text-black">{chat.name}</h2>
              <p className="font-normal text-sm text-gray-600 pt-1 truncate">{chat.message}</p>
            </div>
            <div className="w-3/12 text-right flex flex-col justify-center">
              <p className="font-normal text-xs whitespace-nowrap">{chat.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`p-3 border rounded-lg w-full lg:w-[60%] md:h-[60vh] lg:h-[80vh] overflow-x-auto custom-scrollbar  flex flex-col ${
          selectedChat ? 'block' : 'hidden'
        } lg:block`}>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg ">{(selectedChat || defaultChat).name}</h2>
          <button onClick={handleBackClick} className="text-blue-500 font-medium text-sm lg:hidden">
            Back
          </button>
        </div>

        <div className=" flex-grow mb-3 pr-2  custom-scrollbar">
          <div className="bg-gray-300 p-4 w-[60%]   rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <h2 className=" text-black font-normal text-xs">5 Min Ago</h2>

        <div className=" flex-grow mb-3 pr-2 custom-scrollbar flex justify-end">
          <div className="bg-[#3D464D] w-[60%] text-white p-4 rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <h2 className=" text-black text-end font-normal text-xs">3 Min Ago</h2>
        <div className="flex-grow mb-3 pr-2 custom-scrollbar">
          <div className="bg-gray-300 p-4 w-[60%]   rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>

        <div className=" flex-grow mb-3 pr-2 custom-scrollbar">
          <div className="bg-gray-300 p-4 w-[60%]   rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <h2 className=" text-black  font-normal text-xs">2 Min Ago</h2>
        <div className=" flex-grow mb-3 pr-2 custom-scrollbar flex justify-end">
          <div className="bg-[#3D464D] w-[60%] text-white p-4 rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <h2 className=" text-black  font-normal text-xs text-end">Just Now</h2>

        <div className=" flex-grow mb-3 pr-2 custom-scrollbar">
          <div className="bg-gray-300 p-4 w-[60%]   rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <div className=" flex-grow mb-3 pr-2 custom-scrollbar flex justify-end">
          <div className="bg-[#3D464D] w-[60%] text-white p-4 rounded-t-xl rounded-br-xl">
            <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
          </div>
        </div>
        <h2 className=" text-black lg:mb-[10%]   font-normal text-xs text-end">Just Now</h2>

        <div className="flex items-center gap-3  border-t pt-4 fixed bottom-0  md:w-[70%] lg:w-[43%] bg-white">
          <div className="flex-grow bg-gray-300 rounded-full px-4 ">
            <input
              type="text"
              placeholder="Enter your message"
              className="w-full outline-none bg-transparent py-4 placeholder:text-black text-sm"
            />
          </div>
          <PepaerClikupIcon className="cursor-pointer" />
          <MessageSendIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
