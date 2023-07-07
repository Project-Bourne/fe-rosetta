import { HomeData } from '@/utils/constants';
import React, { ReactNode, useState } from 'react'
import Image from 'next/image';

type ItemCompType = {
    name: string,
    nameType: string,
    id: number,
    route?: string,
}

type LayoutType = {
    children: ReactNode,
}

const HomeLayout = ({ children }: LayoutType) => {
    const [activeTabs, setActiveTabs] = useState<number[]>([]); // Array to store active tab indexes

    const updatePath = (index: number) => {
        const isActive = activeTabs.includes(index);
        let newActiveTabs: number[];

        if (isActive) {
            // Remove the index from activeTabs if it's already active
            newActiveTabs = activeTabs.filter((tabIndex) => tabIndex !== index);
        } else {
            // Add the index to activeTabs if it's not active
            if (activeTabs.length < 2) {
                newActiveTabs = [...activeTabs, index];
            } else {
                newActiveTabs = [...activeTabs.slice(1), index];
            }
        }

        setActiveTabs(newActiveTabs);
    }

    return (
        <div className='w-full h-full'>
            <div className='w-full h-full border-b'>
                {/* Header */}
                <div className='flex flex-row w-full py-7 px-7 items-center justify-between'>
                    <h1 className='text-[18px] font-semibold'>Add Content</h1>
                </div>
                <div className='w-[100%] flex-wrap flex flex-row items-center border-b justify-between overscroll-y-auto-'>
                    {HomeData.map((item, index) => (
                        <div
                            key={index}
                            className={
                                activeTabs.includes(index)
                                    ? 'px-8 pt-3 flex cursor-pointer flex-row flex-wrap items-center border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'
                                    : 'px-8 pt-3 cursor-pointer flex flex-row items-center pb-3 mr-15 flex-wrap mb-[-2px] cursor-pointer text-sirp-grey'
                            }
                            onClick={() => updatePath(index)}
                        >
                            {item.nameType === "text" && (
                                <h2
                                    className={
                                        activeTabs.includes(index)
                                            ? 'text-[12px] font-semibold text-sirp-primary'
                                            : 'text-[12px] font-semibold'
                                    }
                                >
                                    {item.name}
                                </h2>
                            )}
                            {item.nameType === "dropdown" && (
                                <>
                                    <Image
                                        className={
                                            activeTabs.includes(index)
                                                ? 'text-[12px] font-semibold text-sirp-primary'
                                                : 'text-[12px] font-semibold'
                                        }
                                        src={require(`../../assets/icons/dropdown.svg`)}
                                        alt="dropdown"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                </>
                            )}
                            {item.nameType === "arrows" && (
                                <>
                                    <Image
                                        className={
                                            activeTabs.includes(index)
                                                ? 'text-[12px] font-semibold text-sirp-primary'
                                                : 'text-[12px] font-semibold'
                                        }
                                        src={require(`../../assets/icons/arrows.svg`)}
                                        alt="dropdown"
                                        width={18}
                                        height={18}
                                        priority
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
}

export default HomeLayout;
