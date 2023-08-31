import Image from 'next/image';
import React from 'react'

function RightComp() {
  return (
    <div className='flex flex-row items-center self-start'>

        <div className={`${styles.view1} bg-white`}>
            <Image
                src={require("../../../../public/icons/notification.svg")}
                alt="notification"
                width={20}
                height={20}
                className='self-center'
                style={{alignSelf: 'center'}}
                priority
            />
        </div>
        <div className={`${styles.view1} hidden md:flex`}>
            <Image
                src={require("../../../../public/icons/dashboard.svg")}
                alt="dashbaord"
                width={20}
                height={20}
                className='self-center'
                style={{alignSelf: 'center'}}
                priority
            />
        </div>

        <div className='bg-sirp-lightGrey flex flex-row mr-2 py-3 px-3 md:px-5 h-[45px] rounded-[12px] items-center justify-center cursor-pointer'>
            <div className='flex flex-row items-center justify-center'>
                <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={25}
                    height={25}
                    className='rounded-full object-fill'
                    priority
                />

                <Image
                    src={require("../../../../public/icons/down.svg")}
                    alt="down"
                    width={18}
                    height={18}
                    className='mx-3 object-contain hidden md:block'
                    priority
                />
            </div>

            {/* line break */}
            <div className='h-[100%] w-[0.5px] bg-sirp-grey hidden md:block'/>

            <div className='ml-3 bg-sirp-lightGrey w-full self-center hidden md:block'>
                <h2 className='text-sirp-grey text-[13px]'>Musa Richard</h2>
                <h2 className='text-sirp-primary text-[11px]'>Admin</h2>
            </div>
            <Image
                src={require("../../../../public/icons/down.svg")}
                alt="ellipsis"
                width={18}
                height={18}
                className='mx-3 object-contain flex md:hidden'
                priority
            />
        </div>

    </div>
  )
}

const styles = {
    view1: "bg-sirp-lightGrey cursor-pointer flex py-2 px-2 rounded-[15px] w-[45px] h-[45px] items-center justify-center content-center mr-4"
}

export default RightComp;
