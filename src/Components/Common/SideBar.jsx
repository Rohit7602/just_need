import React from "react";
import CustomerServiceLogo from "../../assets/png/customerServiceLogo.png";
import { NavLink, useLocation } from "react-router-dom";
import {
  CustomerSvg,
  DasboardSvg,
  LogoutSvg,
  ProviderSvg,
  ServiceRequestSvg,
  ServicesSvg,
  SettingSvg,
  SubsciptionSvg,
  VerticalVilotSvg,
} from "../../assets/icon/Icon";

function SideBar() {
  const location = useLocation()
  const pathName = location.pathname
  return (
    <div className="bg-white pt-[11px] pb-10 rounded-[10px] h-full overflow-y-auto scrollRemove">
      <div className="px-6 pb-[11px]">
        <NavLink to="/dashboard">
          <img className="max-w-[222px]" src={CustomerServiceLogo} alt="logo" />
        </NavLink>
      </div>
      <div className="px-[35px]">
        <div className=" mt-5">
          <h6 className="text-[#00000099] font-normal text-base ps-2.5">
            Menu
          </h6>
        </div>
        <div className="flex items-center mt-4 group_hover">
          <VerticalVilotSvg pathName={pathName} currentpath="/dashboard" />
          <NavLink  to="/dashboard" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <DasboardSvg pathName={pathName} />
            <span className={`font-normal text-base ${pathName=="/dashboard"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Dashboard
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-5 group_hover">
          <VerticalVilotSvg pathName={pathName} currentpath="/dashboard/customers" />
          <NavLink to="/dashboard/customers" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <CustomerSvg pathName={pathName} />
            <span className={`font-normal text-base ${pathName=="/dashboard/customers"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Customer’s
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-5 group_hover">
          <VerticalVilotSvg  pathName={pathName} currentpath="/dashboard/providers"/>
          <NavLink to="/dashboard/providers"   className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <ProviderSvg pathName={pathName} />
            <span className={`font-normal text-base ${pathName=="/dashboard/providers"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Providers
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-5 group_hover">
          <VerticalVilotSvg   pathName={pathName} currentpath="/dashboard/subscription" />
          <NavLink to="/dashboard/subscription" className="flex items-center gap-5 py-2.5 px-[15px] ms-[5px] w-full">
            <SubsciptionSvg pathName={pathName} />
            <span  className={`font-normal text-base ${pathName=="/dashboard/subscription"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Subscription
            </span>
          </NavLink>
        </div>

        <div className="flex items-center mt-5 group_hover">
          <VerticalVilotSvg   pathName={pathName} currentpath="/dashboard/serviceRequest" />
          <NavLink to="/dashboard/serviceRequest" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <ServiceRequestSvg pathName={pathName} />
            <span  className={`font-normal text-base ${pathName=="/dashboard/serviceRequest"?"text-[#6c4def]":"text-[#00000099]"}`}>
            Service Request
            </span>
          </NavLink>
        </div>
        <div className="flex items-center mt-5 group_hover">
          <VerticalVilotSvg   pathName={pathName} currentpath="/dashboard/services" />
          <NavLink to="/dashboard/services" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <ServicesSvg pathName={pathName} />
            <span  className={`font-normal text-base ${pathName=="/dashboard/services"?"text-[#6c4def]":"text-[#00000099]"}`}>
            Services
            </span>
          </NavLink>
        </div>
        <div className=" my-4">
          <h6 className="text-[#00000099] font-normal text-base ps-2.5">
            General
          </h6>
        </div>
        <div className="flex items-center group_hover duration-500">
          <VerticalVilotSvg  pathName={pathName} currentpath="/dashboard/setting" />
          <NavLink to="/dashboard/setting" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <SettingSvg  pathName={pathName}/>
            <span  className={`font-normal text-base ${pathName=="/dashboard/setting"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Setting
            </span>
          </NavLink>
        </div>
        <div className="flex items-center group_hover mt-5">
          <VerticalVilotSvg  pathName={pathName} currentpath="/dashboard/logout" />
          <NavLink to="/dashboard/logout" className="flex items-center py-2.5 px-[15px] gap-5 ms-[5px] w-full">
            <LogoutSvg  pathName={pathName}/>
            <span  className={`font-normal text-base ${pathName=="/dashboard/logout"?"text-[#6c4def]":"text-[#00000099]"}`}>
              Logout
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
