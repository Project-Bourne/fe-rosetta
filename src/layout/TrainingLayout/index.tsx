import { TabComp } from '@/pages/settings/components';
import { TrainingData } from '@/utils/constants';
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router';


type LayoutType = {
    children: ReactNode,
}

const TrainingLayout = ({children}: LayoutType) => {
    
    const route = useRouter().pathname;

    // console.log({route})

  return (
    <div className='w-full h-[100vw] bg-white'>
        
        {/* Header */}
        <div className='flex flex-row w-full py-7 px-7 items-center justify-between'>
            <h1 className='text-[18px] font-semibold'>Training</h1>
        </div>

        {/* Settings tabs */}
        <div className='w-[100%] flex flex-row items-center border-b overscroll-y-auto-'>
            {
                TrainingData.map((item, index) => (
                    <TabComp item={item} index={index} key={index} route={route} />
                ))
            }
        </div>

        {/* <div className='w-full h-full overscroll-auto flex'>
        </div> */}
            {children}
    </div>
  )
}

export default TrainingLayout;