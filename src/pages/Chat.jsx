import React, { useState } from "react";
import { UserIcon } from "../assets/icon/Icons";
import ChatImg1 from "../assets/png/chatImg 1.png";
import ChatImg2 from "../assets/png/chatImg2.png";
import ChatImg3 from "../assets/png/chatImg3.png";
import ChatImg4 from "../assets/png/chatImg4.png";
import ChatImg5 from "../assets/png/chatImg5.png";
import ChatImg6 from "../assets/png/chatImg6.png";
import ChatImg7 from "../assets/png/chatImg7.png";

import Logo from "../assets/png/Frame 1000004210.png";
import {
  Icon1,
  Icon3,
  MessageSendIcon,
  PepaerClikupIcon,
  VideoCollIcon,
  SearchIconChat,
  DoteedIconChat,
  DoumentIcon,
  ImgaesIcon,
} from "../assets/icon/Icons";
import { BackArrowIcon } from "../assets/icon/Icon";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const chatData = [
    {
      id: 1,
      imgSrc: ChatImg1,
      name: "Sharuka Nijibum",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday, 2:00 AM",
    },
    {
      id: 2,
      imgSrc: ChatImg2,
      name: "Urito Nisemuno",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday, 11:00 AM",
    },
    {
      id: 3,
      imgSrc: ChatImg3,
      name: "Abshini Thipano",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday,  5:00 AM",
    },
    {
      id: 4,
      imgSrc: ChatImg4,
      name: "Xiang ledepisipang",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday,  9:00 AM",
    },
    {
      id: 5,
      imgSrc: ChatImg5,
      name: "Sharuka Nijibum",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday,  6:00 AM",
    },
    {
      id: 6,
      imgSrc: ChatImg6,
      name: "Sharuka Nijibum",
      message:
        " lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit",
      time: "Yesterday,  10:00 AM",
    },
    {
      id: 7,
      imgSrc: ChatImg7,
      name: "Sharuka Nijibum",
      message: "I have got a date at quarter to eight; I’LL...",
      time: "Yesterday, 12:33 AM",
    },
  ];

  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const defaultChat = chatData[0];

  const handleBackClick = () => {
    setSelectedChat(null);
  };

  const extractTime = (dateTime) => {
    const timePart = dateTime.split(", ")[1];
    return timePart;
  };

  const [Tudo, setTudo] = useState(false);
  const ClickMe = () => {
    setTudo(!Tudo);
  };

  const [image, setImage] = useState(Logo);
  const openLocalFile = (event, type) => {
    const file = event.target.files[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImage(fileURL);

      if (type === "document") {
        window.open(fileURL, "_blank");
      } else if (type === "image") {
        window.open(fileURL, "_blank");
      }
    }
  };

  // Filter chat data based on search query
  const filteredChatData = chatData.filter((chat) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      chat.name.toLowerCase().includes(lowerCaseQuery) ||
      chat.message.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row p-5 bg-white rounded-[10px]">
      {/* Left sidebar - Chat List */}
      <div
        className={`pe-4 rounded-lg overflow-y-auto custom-scrollbar w-full lg:w-[35%] lg:h-[80vh] ${
          selectedChat ? "hidden lg:block" : "block"
        }`}
      >
        <div className="flex items-center sticky top-0 px-4 bg-white z-10 border border-opacity-30 border-gray-800 rounded-lg">
          <UserIcon />
          <input
            type="text"
            placeholder="People, Groups and Messages"
            className="w-full outline-none bg-white ms-2.5 h-[40px] text-sm placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Chat Filter Tabs */}
        <div className="border rounded-md mt-3 border-gray-300 h-[40px] bg-gray-100">
          <div className="flex text-center">
            <button
              className={`flex-1 font-normal text-sm rounded-[7px] h-[40px] cursor-pointer ${
                activeButton === "All"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handleButtonClick("All")}
            >
              All
            </button>
            <button
              className={`flex-1 font-normal text-sm rounded-[7px] h-[40px] cursor-pointer ${
                activeButton === "Read"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handleButtonClick("Read")}
            >
              Read
            </button>
            <button
              className={`flex-1 font-normal text-sm rounded-[7px] h-[40px] cursor-pointer ${
                activeButton === "Unread"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => handleButtonClick("Unread")}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Chat List */}
        {filteredChatData.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="flex items-center mt-4 w-full ps-3 pe-5 hover:bg-purple-100 py-1 cursor-pointer rounded-lg"
          >
            <div className="w-[40px] h-[40px] flex-shrink-0">
              <img
                src={chat.imgSrc}
                alt="Chat"
                className="h-full object-cover"
              />
            </div>
            <div className="w-8/12 ps-4 flex flex-col justify-center">
              <h2 className="font-medium text-sm text-black">{chat.name}</h2>
              <p className="font-normal text-sm text-gray-600 pt-1 truncate">
                {chat.message}
              </p>
            </div>
            <div className="w-3/12 text-right flex flex-col justify-center">
              <p className="font-normal text-[10px] whitespace-nowrap">
                {extractTime(chat.time)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`border rounded-lg w-full lg:w-[65%] md:h-[60vh] relative lg:h-[80vh] overflow-x-auto custom-scrollbar flex flex-col ${
          selectedChat ? "block" : "hidden"
        } lg:block`}
      >
        <div className="flex justify-between sticky top-0 z-10 items-center bg-gray-300 py-3">
          <div className="flex">
            <button
              onClick={handleBackClick}
              className="text-blue-500 font-medium text-sm lg:hidden ps-3"
            >
              <BackArrowIcon />
            </button>
            <div className="flex items-center ps-3">
              <img
                src={(selectedChat || defaultChat).imgSrc}
                alt={(selectedChat || defaultChat).name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <h2 className="font-bold text-lg">
                {(selectedChat || defaultChat).name}
              </h2>
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

        <div className="flex-grow mb-3 pr-2 custom-scrollbar ps-2 flex flex-col space-y-3">
          <div className="flex mb-3 pr-2 mt-3 ">
            <div className="bg-gray-300 p-2 px-4 max-w-[60%] text-black rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-black pt-4">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>

          <div className="flex mb-3 pr-2 justify-end">
            <div className="bg-[#3D464D] p-2 px-4 max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-white">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 mt-3 ">
            <div className="bg-gray-300 p-2 px-4 max-w-[60%] text-black rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-black pt-4">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 justify-end">
            <div className="bg-[#3D464D] p-2 px-4 max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-white">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 mt-3 ">
            <div className="bg-gray-300 p-2 px-4 max-w-[60%] text-black rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-black pt-4">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 justify-end">
            <div className="bg-[#3D464D] p-2 px-4 max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-white">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 mt-3 ">
            <div className="bg-gray-300 p-2 px-4 max-w-[60%] text-black rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-black pt-4">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 justify-end">
            <div className="bg-[#3D464D] p-2 px-4 max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-white">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 mt-3 ">
            <div className="bg-gray-300 p-2 px-4 max-w-[60%] text-black rounded-t-xl rounded-br-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-black pt-4">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
          <div className="flex mb-3 pr-2 justify-end">
            <div className="bg-[#3D464D] p-2 px-4 max-w-[60%] text-white rounded-t-xl rounded-tl-xl rounded-bl-xl relative">
              <p className="font-normal text-sm pb-1">
                {(selectedChat || defaultChat).message}
              </p>
              <p className="absolute bottom-0 right-3 text-[10px] text-white">
                {extractTime((selectedChat || defaultChat).time)}
              </p>
            </div>
          </div>
        </div>

        {/* Message Input Area */}
        <div className="flex items-center gap-3 sticky top-full bg-white py-4 px-5">
          <div className="flex-grow bg-gray-300 rounded-full px-4">
            <input
              type="text"
              placeholder="Enter your message"
              className="w-full outline-none bg-transparent py-4 placeholder:text-black text-sm"
            />
          </div>

          <span className="relative" onClick={ClickMe}>
            <PepaerClikupIcon className="cursor-pointer" />
            {Tudo && (
              <div className="right-0 top-[-200%] bg-white absolute border-[1px] rounded-t-xl rounded-tl-xl rounded-bl-xl p-3 z-10 w-[200px]">
                <label className="flex items-center pb-3 cursor-pointer">
                  <DoumentIcon />
                  <h2 className="font-medium text-base ps-2">Document</h2>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    style={{ display: "none" }}
                    onChange={(e) => openLocalFile(e, "document")}
                  />
                </label>
                <div className="border-[1px] w-[100px] border-black"></div>
                <label className="flex items-center pt-2 cursor-pointer">
                  <ImgaesIcon />
                  <h2 className="font-medium text-base ps-3">Image</h2>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => openLocalFile(e, "image")}
                  />
                </label>
              </div>
            )}
          </span>
          <MessageSendIcon className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
