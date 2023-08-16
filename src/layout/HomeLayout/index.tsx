import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import MultipleSelect from '../../components/ui/select'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useTruncate } from "@/components/custom-hooks";


type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {
    const router = useRouter()
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [translatedLang, setTranslatedLang] = useState('')
    const [languages, setLanguages] = useState([])
    const { translatedData } = useSelector((state: any) => state?.translate)
    const handleChange = (e) => {
        e.preventDefault();
        setSelectedLanguage(e.target.value)
    }

    const handleTranslation = (e) => {
        e.preventDefault();
        setTranslatedLang(e.target.value)
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full border-b">
                {/* Header */}
                <div className="flex flex-row w-full py-7 border-b px-7 items-center justify-between">
                    <div>
                        <Image
                            src={require('../../assets/icons/arrow-narrow-left_1.svg')}
                            alt="documents"
                            className="cursor-pointer pb-5"
                            width={20}
                            onClick={() => router.back()}
                        />
                        <span className='font-bold'>{useTruncate(translatedData?.title, 70) }</span>
                    </div>

                    <div className=" px-3 flex w-[40%] align-middle justify-between">
                        <span className='w-[50px] cursor-pointer  shadow-xl h-[50px] flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/eye.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] shadow-xl cursor-pointer flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/box-arrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/binbin.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/searcharrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer flex shadow-xl align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/searchbox.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../assets/icons/file-arrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                    </div>
                </div>
                <div className="w-[100%] flex-wrap flex flex-row items-center border-b p-5 justify-start overscroll-y-auto">
                    <div className="left w-[49%] flex items-center">
                        <MultipleSelect
                        />
                    </div>
                    <span className='arrow w-[20px]'>
                        <Image
                            src={require(`../../assets/icons/arrows.svg`)}
                            alt="dropdown"
                            width={18}
                            height={18}
                            priority
                        />
                    </span>
                    <div className="right w-[49%] flex items-center justify-end">
                        <MultipleSelect
                        />
                    </div>
                </div>

            </div>
            {children}
        </div>
    );
};

export default HomeLayout;
