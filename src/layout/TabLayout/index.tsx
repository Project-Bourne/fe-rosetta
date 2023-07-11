import React, { ReactNode } from 'react'
import Image from 'next/image'
type LayoutType = {
    children: ReactNode,
}

const TabLayout = ({ children, showTitle, data }: any) => {
    const handleClick = (item) => {
        item.isClicked = !item.isClicked
        console.log(item.isClicked)
    }
    return (
        <div className='w-full h-full'>

            {/* Header */}
            {showTitle === false ? ""
                : <div className='flex flex-row w-full py-7 px-7 items-center justify-between'>
                    <h1 className='text-[18px] font-semibold'>Profile Settings</h1>
                </div>
            }


            {/* Settings tabs */}
            <div className='w-[100%] flex flex-row items-center border-b overscroll-y-auto-'>
                {
                    data?.map((item, index) => (
                        <div
                            className={
                                item.isClicked ? 'px-8 pt-3 flex flex-row items-center border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'
                                    : 'px-8 pt-3 flex flex-row items-center border-b pb-3 mr-15 mb-[-2px] cursor-pointer text-sirp-grey'
                            }
                            onClick={()=>handleClick(item)}
                        >
                            <Image
                                src={item.isClicked ? require(`../../assets/icons/${item.selectedIcon}`) : require(`../../assets/icons/${item.icon}`)}
                                alt="settings tab"
                                width={18}
                                height={18}
                                style={{ marginRight: 15 }}
                                priority
                            />

                            <h2 className={item.isClicked ? 'text-[12px] font-semibold text-sirp-primary' : 'text-[12px] font-semibold '}>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
            {children}
        </div>
    )
}



export default TabLayout