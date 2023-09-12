import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BreadCrum from '../../components/ui/Breadcrumbs';
import Min_and_Max_icon from '../home/components/Min_Max_icon';
import ActionIcons from '../home/components/actionIcons/ActionIcon';
import TranslatorService from '../../services/Translator.service';
import {
    setSingleHistory,
} from '@/redux/reducer/translateSlice';
import { setOriginalText, seTranslatedData, setOriginal, setTranslated } from '@/redux/reducer/translateSlice';
import { useDispatch, useSelector } from 'react-redux';
import BasicTabs from '.';
import NotificationService from '@/services/notification.service';
import HomeLayout from '@/layout/HomeLayout';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

function HomeContent() {
    const { original, translated, isSwapped } = useSelector((state: any) => state?.translate);
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hideMeta, setHideMeta] = useState(true);
    const { homecontent } = router.query;
    const focusedTextarea = useRef(null);
    const dispatch = useDispatch()
    const { singleHistory } =
        useSelector(
            (state: any) => state.translate // Include summaryTitle in the state selector
        );

    useEffect(() => {
        if (homecontent) {
            TranslatorService.getTranslationsById(homecontent)
                .then(translate => {
                    // dispatch(setSingleHistory(translate.data))
                    dispatch(setTranslated({
                        text: translate.data.textTranslation,
                        lang: 'en',
                    }))
                    dispatch(setOriginal({
                        text: translate.data.text,
                        lang: 'auto',
                    }))
                })
                .catch(err => {
                    router.push('/history')
                    NotificationService.error({
                        message: "something went wrong",
                    });
                    console.log(err);
                });
        }
    }, [homecontent]);
    // const debouncedHandleChange = async () => {
    //     try {
    //       const data = {
    //         text: original.text,
    //         sourceLang: original.lang,
    //         targetLang: translated.lang,
    //       }
    //       const response = await TranslatorService.translate(data)
    //       if (response.status) {
    //         dispatch(setTranslated({
    //           text: response.data.textTranslation,
    //           lang: 'en',
    //         }))
    //         dispatch(setOriginal({
    //           text: response.data.text,
    //           lang: 'auto',
    //         }))
    //         setLoading(false);
    //         console.log('Making API call:', response);
    //       } else {
    //         NotificationService.error({
    //           message: "Error!",
    //           addedText: <p>{response.message}. please try again</p>,

    //         });
    //       }

    //     } catch (error) {
    //       console.log(error)
    //     }
    //   };

    const handleTextareaClick = () => {
        setEditMode(true);
    };

    const handleKeyDown = async (e) => {
        setLoading(true)
        if (e.key === 'Enter') {
            await debouncedHandleChange();
            setEditMode(false);
            setLoading(false)
        }
    };

    const handlechange = async (e) => {
        e.preventDefault();
        dispatch(setOriginalText(e.target.value))
    }

    const handleTextareaBlur = () => {
        setEditMode(false);
    };

    return (
        <div className='m-10 py-5 rounded-[1rem] bg-[#F9F9F9]'>
            <HomeLayout>
                <div className='p-5'>
                    <div className='m-5 grid grid-cols-2 gap-4'>
                        <div className={`row-span-2 p-5 rounded-[20px] bg-[#f4f5f6] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]`}>
                            <span className='text-[#383E42] text-xl font-bold'>Original Text</span>
                            {original.isLoading ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <CircularProgress />
                            </Box> : <textarea
                                ref={focusedTextarea}
                                className='text-[#383E42] h-full text-sm pt-3 bg-transparent border-0 outline-none w-full resize-none'
                                defaultValue={original.text}
                                // value={isSwapped ? translatedData?.textTranslation : translatedData?.text}
                                onClick={handleTextareaClick}
                                onBlur={handleTextareaBlur}
                                onChange={handlechange}
                                onFocus={() => {
                                    focusedTextarea.current = 'original';
                                }}
                                onKeyDown={handleKeyDown}
                                rows={20} // Set an initial value for rows
                                style={{
                                    height: editMode && focusedTextarea.current === 'original' ? 'auto' : 'auto', // Set initial height
                                }}
                            />}
                        </div>
                        <div className={`row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] overflow-y-scroll border-[#E5E7EB] ${isSwapped ? 'order-2' : 'order-1'}`}>
                            <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
                            {translated.isLoading || loading ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <CircularProgress />
                            </Box> : <p className='text-[#383E42] text-sm pt-3'>{translated.text}</p>}
                        </div>
                    </div>
                </div>
            </HomeLayout>
        </div>
    );

    // return (
    //     <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
    //         <div className="flex md:justify-between flex-wrap px-5 pt-10">
    //             <div className=''>
    //                 <Image
    //                     src={require('../../assets/icons/arrow-narrow-left_1.svg')}
    //                     alt="documents"
    //                     className="cursor-pointer pb-5 mx-10"
    //                     width={20}
    //                     onClick={() => router.back()}
    //                 />
    //                 {/* User's name */}
    //                 <h1 className="text-2xl mx-10  text-gray-500">Translation Details</h1>
    //             </div>
    //             {/* Action icons */}
    //             <ActionIcons />
    //         </div>
    //         {/* Min and Max */}
    //         <div className="bg-white border my-10 mx-10 rounded-[1rem]">
    //             <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
    //             {hideMeta === true && (
    //                 <div className="pl-5 my-5 ">
    //                     <p className="text-md text-gray-500 text-2xl">{ }</p>
    //                     <h1 className="md:text-3xl whitespace-nowrap text-gray-500 overflow-hidden overflow-ellipsis">
    //                         {singleHistory?.title}
    //                     </h1>
    //                 </div>
    //             )}
    //             {hideMeta === false && (
    //                 <h1 className="md:text-lg font-bold pl-5 pb-2">
    //                     {/* {summaryTitle ? summaryTitle : <h1> No available title</h1>} */}
    //                     {/* Use the extracted title value from Redux */}
    //                 </h1>
    //             )}
    //         </div>
    //         <div className="my-10 mx-5 pb-10">
    //             <div className='m-5 grid grid-cols-2 gap-4'>
    //                 <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]">
    //                     <span className=' text-[#383E42] text-xl font-bold'>Original Text</span>
    //                     <p className='text-[#383E42] text-sm pt-3'>{singleHistory?.text}</p>
    //                 </div>
    //                 <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] overflow-y-scroll border-[#E5E7EB]">
    //                     <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
    //                     <p className='text-[#383E42] text-sm pt-3'>{singleHistory?.textTranslation}
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default HomeContent;

function debouncedHandleChange() {
    throw new Error('Function not implemented.');
}
