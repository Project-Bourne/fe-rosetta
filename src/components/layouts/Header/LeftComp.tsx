import Image from 'next/image'
import React from 'react'

export const LeftComp = (props) => {
  return (
    <div className='flex relative flex-row items-center w-full self-start'>
        <div className='bg-sirp-lightGrey flex flex-row w-full mr-2 py-3 px-5 h-[45px] rounded-[12px]'>
            <Image
                src={require("../../../assets/icons/search.svg")}
                alt="Search"
                width={18}
                height={18}
                priority
            />

            <div className='ml-3 bg-sirp-lightGrey w-full self-center'>
                <input type='search' placeholder='Search SIRP' className='w-full bg-sirp-lightGrey border-none outline-none text-[13px]'/>
            </div>
        </div>
        
        <div className='bg-sirp-lightGrey cursor-pointer flex py-2 px-2 rounded-[15px] w-[45px] h-[45px] items-center justify-center content-center'>
            <Image
                src={require("../../../assets/icons/filter.svg")}
                alt="Filter"
                width={20}
                height={20}
                className='self-center'
                style={{alignSelf: 'center'}}
                priority
            />
        </div>
</div>
  )
}

export default LeftComp