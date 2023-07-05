import Image from 'next/image';
import React from 'react'
import NavBarItem from './NavBarItem';
import { NavBarContents } from '@/utils/constants';

function NavBar() {
  return (
    <div className='w-[20vw] h-[100vh] border-3 border-r bg-white p-10'>
        <div className='flex flex-row items-center cursor-pointer mb-20'>
            <Image
                src={require("../../../assets/svg/logo.svg")}
                alt="SIRP Logo"
                width={50}
                height={50}
                style={{marginRight: 20}}
                priority
            />
            <h1 className='text-sirp-primary font-semibold text-[30px]'>Translator</h1>
        </div>

        <div 
            className='items-center justify-center py-4 px-5 w-[100%] border-[1.3px] border-sirp-primaryLess1 rounded-xl 
                flex flex-row self-center cursor-pointer shadow-sm shadow-sirp-primaryLess1 hover:bg-blue-50'
        >
            <Image
                src={require("../../../assets/svg/refresh.svg")}
                alt="Start/Refresh Crawler"
                width={20}
                height={20}
                style={{marginRight: 20}}
                priority
            />

            <h2 className='text-sirp-primary font-semibold text-[14px]'>Start Crawler</h2>
        </div>

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