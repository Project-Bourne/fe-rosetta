import { TabComp } from '@/pages/settings/components';
import { HomeData } from '@/utils/constants';
import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router';
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
    const [path, setPath] = useState("");

    const router = useRouter();
    const { pathname } = router;

    const updatePath = (item: ItemCompType) => {
        setPath(item.route);
        router.push(
            {
                pathname: item.route
            },
            undefined,
            {
                shallow: true
            }
        )

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
                                item.route == pathname ? 'px-8 pt-3 flex flex-row flex-wrap items-center border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'
                                    : 'px-8 pt-3 flex flex-row items-center pb-3 mr-15 flex-wrap mb-[-2px] cursor-pointer text-sirp-grey'
                            }
                            onClick={() => updatePath(item)}
                        >
                            {item.nameType === "text" && (
                                <h2
                                    className={
                                        pathname === item.route
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
                                            pathname === item.route
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
                                            pathname === item.route
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