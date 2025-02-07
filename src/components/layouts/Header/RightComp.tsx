import { useTruncate } from '@/components/custom-hooks';
import AuthService from '@/services/auth.service';
import NotificationService from '@/services/notification.service';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import notification from '../../../../public/icons/notification.svg';
import dashboard from '../../../../public/icons/dashboard.svg';
import down from '../../../../public/icons/down.svg';
import { Cookies, useCookies } from 'react-cookie';
import DropdownItems from './DropdownItems';
import CustomModal from '@/components/ui/CustomModal';
import { logout } from '@/redux/reducer/authReducer';
import authService from '@/services/auth.service';

function RightComp() {
  const [, removeCookie] = useCookies(['deep-access', 'uuid']);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo, userAccessToken } = useSelector((state: any) => state?.auth);
  const [dropdown, setDropdown] = useState(false);
  const [toggleDashboard, setToggleDashboard] = useState(false);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const cookies = new Cookies();

  const handleLogout = async (event: any) => {
    event.stopPropagation();

    const access = cookies.get("deep-access");

    const refreshToken = userAccessToken || access;

    authService.prototype.logout({ refreshToken })
    .then((res) => {
      if(res){
          dispatch(logout());
          localStorage.clear();

          removeCookie("deep-access", { path: "/" });
          router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`);

          NotificationService.success({
            message: "Logout operation successful!",
          });
        }else{
          NotificationService.error({
            message: "Logout Failed!",
          });
        }
      })
    setDropdown(false);
  };

  const handleCancelLogout = () => {
    setLogoutConfirmation(false);
    setDropdown(false);
  };

  const handleLogoutToggle = () => {
    setDropdown(prevState => !prevState);
    setToggleDashboard(false);
  };

  const handleDashboardToggle = () => {
    setToggleDashboard(prevState => !prevState);
    setDropdown(false);
  };

  const userName = () => userInfo?.firstName + ' ' + userInfo?.lastName;
  const userInitials = () =>
    (userInfo?.firstName?.[0] ?? '') + (userInfo?.lastName?.[0] ?? '');

  return (
    <div className="flex flex-row items-center self-start">
      {/* <div className={`${styles.view1} bg-white`}>
        <Image
          src={notification}
          alt="notification"
          width={20}
          height={20}
          className="self-center"
          style={{ alignSelf: "center" }}
          priority
        />
      </div> */}

      <div className="relative">
        <div
          className="grid justify-center mt-3.5"
          onClick={handleDashboardToggle}
        >
          <div className={`${styles.view1} hidden md:flex`}>
            <Image
              src={dashboard}
              alt="dashboard"
              width={20}
              height={20}
              className="self-center"
              style={{ alignSelf: 'center' }}
              id="dashboard"
              priority
            />
          </div>
          <label
            className="text-[12px] mx-2 hover:cursor-pointer"
            htmlFor="dashboard"
          >
            Menu
          </label>
        </div>
        {toggleDashboard && <DropdownItems />}
      </div>

      {/* <div
        className={`${styles.view1} hidden md:flex relative`}
        onClick={handleDashboardToggle}
      >
        <Image
          src={dashboard}
          alt="dashboard"
          width={20}
          height={20}
          className="self-center"
          style={{ alignSelf: 'center' }}
          priority
        />
        {toggleDashboard && <DropdownItems />}
      </div> */}

      <div className="relative bg-sirp-lightGrey flex flex-row mr-2 py-2 px-2 md:px-5 h-[45px] rounded-[12px] items-center justify-center cursor-pointer">
        <div
          className="flex flex-row items-center justify-center"
          onClick={handleLogoutToggle}
        >
          {userInfo?.image ? (
            <Image
              src={userInfo?.image || userInitials() || "DS"}
              alt="X"
              width={25}
              height={25}
              className="rounded-full object-fill"
              priority
            />
          ) : (
            <div className="h-[32px] w-[32px] aspect-square flex items-center justify-center rounded-full bg-sirp-primary">
              <p className="text-white text-[12px] font-extrabold">
                {userInitials()}
              </p>
            </div>
          )}


          <Image
            src={down}
            alt="down"
            width={18}
            height={18}
            className="mx-3 object-contain hidden md:block"
            priority
          />
        </div>

        {/* line break */}
        <div className="h-[100%] w-[0.5px] bg-sirp-grey hidden md:block" />

        <div
          className="ml-3 bg-sirp-lightGrey w-full self-center hidden md:block"
          onClick={() => {
            router.replace(`http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/settings/profile`);
          }}
        >
          <h2 className="text-sirp-grey text-[13px] capitalize">
            {userInfo?.firstName && useTruncate(userName(), 14)}
          </h2>
          <h2 className="text-sirp-primary text-[11px] capitalize">
            {userInfo?.role?.roleName}
          </h2>
        </div>

        <Image
          src={down}
          alt="ellipsis"
          width={18}
          height={18}
          className="mx-3 object-contain flex md:hidden"
          priority
        />

        {dropdown && (
          <div
            className="absolute bg-sirp-lightGrey text-black text-[13px] py-2 px-2 w-[90px] text-center top-[3rem] md:mr-[7.5rem] rounded-lg items-center justify-center"
            onClick={() => setLogoutConfirmation(true)}
          >
            <p>Log Out</p>
          </div>
        )}

        {logoutConfirmation && (
          <CustomModal
            style="bg-white md:w-[30%] w-[50%] relative top-[25%] rounded-xl mx-auto  px-5 py-5"
            closeModal={() => setLogoutConfirmation(false)}
          >
            <div className="grid gap-y-7">
              <p>Do you wish to Logout of Deepsoul?</p>
              <div className="flex gap-x-7">
                <button
                  onClick={handleLogout}
                  className="w-[50%] bg-red-600 text-white rounded-lg py-3 text-[14px]"
                >
                  Logout
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="w-[50%] bg-gray-200 text-black rounded-lg py-3 text-[14px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </CustomModal>
        )}
      </div>
    </div>
  );
}

const styles = {
  view1:
    'bg-sirp-lightGrey cursor-pointer flex py-1 px-1 rounded-[15px] w-[45px] h-[40px] items-center justify-center content-center mr-4'
};

export default RightComp;