import Image from 'next/image';
import React from 'react'
import NavBarItem from './NavBarItem';
import { NavBarContents } from '@/utils/constants';

function NavBar() {
    return (
        <div className='w-[20vw] h-[100vh] p-3 m-auto border-2 border-r bg-white md:p-10 z-[100] fixed left-0 bottom-0 top-0'>
            <div className='flex flex-row items-center cursor-pointer mb-20'>
                <Image
                    src={require("../../../assets/svg/logo.svg")}
                    alt="SIRP Logo"
                    width={50}
                    height={50}
                    className='md:mr-10'
                    priority
                />
                <h1 className='text-sirp-primary font-semibold hidden md:block '>Translator</h1>
            </div>

            <div
                className='items-center justify-center py-4 px-5 w-[100%] md:border-[1.3px] md:border-sirp-primaryLess1 rounded-xl 
                flex flex-row self-center cursor-pointer shadow-sm shadow-sirp-primaryLess1 hover:bg-blue-50'
            >
                <Image
                    src={require("../../../assets/svg/refresh.svg")}
                    alt="Start/Refresh Crawler"
                    width={30}
                    height={30}
                    className='md:mr-10 rotate-animation'
                    priority
                />

                <h2 className='text-sirp-primary font-semibold text-[14px] hidden md:block'>Start Crawler</h2>
            </div>

            <div className='w-full mt-10 flex flex-col items-center justify-center'>
                {
                    NavBarContents.map((item, index) => (
                        <NavBarItem item={item} index={index} key={index} />
                    ))
                }

            </div>
        </div>
    )
}

export default NavBar;