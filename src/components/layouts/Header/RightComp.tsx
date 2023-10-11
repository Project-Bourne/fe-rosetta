import useTruncate from "../../custom-hooks/getTruncatedText";
import { logout } from "../../../redux/reducer/authReducer";
import AuthService from "../../../services/auth.service";
import NotificationService from "../../../services/notification.service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import DashboardDropdown from "./DropdownItems";
import { Tooltip } from "@mui/material";

function RightComp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [toggleDashboard, setToggleDashboard] = useState(false);
  const authService = new AuthService();
  const [cookies, setCookie, removeCookie] = useCookies(["deep-access"]);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth
  );
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async (event: any) => {
    event.stopPropagation();
    dispatch(logout());
    localStorage.clear();

    removeCookie("deep-access", { path: "/" });
    router.push("http://192.81.213.226:80/auth/login");

    NotificationService.success({
      message: "Logout operation successful!",
    });
    setDropdown(false);
  };

  const userName = () => userInfo?.firstName + " " + userInfo?.lastName;
  const userInitials = () => {
    if (userInfo?.firstName && userInfo?.lastName[0])
      return userInfo?.firstName[0] + userInfo?.lastName[0];
  };

  return (
    <div className="flex flex-row items-center self-start">
      <div className={`${styles.view1} bg-white`}>
        <Image
          src={require("../../../../public/icons/notification.svg")}
          alt="notification"
          width={20}
          height={20}
          className="self-center"
          style={{ alignSelf: "center" }}
          priority
        />
      </div>
      <div className={`${styles.view1} hidden md:flex relative`}>
        <Tooltip title={toggleDashboard ? "Close modules" : "Open all modules"}>
          <Image
            src={require("../../../../public/icons/dashboard.svg")}
            alt="dashboard"
            width={20}
            height={20}
            className="self-center"
            onClick={() => setToggleDashboard((prevState) => !prevState)}
            style={{ alignSelf: "center" }}
            priority
          />
        </Tooltip>
        {toggleDashboard && <DashboardDropdown />}
      </div>

      <div className="relative bg-sirp-lightGrey flex flex-row mr-2 py-2 px-2 md:px-5 h-[45px] rounded-[12px] items-center justify-center cursor-pointer">
        <div className="flex flex-row items-center justify-center">
          <img
            src={userInfo?.image ?? userInitials()}
            alt="userImage"
            width={25}
            height={25}
            className="rounded-full object-fill"
          />

          <Image
            src={require("../../../../public/icons/down.svg")}
            alt="down"
            width={18}
            height={18}
            className="mx-3 object-contain hidden md:block"
            priority
            onClick={() => setDropdown((prevState) => !prevState)}
          />
        </div>

        {/* line break */}
        <div className="h-[100%] w-[0.5px] bg-sirp-grey hidden md:block" />

        <div className="ml-3 bg-sirp-lightGrey w-full self-center hidden md:block">
          <h2 className="text-sirp-grey text-[13px] capitalize">
            {userInfo?.firstName && useTruncate(userName(), 14)}
          </h2>
          <h2 className="text-sirp-primary text-[11px]">
            {userInfo?.role?.roleName}
          </h2>
        </div>
        <Image
          src={require("../../../../public/icons/down.svg")}
          alt="ellipsis"
          width={18}
          height={18}
          className="mx-3 object-contain flex md:hidden"
          priority
        />

        {dropdown && (
          <div
            className="absolute bg-sirp-lightGrey text-black text-[13px] py-2 px-2 w-[90px] text-center top-[3rem] md:mr-[7.5rem] rounded-lg items-center justify-center"
            onClick={handleLogout}
          >
            <p>Log Out</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  view1:
    "bg-sirp-lightGrey cursor-pointer flex py-2 px-2 rounded-[15px] w-[45px] h-[45px] items-center justify-center content-center mr-4",
};

export default RightComp;
