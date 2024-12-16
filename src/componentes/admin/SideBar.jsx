import React from "react";
import CustomerServiceLogo from "../../assets/png/customerServiceLogo.png";
import { NavLink } from "react-router-dom";
import {
  CustomerSvg,
  DasboardSvg,
  LogoutSvg,
  NextArrowSvg,
  ProviderSvg,
  ServiceRequestSvg,
  SettingSvg,
  SubsciptionSvg,
  VerticalVilotSvg,
} from "../../assets/icon/Icon";

function SideBar() {
  return (
    <div className="bg-[#F7F7F7] pt-[11px] rounded-[10px] h-full">
      <div className="px-6 pb-[11px]">
        <NavLink>
          <img src={CustomerServiceLogo} alt="logo" />
        </NavLink>
      </div>
      <div className="px-[35px]">
        <div className=" mt-5">
          <h6 className="text-[#00000099] font-normal text-base ps-2.5 ff_sen">Menu</h6>
        </div>
        <div className="flex items-center mt-4 group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <DasboardSvg />
            <span className="font-normal text-base text-[#00000099] ff_sen">
              Dashboard
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-2.5 group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <CustomerSvg />
            <span className="font-normal text-base text-[#00000099] ff_sen">
              Customer’s
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-2.5 group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <ProviderSvg />
            <span className="font-normal text-base text-[#00000099] ff_sen">
              Providers
            </span>
            <NextArrowSvg />
          </NavLink>
        </div>
        <div className="flex items-center mt-2.5 group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] ms-[5px] w-full">
            <SubsciptionSvg />
            <span className="font-normal text-base text-[#00000099] ms-5 me-2 ff_sen">
              Subscription
            </span>
            <NextArrowSvg />
          </NavLink>
        </div>

        <div className="flex items-center mt-2.5 group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <ServiceRequestSvg />
            <span className="font-normal text-base text-[#00000099] ff_sen">
              Customer’s
            </span>
          </NavLink>
        </div>
        <div className=" my-4">
          <h6 className="text-[#00000099] font-normal text-base ps-2.5 ff_sen">General</h6>
        </div>
        <div className="flex items-center group_hover">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <SettingSvg/>
            <span className="font-normal text-base text-[#00000099] ff_sen">
            Setting
            </span>
          </NavLink>
        </div>
        <div className="flex items-center group_hover mt-2.5">
          <VerticalVilotSvg />
          <NavLink className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <LogoutSvg/>
            <span className="font-normal text-base text-[#00000099] ff_sen">
            Logout
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
