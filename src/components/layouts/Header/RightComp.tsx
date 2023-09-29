import { useTruncate } from "../../../components/custom-hooks";
import { logout } from "../../../redux/reducer/authReducer";
import AuthService from "../../../services/auth.service";
import NotificationService from "../../../services/notification.service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import notification from "../../../../public/icons/notification.svg";
// import dashboard from "../../../../public/icons/dashboard.svg";
// import down from "../../../../public/icons/down.svg";
import { Cookies, useCookies } from 'react-cookie';

function RightComp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authService = new AuthService();
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const [cookies, setCookie, removeCookie] = useCookies(['deep-access']);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async (event: any) => {
    event.stopPropagation();
    dispatch(logout());
    localStorage.clear();

    removeCookie("deep-access", { path: "/" });
    router.push("/http://192.81.213.226/30/auth/login");
    
    NotificationService.success({
      message: "Logout operation successful!",
    });
    setDropdown(false);
  };

  const userName = () => userInfo?.firstName + " " + userInfo?.lastName;
  const userInitials = () => userInfo?.firstName[0] + userInfo?.lastName[0];

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
      {/* <div className={`${styles.view1} hidden md:flex`}>
        <Image
          src={dashboard}
          alt="dashbaord"
          width={20}
          height={20}
          className="self-center"
          style={{ alignSelf: "center" }}
          priority
        />
      </div> */}

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
            className="absolute bg-sirp-lightGrey text-[13px] py-2 px-2 w-[90px] text-center top-[3rem] md:mr-[7.5rem] rounded-lg items-center justify-center"
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