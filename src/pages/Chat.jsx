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
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-5">
      <div className="lg:w-[475px] w-full p-3">
        <div className="flex items-center px-4 bg-white border border-opacity-30 border-gray-800 rounded-lg">
          <UserIcon />
          <input
            type="text"
            placeholder="People, Groups and Messages"
            className="w-full outline-none bg-white ms-2.5 py-3 text-sm md:text-base placeholder:text-gray-400"
          />
        </div>
        <div className="border rounded-md border-gray-300 mt-5 bg-gray-100">
          <div className="flex text-center">
            <h2 className="flex-1 font-normal py-2 md:py-3 text-sm md:text-base text-gray-700 hover:text-blue-500 hover:bg-white cursor-pointer rounded-tl-lg">
              All
            </h2>
            <h2 className="flex-1 font-normal py-2 md:py-3 text-sm md:text-base text-gray-700 hover:text-blue-500 hover:bg-white cursor-pointer">
              Read
            </h2>
            <h2 className="flex-1 font-normal py-2 md:py-3 text-sm md:text-base text-gray-700 hover:text-blue-500 hover:bg-white cursor-pointer rounded-tr-lg">
              Unread
            </h2>
          </div>
        </div>
        {chatData.map((chat, index) => (
          <div
            key={chat.id}
            className="flex items-center mt-4 hover:bg-purple-100 px-2 py-3 cursor-pointer rounded-lg">
            <div className="w-2/12">
              <img src={chat.imgSrc} alt="Chat" className="rounded-full" />
            </div>
            <div className="w-8/12 ps-4 flex flex-col justify-center ">
              <h2 className="font-medium text-sm md:text-base text-black">{chat.name}</h2>
              <p className="font-normal text-xs md:text-sm text-gray-600  pt-3 lg:pt-4 truncate">
                {chat.message}
              </p>
            </div>
            <div className="lg:w-6/12 text-right flex flex-col justify-center ">
              <p className="font-normal text-xs md:text-sm">{chat.time}</p>
              <div className="flex justify-end lg: pt-5">
                {index < 2 ? <Icon1 /> : index === 2 ? <Icon3 /> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:w-[570px] w-full p-3">
        <div className="bg-gray-300 p-4 rounded-t-xl rounded-br-xl  lg:w-[400px]">
          <p className="font-normal text-sm md:text-base">
            Hi, there I am having some problem with my delivered product
          </p>
        </div>
        <p className="font-normal text-xs md:text-sm pt-2">3 Min Ago</p>
        <div className=" float-right">
          <div className="bg-gray-800 text-white   p-4 rounded-t-xl rounded-bl-xl lg:w-[410px]">
            <p className="font-normal text-sm md:text-base  ">
              Lorem ipsum dolor sit amet consectetur. Luctus duis feugiat ac tristique leo vitae
              lobortis. Nisl ultricies felis a sed egestas netus. Velit viverra morbi nec
              scelerisque aliquam.
            </p>
          </div>
          <p className="font-normal text-xs md:text-sm pt-2 float-right">Just Now</p>
        </div>
        <div className="flex  gap-3 mt-5 float-left">
          <div className="flex-grow bg-gray-300 rounded-full py-2 px-4 sm:w-[50vh]  lg:w-[390px]">
            <input
              type="text"
              placeholder="Enter your message"
              className="w-full outline-none bg-transparent pt-2 ps-5 placeholder:text-black text-sm md:text-base"
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
