import Image from 'next/image'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { type } from 'os'
import React, { useEffect } from 'react'

type NavBarItemType = {
    item: {
        name: string,
        id: number,
        icon: string,
        route: string
    },
    index: number
}

function NavBarItem({item, index}: NavBarItemType) {
    const route = useRouter().route;
    const isSelected = route.includes(item.route);


  return (
    <Link href={item.route}>
        <div
            className={
                !isSelected ? 
                    'flex flex-row my-5 w-[100%] items-center md:justify-start justify-center rounded-md cursor-pointer hover:bg-sirp-primaryLess2 md:py-4 p-3 md:px-5 md:ml-[-20px]' 
                    : 'flex flex-row my-5 w-[100%] items-center md:justify-start justify-center rounded-md cursor-pointer bg-sirp-primaryLess2 md:py-4 p-3 md:px-5 border-l-4 border-sirp-primary md:ml-[-20px]'
            }
            key={index}
        >
            <Image
                src={isSelected ? require(`../../../assets/icons/on.${item.icon}`) : require(`../../../assets/icons/${item.icon}`)}
                alt="Dashboard icon"
                width={22}
                height={22}
                className='fill-sirp-primary md:mr-[20px]'
                priority
            />

            <h2 className={isSelected ? 'text-[13px] text-sirp-primary font-semibold hidden md:block' : 'text-[13px] text-sirp-grey font-semibold hidden md:block'}>{item.name}</h2>
        </div>
    </Link>
  )
}

export default NavBarItem