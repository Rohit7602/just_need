import React, { useState } from 'react';
import { UserIcon } from '../assets/icon/Icons';
import ChatImg1 from '../assets/png/chatImg 1.png';
import ChatImg2 from '../assets/png/chatImg2.png';
import ChatImg3 from '../assets/png/chatImg3.png';
import ChatImg4 from '../assets/png/chatImg4.png';
import ChatImg5 from '../assets/png/chatImg5.png';
import ChatImg6 from '../assets/png/chatImg6.png';
import ChatImg7 from '../assets/png/chatImg7.png';
import {
  Icon1,
  Icon3,
  MessageSendIcon,
  PepaerClikupIcon,
  VideoCollIcon,
  SearchIconChat,
  DoteedIconChat,
} from '../assets/icon/Icons';
import { BackArrowIcon } from '../assets/icon/Icon';

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
      message:
        'When a doctor doctors, a doctor does the When a doctor doctors, a doctor does the When a doctor doctors, a doctor does the ...',
      time: 'Yesterday, 10 AM',
    },
  ];

  const defaultChat = chatData[0];

  const handleBackClick = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-white rounded-[10px]">
      <div
        className={`p-3 border rounded-lg overflow-y-auto  custom-scrollbar w-full lg:w-[35%] md:h-[70vh] lg:h-[80vh] ${
          selectedChat ? 'hidden lg:block' : 'block'
        }`}>
        <div className="flex items-center sticky top-0 px-4 bg-white z-10 border border-opacity-30 border-gray-800 rounded-lg  ">
          <UserIcon />
          <input
            type="text"
            placeholder="People, Groups and Messages"
            className="w-full outline-none bg-white ms-2.5 h-[40px] text-sm placeholder:text-gray-400"
          />
        </div>
        <div className="border rounded-md mt-3 border-gray-300 h-[40px] bg-gray-100">
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
            className="flex items-center mt-4 w-full ps-3 pe-5 hover:bg-purple-100 py-1 cursor-pointer rounded-lg">
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <img src={chat.imgSrc} alt="Chat" className="h-full object-cover" />
            </div>
            <div className="w-8/12 ps-4 flex flex-col justify-center">
              <h2 className="font-medium text-sm text-black">{chat.name}</h2>
              <p className="font-normal text-sm text-gray-600 pt-1 truncate">{chat.message}</p>
            </div>
            <div className="w-3/12 text-right flex flex-col justify-center">
              <p className="font-normal text-[10px] whitespace-nowrap">{chat.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`border rounded-lg w-full lg:w-[65%] md:h-[60vh] relative lg:h-[80vh] overflow-x-auto custom-scrollbar flex flex-col ${
          selectedChat ? 'block' : 'hidden'
        } lg:block`}>
        <div className="flex justify-between sticky top-0 z-10  items-center bg-gray-300 py-3">
          <div className="flex">
            <button
              onClick={handleBackClick}
              className="text-blue-500 font-medium text-sm lg:hidden ps-3">
              <BackArrowIcon />
            </button>
            <div className="flex items-center ps-3">
              <img
                src={(selectedChat || defaultChat).imgSrc}
                alt={(selectedChat || defaultChat).name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <h2 className="font-bold text-lg">{(selectedChat || defaultChat).name}</h2>
            </div>
          </div>
          <div className="flex items-center">
            <a href="">
              <VideoCollIcon />
            </a>
            <a className="pe-3 ps-3" href="">
              <SearchIconChat />
            </a>
            <a className="pe-5" href="">
              <DoteedIconChat />
            </a>
          </div>
        </div>
        <div className="p-3  h-[60vh]">
          <div className="flex-grow mb-3 pr-2 custom-scrollbar">
            <div className="bg-gray-300 p-2.5 px-3 w-[60%] max-w-[60%] rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
              <p className="absolute bottom-1 right-3 text-xs text-black">
                {(selectedChat || defaultChat).time}
              </p>
            </div>
            <div className="bg-gray-300 p-2.5  mt-3 px-3 w-[60%] max-w-[60%] rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
              <p className="absolute bottom-1 right-3 text-xs text-black">
                {(selectedChat || defaultChat).time}
              </p>
            </div>
          </div>

          <div className="flex-grow mb-3 pr-2 custom-scrollbar  flex justify-end">
            <div className="bg-[#3D464D] p-2.5 px-3 w-[60%]  max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
              <p className="absolute bottom-1 right-3 text-xs text-white">
                {(selectedChat || defaultChat).time}
              </p>
            </div>
          </div>

          <div className="flex-grow mb-3 pr-2 custom-scrollbar">
            <div className="bg-gray-300 p-2.5 px-3 w-[60%] max-w-[60%] rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
              <p className="absolute bottom-1 right-3 text-xs text-black">
                {(selectedChat || defaultChat).time}
              </p>
            </div>
          </div>

          <div className="flex-grow mb-3 pr-2 custom-scrollbar flex justify-end">
            <div className="bg-[#3D464D] p-2.5 px-3 w-[60%] max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm">{(selectedChat || defaultChat).message}</p>
              <p className="absolute bottom-1 right-3 text-xs text-white">
                {(selectedChat || defaultChat).time}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sticky bottom-0 bg-white mt-[15%]  w-full py-4 px-5">
          <div className="flex-grow bg-gray-300 rounded-full px-4">
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
