import Image from 'next/image';
import React from 'react'
import NavBarItem from './NavBarItem';
import { NavBarContents } from '@/utils/constants';

function NavBar() {
  return (
    <div className='w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white px-3 py-10 md:p-10 fixed z-[20]'>
        <div className='flex flex-row items-center cursor-pointer mb-20'>
            <Image
                src={require("../../../assets/svg/logo.svg")}
                alt="SIRP Logo"
                width={50}
                height={50}
                className='md:mr-[20px]'
                priority
            />
            <h1 className='text-sirp-primary font-semibold text-[30px] hidden md:block'>Translator</h1>
        </div>
        {/* items-center justify-center py-4 md:px-5 w-[100%] flex flex-row self-center */}
        {/* <div 
            className='flex py-4 px-0 md:px-3 lg:px-5 text-center justify-center border-[1.3px] border-sirp-primaryLess1 rounded-xl 
                 cursor-pointer shadow-sm shadow-sirp-primaryLess1 hover:bg-blue-50'
        >
            <Image
                src={require("../../../assets/svg/refresh.svg")}
                alt="Start/Refresh Crawler"
                width={20}
                height={20}
                className='md:mr-[20px] rotate-animation'
                priority
            />

            <h2 className='text-sirp-primary font-semibold text-[14px] hidden md:block'>Start Crawler</h2>
        </div> */}

        <div className='w-full mt-10'>
            {
                NavBarContents.map((item, index) => (
                    <NavBarItem item={item} index={index} key={index}/>
                ))   
            }
            
        </div>
    </div>
  )
}

export default NavBar;
