import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import MultipleSelect from '../../components/ui/select'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useTruncate } from "@/components/custom-hooks";
import { seTranslatedData, setOriginalLang, setTranslatedLang, setOriginalLoading, setOriginalText, setTranslatedText, swapContents, setTranslatedLoading } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import NotificationService from '@/services/notification.service';

type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { translatedData, original, translated } = useSelector((state: any) => state?.translate)


    const handleOriginalSelectChange = async (e) => {
        e.preventDefault();
        dispatch(setOriginalLang(e.target.value))
        dispatch(setOriginalLoading(true))
        try {
            const data = {
                text: original.text,
                sourceLang: original.lang,
                targetLang: e.target.value,
            }
            const response = await TranslatorService.translate(data)
            if (response.status) {
                dispatch(setOriginalText(response.data.textTranslation))
                console.log('Making API call:', response);
            } else {
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>{response.message}. please try again</p>,
                });
            }
            dispatch(setOriginalLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setOriginalLoading(false))
        }
    };

    const handleTranslatedSelectChange = async (e) => {
        e.preventDefault();
        dispatch(setTranslatedLoading(true))
        dispatch(setTranslatedLang(e.target.value))
        try {
            const data = {
                text: original.text,
                sourceLang: translated.lang,
                targetLang: e.target.value,
            }
            const response = await TranslatorService.translate(data)
            if (response.status) {
                dispatch(setTranslatedText(response.data.textTranslation))
                console.log('Making API call:', response);
            } else {

                NotificationService.error({
                    message: "Error!",
                    addedText: <p>{response.message}. please try again</p>,
                });
            }
            dispatch(setTranslatedLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(setTranslatedLoading(false))
        }
    };

    const handleSwapClick = async () => {
        dispatch(swapContents());

    };

    return (
        <div className="w-full h-full">
            <div className="w-full h-full  text-gray-500">
                {/* Header */}
                <div className="flex flex-row w-full pb-10 px-7 items-center justify-between">
                    <div>
                        <Image
                            src={require('../../../public/icons/arrow-narrow-left_1.svg')}
                            alt="documents"
                            className="cursor-pointer pb-5"
                            width={20}
                            onClick={() => router.back()}
                        />
                        <span className='font-bold'>{useTruncate(translatedData?.title, 70)}</span>
                    </div>

                    <div className=" px-3 flex w-[40%] align-middle justify-between">
                        <span className='w-[50px] cursor-pointer  shadow-xl h-[50px] flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/eye.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] shadow-xl cursor-pointer flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/box-arrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/binbin.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/searcharrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer flex shadow-xl align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/searchbox.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
                            <span className='flex align-middle justify-center'>   <Image
                                src={require(`../../../public/icons/file-arrow.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            /></span>
                        </span>
                    </div>
                </div>
                <div className="w-[100%] flex flex-wrap  items-center border-b px-10 md:justify-start overscroll-y-auto">
                    <div className="left md:w-[49%] w-full flex items-center">
                        <MultipleSelect
                            selectedLanguage={original?.lang}
                            handleChange={handleOriginalSelectChange}
                        />
                    </div>
                    <span className='arrow md:w-[20px] w-full cursor-pointer' onClick={handleSwapClick}>
                        <Image
                            src={require(`../../../public/icons/arrows.svg`)}
                            alt="dropdown"
                            width={18}
                            height={18}
                            priority
                        />
                    </span>
                    <div className="right md:w-[49%] w-full flex items-center md:justify-end justify-start">
                        <MultipleSelect
                            selectedLanguage={translated?.lang}
                            handleChange={handleTranslatedSelectChange}
                        />
                    </div>
                </div>

            </div>
            {children}
        </div>
    );
};

export default HomeLayout;
