import React from "react";

function SettinGeneral() {
  return (
    <div className="p-[15px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-xl lg:text-[28px] text-[#00000099] leading-[35px]">
            Setting<span className="text-black">/General</span>
          </h1>
          <p className="text-sm lg:text-base font-normal opacity-70 text-black">
            Manage your platform
          </p>
        </div>
        <div>
          <button className="text-base font-normal text-black py-3 px-[28px] rounded-[10px] bg-[#F1F1F1] me-[15px]">
            Discard
          </button>
          <button className="text-base font-normal text-white py-3 px-[28px] rounded-[10px] bg-[#0832DE]">
            Update
          </button>
        </div>
      </div>
      <div className="mt-[15px] border-t-[1px] border-[#00000033]"></div>
      <div className="py-5 mt-[15px]">
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center justify-between lg:w-[48%] gap-5">
            <label
              htmlFor="title"
              className="min-w-[160px] text-base font-normal text-black"
            >
              Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Just Need"
              className="py-[14px] px-[15px] w-full rounded-[10px] bg-[#F2F2F2] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] border-none"
            />
          </div>
          <div className="flex items-center justify-between lg:w-[48%] gap-5 mt-4 lg:mt-0">
            <label
              htmlFor="email"
              className="min-w-[160px] text-base font-normal text-black"
            >
              Email Address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              className="py-[14px] px-[15px] w-full rounded-[10px] bg-[#F2F2F2] placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] border-none"
            />
          </div>
        </div>
        {/* <div className="flex gap-5 items-center mt-[30px]">
          <p className="min-w-[160px] text-base font-normal text-black">
            Platform Logo:
          </p>
          <input type="file" />
        </div> */}
        <div className="flex flex-col lg:flex-row gap-5 lg:items-center mt-[30px]">
          <p className="min-w-[160px] text-base font-normal text-black">
            Platform Appearance:
          </p>
          <div className="flex items-center gap-2.5">
            <p className="min-w-[160px] text-base font-normal text-black">
              Primary Colour
            </p>
            <button className="bg-[#6C4DEF] px-[50px] lg:px-[15px] xl:px-[50px] py-3.5 rounded-[10px] text-white text-sm font-normal">
              #6C4DEF
            </button>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="min-w-[160px] text-base font-normal text-black">
              Secondary Colour
            </p>
            <button className="bg-[#F1F1F1] px-[50px] lg:px-[15px] xl:px-[50px] py-3.5 rounded-[10px] text-black text-sm font-normal">
              #F1F1F1
            </button>
          </div>
        </div>
      </div>
      <div className="my-[15px] border-t-[1px] border-[#00000033]"></div>
      <h1 className="font-medium text-xl text-black leading-[35px]">
        Support and Assistance
      </h1>
      <p className="text-base font-normal opacity-70 text-black">
        Manage your platform Appearance
      </p>
      <div className="py-5 mt-[15px]">
        <div className="flex items-center justify-between gap-5">
          <label
            htmlFor="whatsapp"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Whatsapp Support:
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            placeholder="+91 1234 1234 00"
            className="px-4 py-3.5 placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="tollFree"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Tollfree Number:
          </label>
          <input
            id="tollFree"
            name="tollFree"
            placeholder="1800-000-000"
            className="px-4 py-3.5 placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="supportEmail"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Support Email:
          </label>
          <input
            id="supportEmail"
            name="supportEmail"
            placeholder="support@example.com"
            className="px-4 py-3.5 placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
        <div className="flex items-center justify-between gap-5 mt-5">
          <label
            htmlFor="accountDeleteLink"
            className="text-base font-normal text-[#000000] min-w-[160px] xl:min-w-[260px]"
          >
            Account Deletion Link:
          </label>
          <input
            id="accountDeleteLink"
            name="accountDeleteLink"
            placeholder="https://www.request_accountdelete@example.com"
            className="px-4 py-3.5 placeholder:text-sm placeholder:font-normal text-sm font-normal outline-[#0832DE] w-full border-[1px] border-[#00000033] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  );
}

export default SettinGeneral;
