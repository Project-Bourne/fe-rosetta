import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import MultipleSelect from '../../components/ui/select'
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useTruncate } from "@/components/custom-hooks";
import {  setOriginalLang, setTranslatedLang, setOriginalLoading, setOriginalText, setTranslatedText, swapContents, setTranslatedLoading, setTranslated, setOriginal } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import Button from '@mui/material/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { grey } from '@mui/material/colors';
import NotificationService from '@/services/notification.service';

type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [fileName, setFileName] = useState('')
    const { original, translated } = useSelector((state: any) => state?.translate)
    const [isFileUploded, setIsFileUploaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOriginalSelectChange = async (e) => {
        e.preventDefault();
        dispatch(setOriginalLang(e.target.value))
        dispatch(setOriginalLoading(true))
        try {
            const data = {
                text: original.text,
                sourceLang: translated.lang,
                targetLang: e.target.value,
            }
            const response = await TranslatorService.translate(data)
            if (response.status) {
                // dispatch(setOriginalText(response.data.textTranslation))
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


    const handleFileUpload = async (event) => {
        event.preventDefault();

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name)
            setIsFileUploaded(true)
            const formData = new FormData();
            formData.append('files', selectedFile);
            setIsLoading(true);
            try {
                const res = await fetch('http://192.81.213.226:89/api/v1/uploads', {
                    method: 'POST',
                    body: formData,
                });

                const response = await res.json();
                if (response) {
                    let newObj = {
                        text: response.data[0].text,
                        uri: response.data[0].uri,
                    }
                    let newResponse = await TranslatorService.translateFile(newObj)
                    if (newResponse.status) {
                        dispatch(setTranslated({
                            text: newResponse.data.textTranslation,
                            lang: 'en',
                        }))
                        dispatch(setOriginal({
                            text: newResponse.data.text,
                            lang: 'auto',
                        }))
                        setIsLoading(false);
                        // router.push('/home/reader');
                    } else {
                        setIsFileUploaded(false)
                        setIsLoading(false);
                        router.push('/home');
                        NotificationService.error({
                            message: "Error!",
                            addedText: <p>{newResponse.message}. please try again</p>,
                        });
                    }
                } else {
                    setIsFileUploaded(false)
                    setIsLoading(false);
                    NotificationService.error({
                        message: "Error!",
                        addedText: <p>Something went wrong. please try again</p>,
                    });
                    console.error('File upload failed.');
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
                setIsFileUploaded(false)
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>Something went wrong. please try again</p>,
                });
            }
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full  text-gray-500">
                {/* Header */}
                <div className="flex flex-row w-full pb-10 px-7 items-center justify-between">
                    {/* {original.text.length === 0 ? ( */}
                        <div className='bg-sp pr-10'>
                            <div className='flex items-center'>
                                <label htmlFor="file-input" className='px-4 py-1 rounded-lg' style={{ cursor: 'pointer', color: '#4582C4', backgroundColor: "white", border: '1px solid #4582C4' }}>
                                    <DriveFolderUploadIcon style={{ color: '#4582C4', cursor: 'pointer' }} /> Upload File
                                </label>
                                <span className='text-grey-400 ml-2 text-sm text-sirp-primary'>{fileName}</span>
                                <input
                                    type="file"
                                    id="file-input"
                                    style={{ display: 'none' }}
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>
                    {/* // ) : null} */}

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
                <div className="w-[100%] flex flex-wrap  items-center border-b px-10 md:justify-start overscroll-y-auto">
                    <div className="left md:w-[47%] w-full flex items-center">
                        <MultipleSelect
                            selectedLanguage={original?.lang}
                            handleChange={handleOriginalSelectChange}
                        />
                    </div>
                    <span className='arrow md:w-[20px] w-full cursor-pointer' onClick={handleSwapClick}>
                        <Image
                            src={require(`../../assets/icons/arrows.svg`)}
                            alt="dropdown"
                            width={18}
                            height={18}
                            priority
                        />
                    </span>
                    <div className="right md:w-[47%] w-full flex items-center md:justify-end justify-start">
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
function setIsFileUploaded(arg0: boolean) {
    throw new Error('Function not implemented.');
}

