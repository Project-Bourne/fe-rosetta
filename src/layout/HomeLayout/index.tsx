import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import MultipleSelect from '../../components/ui/select'
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useTruncate } from "@/components/custom-hooks";
import { setOriginalLang, setTranslatedLang, setOriginalLoading, setOriginalText, setTranslatedText, swapContents, setTranslatedLoading, setTranslated, setOriginal, setTranslateContext, setTranslatedUuid } from '@/redux/reducer/translateSlice';
import TranslatorService from '@/services/Translator.service';
import Button from '@mui/material/Button';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { grey } from '@mui/material/colors';
import NotificationService from '@/services/notification.service';
import ActionIcons from '@/pages/home/components/actionIcons/ActionIcon';
import { Cookies } from "react-cookie";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [fileName, setFileName] = useState('')
    const { original, translated, translatedUuid } = useSelector((state: any) => state?.translate)
    const [isContainerVisible, setIsContainerVisible] = useState(false);
    const { userInfo } = useSelector((state: any) => state?.auth);
    const cookies = new Cookies();
    let access = "";
    if (typeof window !== "undefined") {
        access = cookies.get("deep-access")
    }

    const toggleContainerVisibility = () => {
        setIsContainerVisible(!isContainerVisible);
    };


    const handleOriginalSelectChange = async (e) => {
        e.preventDefault();
        dispatch(setOriginalLang(e.target.value))
        if (!original.text) return
        dispatch(setOriginalLoading(true))
        try {
            const data = {
                text: original.text,
                sourceLang: original.lang === 'auto' ? '' : original.lang,
                targetLang: e.target.value,
            }
            const response = await TranslatorService.translate(data)
            if (response.status) {
                dispatch(setOriginalText(response.data.textTranslation))
                // console.log('Making API call:', response);
            } else {
                NotificationService.error({
                    message: "Error!",
                    addedText: <p>{response.message}. please try again</p>,
                });
            }
            dispatch(setOriginalLoading(false))
        } catch (error) {
            // console.log(error)
            dispatch(setOriginalLoading(false))
        }
    };

    const handleTranslatedSelectChange = async (e) => {
        e.preventDefault();
        dispatch(setTranslatedLang(e.target.value))
        if (!translated.text) return
        dispatch(setTranslatedLoading(true))

        try {
            const data = {
                text: translated.text,
                sourceLang: translated.lang === 'auto' ? '' : translated.lang,
                targetLang: e.target.value,
            }
            const response = await TranslatorService.translate(data)

            // console.log('REsponse: ', response);
            if (response.status) {
                dispatch(setTranslatedText(response.data.textTranslation))
                dispatch(setTranslatedUuid(response.data.uuid))
                dispatch(setTranslateContext(response.data.textTranslationContext))
                // console.log('Making API call:', response);
            } else {

                NotificationService.error({
                    message: "Error!",
                    addedText: <p>{response.message}. please try again</p>,
                });
            }
            dispatch(setTranslatedLoading(false))
        } catch (error) {
            // console.log(error)
            dispatch(setTranslatedLoading(false))
        }
    };

    const handleSwapClick = async () => {
        dispatch(swapContents());
    };


    const handleFileUpload = async (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
        const userId = userInfo.uuid
        if (!fullName || !userId || !selectedFile) return
        if (selectedFile) {
            setFileName(selectedFile.name)
            const formData = new FormData();
            formData.append('files', selectedFile);
            formData.append("userId", userId);
            formData.append("userName", fullName);
            dispatch(setOriginalLoading(true));
            dispatch(setOriginalLoading(true))
            try {
                const res = await fetch(
                    // 'http://192.81.213.226:81/89/api/v1/uploads', 
                    `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FILE_UPLOAD_API_ROUTE}/api/v1/uploads`,
                    {
                        method: 'POST',
                        body: formData,
                        headers: {
                            "deep-token": access,
                        }
                    });
                if (res.status === 403) {
                    cookies.remove("deep-access");

                    // Redirect to the login page
                    // window.location.href = "http://192.81.213.226:30/auth/login";
                    window.location.href = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_PORT}/auth/login`;
                    return "Access forbidden. Redirecting to login page.";
                }
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
                            context: newResponse.data.textTranslationContext,
                            // lang: 'en',
                            lang: ''
                        }))
                        dispatch(setTranslatedUuid(newResponse.data.uuid))
                        dispatch(setOriginal({
                            text: newResponse.data.text,
                            lang: 'auto',
                        }))
                        dispatch(setOriginalLoading(false));
                        dispatch(setOriginalLoading(false))
                    } else {
                        dispatch(setOriginalLoading(false));
                        dispatch(setOriginalLoading(false))
                        router.replace('/home');
                        NotificationService.error({
                            message: "Error!",
                            addedText: <p>{newResponse.message}. please try again</p>,
                        });
                    }
                } else {
                    dispatch(setOriginalLoading(false));
                    dispatch(setOriginalLoading(false))
                    NotificationService.error({
                        message: "Error!",
                        addedText: <p>Something went wrong. please try again</p>,
                    });
                    console.error('File upload failed.');
                }
            } catch (error) {
                console.error(error);
                dispatch(setOriginalLoading(false));
                dispatch(setOriginalLoading(false))
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
                    <div className='bg-sp pr-10 ml-2 w-[50%]'>
                        <div className='flex items-center'>
                            <label htmlFor="file-input" className='px-4 py-2 rounded-lg shadow w-[50%]' style={{ cursor: 'pointer', color: '#4582C4', backgroundColor: "white" }}>
                                <DriveFolderUploadIcon style={{ color: '#4582C4', cursor: 'pointer' }} /> Upload File
                            </label>
                            <span className='text-grey-400 ml-2 text-sm text-sirp-primary w-[38%]'>{useTruncate(fileName, 18)}</span>
                            {fileName && <span className='text-grey-400 text-sm text-sirp-primary ' onClick={() => setFileName('')}><RemoveCircleIcon style={{ color: '#4582C4', cursor: 'pointer' }} /></span>}
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
                    <div className='flex w-full items-center justify-end'>
                        <div className={`px-3 flex w-full align-middle justify-between`}>
                            <ActionIcons docId={translatedUuid} />
                        </div>

                        {/* <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex items-center rounded-[10px] justify-center' onClick={toggleContainerVisibility}>
                            <span className='flex align-middle justify-center'>
                                <MenuIcon style={{ color: '#4582C4' }} /> {/* Replace with Material-UI Menu Icon *
                            </span>
                        </span> */}
                    </div>


                </div>
                <div className="w-[100%] flex flex-wrap  items-center border-b px-10 md:justify-start overscroll-y-auto">
                    <div className="left md:w-[47%] w-full flex items-center">
                        <MultipleSelect
                            selectedLanguage={original?.lang}
                            handleChange={handleOriginalSelectChange}
                        />
                    </div>
                    <span className='arrow md:w-[50px] h-[50px] shadow-xl flex items-center rounded-[10px] cursor-pointer justify-center' onClick={handleSwapClick}>
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


