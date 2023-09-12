import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TranslatorService from "@/services/Translator.service"
import { seTranslatedData, setOriginal, setTranslated, toggleTextSwap } from '@/redux/reducer/translateSlice';
import LoadingModal from './loadingModal';
import { useRouter } from 'next/router';
import NotificationService from '@/services/notification.service';

const FileUpload = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    let translatorService = new TranslatorService()
    const [formData, setFormData] = useState('');
    const [file, setFile] = useState(null);
    const [isFileUploded, setIsFileUploaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showActions, setShowActions] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const { isSwapped, translatedData, setTranslatedLoading } = useSelector((state: any) => state?.translate)


    const handleChange = (e) => {
        e.preventDefault();
        setFormData(e.target.value)
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            if (isSwapped) {
                dispatch(toggleTextSwap())
            }
            e.preventDefault();
            console.log('Enter key pressed:', formData);
            let data = {
                text: formData,
                userId: "64a425c336c4187ed4f1c8bd"
            };
            try {
                setShowLoader(true);
                const request = await translatorService.createTranslations(data);
                console.log(request)
                if (request.status) {
                    dispatch(seTranslatedData(request.data))
                    dispatch(setTranslated({
                        text: request.data.textTranslation,
                        lang: 'en',
                    }))
                    dispatch(setOriginal({
                        text: request.data.text,
                        lang: 'auto',
                    }))
                    // setTimeout(() => {
                    setShowLoader(false);
                    router.push('/home/reader');
                    // }, 2000);
                } else {
                    setShowLoader(false);
                    router.push('/home');
                    NotificationService.error({
                        message: "Error!",
                        addedText: <p>{request.message}. please try again</p>,
                    });
                }
            } catch (error) {
                setShowLoader(false);
                console.log(error);
            }
        }

    };


    const handleFileUpload = async (event) => {
        event.preventDefault();

        const selectedFile = event.target.files[0];
        if (selectedFile) {
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
                        router.push('/home/reader');
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

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        console.log(droppedFile, 'dropped')
        setFile(droppedFile);
        if (droppedFile) {
            const formData = new FormData();
            formData.append('files', droppedFile);

            try {
                const response: any = await fetch('http://192.81.213.226:89/api/v1/uploads', {
                    method: 'POST',
                    body: formData,
                });
                console.log(response);
                if (response.status) {
                } else {
                    console.error('File upload failed.');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleClear = () => {
        setFormData("")
    }

    const closeModal = () => {
        setShowLoader(false)
    }
    const handleDeleteFile = () => {
        setFile(null);
        setIsFileUploaded(false);
    };

    return (
        <div className='m-5'>
            {showLoader && <LoadingModal closeModal={closeModal} formData={formData} />}
            {/* copy and paste link */}
            {isFileUploded ?
                (
                    <div className='p-10 flex align-middle items-center w-full flex-col justify-center'>
                        <div className="p-5 flex w-[50%] align-middle justify-between bg-[#F3F5F6] border-2 border-[E8EAEC] rounded-[15px]">
                            <div className='flex align-middle items-center justify-center'>
                                <span className='rounded-full bg-[#E8F8FD] flex align-middle justify-center w-[40px] h-[40px]'>
                                    <Image
                                        src={require(`../../../../assets/icons/file.svg`)}
                                        alt="upload image"
                                        width={20}
                                        height={20}
                                        priority
                                    />
                                </span>
                                <div className='mx-4'>
                                    <span>{file?.name}</span>
                                    <div>
                                        <span className='text-xs text-[#6B7280]'>{file?.size}KB .</span>
                                        <span className='text-xs text-[#6B7280]'>100% uploaded</span>
                                    </div>
                                </div>
                            </div>
                            <span className='rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[40px] h-[40px]' onClick={handleDeleteFile}>
                                <Image
                                    src={require(`../../../../assets/icons/red-delete.svg`)}
                                    alt="upload image"
                                    width={18}
                                    height={18}
                                    priority
                                />
                            </span>
                        </div>
                        <div className="flex w-[50%] align-middle justify-end  mt-4">
                            {!isLoading && <div className="p-5 cursor-pointer flex w-[30%] align-middle justify-center bg-[#4582C4]  border-2 text-white rounded-[15px] font-extrabold">
                                <span className='ml-3'>Translate</span>
                            </div>}
                            {isLoading && !showActions && <div className="p-5 flex w-[35%] align-middle justify-center bg-[#4582C4]  border-2 text-white rounded-[15px] font-extrabold">
                                <span> <Image
                                    src={require(`../../../../assets/icons/circle.svg`)}
                                    alt="upload image"
                                    width={20}
                                    height={20}
                                    priority
                                    className="rotate-animation"
                                /></span>
                                <span className='ml-3'>Translating</span>
                            </div>}
                        </div>

                    </div>
                ) :
                (<>
                    <div className='flex align-middle w-full border-2 rounded-full border-[#E5E7EB]-500  border-dotted bg-[]'>
                        <span className='flex align-middle justify-center mx-3'>
                            <Image
                                src={require(`../../../../assets/icons/link.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                                priority
                            />
                            {/* <span className='ml-3 font-light text-[#A1ADB5]'>Copy and paste link here</span> */}
                        </span>
                        <input placeholder='Copy and paste content text here' className='py-5 w-[95%]  outline-none' value={formData} onChange={handleChange} onKeyDown={handleKeyDown} />
                        <span className='flex align-middle justify-center mx-3' onClick={handleClear}>
                            <Image
                                className='flex align-middle justify-center font-light text-black'
                                src={require(`../../../../assets/icons/x.svg`)}
                                alt="upload image"
                                width={20}
                                height={20}
                            />
                        </span>
                    </div>

                    <div onDragOver={handleDragOver} onDrop={handleDrop} className='h-[30vh] mt-5 flex align-middle w-full justify-center border rounded-[30px] border-[#E5E7EB]'>
                        <div className='flex flex-col align-middle justify-center'>
                            <span className='flex align-middle justify-center mx-3'>
                                <Image
                                    className='flex align-middle justify-center'
                                    src={require(`../../../../assets/icons/cloud.svg`)}
                                    alt="upload image"
                                    width={25}
                                    height={25}
                                    priority
                                />
                            </span>
                            <span className='font-normal text-[#383E42]'>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".txt,.rtf,.doc,.pdf,.svg,"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <label className='text-blue-400 cursor-pointer mr-5' htmlFor="file-upload">Upload a file
                                </label>
                                  or drag and drop</span>
                            <span className='font-light  text-[#383E42]'>TXT, RFT, DOC, PDF upto 5MB</span>
                        </div>
                    </div>
                </>
                )}

        </div>
    )
}

export default FileUpload;