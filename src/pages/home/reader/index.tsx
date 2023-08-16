import React from 'react'
import HomeLayout from '@/layout/HomeLayout';
import { useSelector } from 'react-redux';
import BasicTabs from '../history/tab';
import { useTruncate } from "@/components/custom-hooks";

export default function Reader() {
    const { translatedData } = useSelector((state: any) => state?.translate)
    return (
        <div className='m-10 py-5 rounded-[1rem] bg-[#F9F9F9]'>
            <HomeLayout>
                <div className='p-5'>
                    <div className='m-5 grid grid-cols-2 gap-4'>
                        <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]">
                            <span className=' text-[#383E42] text-xl font-bold'>Original Text</span>
                            <p className='text-[#383E42] text-sm pt-3'>{translatedData?.text}</p>
                        </div>
                        <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] overflow-y-scroll border-[#E5E7EB]">
                            <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
                            <p className='text-[#383E42] text-sm pt-3'>{translatedData?.textTranslation}
                            </p>
                        </div>
                    </div>
                </div>
            </HomeLayout>
            <BasicTabs />
        </div>
    )
}
