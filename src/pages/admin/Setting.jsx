import React from "react";
import { SettinWithBgIcon } from "../../assets/icon/Icon";
import { Link } from "react-router-dom";

function Setting() {
  return (
    <div className="p-[15px]">
      <h1 className="font-medium text-xl lg:text-[28px] text-black leading-[35px]">
        Setting
      </h1>
      <p className="text-sm lg:text-base font-normal opacity-70 text-black">
        Manage your platform
      </p>
      <div className="mt-[15px] border-t-[1px] border-[#00000033]"></div>
      <div className="flex -mx-3 flex-wrap">
        <div className="w-6/12 xl:w-5/12 px-3">
          <Link to="/dashboard/setting/general">
            <div className="flex gap-3 xl:gap-5 p-2 xl:p-5 mt-[15px] cursor-pointer">
              <SettinWithBgIcon />
              <div>
                <p className="text-[#6C4DEF] text-sm lg:text-base font-medium leading-[20px]">
                  General / Support and Assistance
                </p>
                <p className="mt-1 text-[#00000099]  text-xs lg:text-sm font-normal">
                  View and update Platform Details, Application Appearance, Logo
                  & Others
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-6/12 xl:w-5/12 px-3">
        <Link to="/dashboard/setting/keysCredentials">
          <div className="flex gap-3 xl:gap-5 p-2 xl:p-5 mt-[15px] cursor-pointer">
            <SettinWithBgIcon />
            <div>
              <p className="text-[#6C4DEF] text-sm lg:text-base font-medium leading-[20px]">
                Keys / Credentials
              </p>
              <p className="mt-1 text-[#00000099] text-xs lg:text-sm font-normal">
                View and update 3rd party SDKs / Keys for your Platform
              </p>
            </div>
          </div>
          </Link>
        </div>
        <div className="w-6/12 xl:w-5/12 px-3">
        <Link to="/dashboard/setting/legal">
          <div className="flex gap-3 xl:gap-5 p-2 xl:p-5 mt-[15px] cursor-pointer">
            <SettinWithBgIcon />
            <div>
              <p className="text-[#6C4DEF]  text-sm lg:text-base font-medium leading-[20px]">
                Legal
              </p>
              <p className="mt-1 text-[#00000099]  text-xs lg:text-sm font-normal">
                View / Update your platform terms of services and privacy policy
              </p>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Setting;
