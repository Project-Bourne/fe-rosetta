import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import BreadCrum from '../../components/ui/Breadcrumbs';
import ActionIcons from '../home/components/actionIcons/ActionIcon';
import TranslatorService from '../../services/Translator.service';
import {
    setSingleHistory,
} from '@/redux/reducer/translateSlice';
import { setOriginalText, seTranslatedData, setOriginal, setTranslated, setTranslatedUuid } from '@/redux/reducer/translateSlice';
import { useDispatch, useSelector } from 'react-redux';
import BasicTabs from '.';
import NotificationService from '@/services/notification.service';
import HomeLayout from '@/layout/HomeLayout';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';

function HomeContent() {
    const { original, translated, isSwapped } = useSelector((state: any) => state?.translate);
    const router = useRouter();
    const [showContext, setShowContext] = useState(false);
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
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (homecontent) {
            TranslatorService.getTranslationsById(homecontent)
                .then(translate => {
                    // dispatch(setSingleHistory(translate.data))
                    dispatch(setTranslated({
                        text: translate.data.textTranslation,
                        lang: translate.data.targetLang,
                    }))
                    dispatch(setTranslatedUuid(translate.data.uuid))
                    dispatch(setOriginal({
                        text: translate.data.text,
                        lang: translate.data.sourceLang,
                    }))
                })
                .catch(err => {
                    router.replace('/history')
                    NotificationService.error({
                        message: "something went wrong",
                    });
                    // console.log(err);
                });
        }
    }, [homecontent]);
    
    const debouncedHandleChange = async () => {
      setLoading(true)
      try {
        const data = {
          text: original.text,
          sourceLang: original.lang == 'auto' ? '' : original.lang,
          targetLang: translated.lang,
        }
        if (!data.text || !data.targetLang) {
          NotificationService.error({
            message: "Error!",
            addedText: <p>Text cannot be empty. Select A Language for your text to be translated to.</p>,
          });
        }
  
        const response = await TranslatorService.translate(data)
        if (response.status) {
          dispatch(setTranslated({
            text: response.data.textTranslation,
            context: response.data.textTranslationContext,
            lang: 'en',
          }))
          dispatch(setOriginal({
            text: response.data.text,
            lang: 'auto',
          }))
          dispatch(setTranslatedUuid(response.data.uuid))
          setLoading(false);
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{response.message}. please try again</p>,
  
          });
          setLoading(false)
        }
  
      } catch (error) {
        // console.log(error)
        setLoading(false)
      }
    };
    

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

    const handleCopyText = () => {
        const textToCopy = !showContext ? translated.text : translated.context;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            NotificationService.success({
                message: "Copied!",
                addedText: "Text copied to clipboard",
                position: "bottom-right"
            });
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(() => {
            NotificationService.error({
                message: "Error!",
                addedText: "Failed to copy text",
                position: "bottom-right"
            });
        });
    };

    return (
        <div className='lg:m-10 py-5 rounded-[1rem] bg-[#F9F9F9]'>
          <HomeLayout>
            <div className='p-5'>
              <div className='m-5 grid grid-cols-2 gap-4'>
                <div className={`row-span-2 p-5 rounded-[20px] bg-[#f4f5f6] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]`}>
                  <span className='text-[#383E42] text-xl font-bold'>Original Text</span>
                  {original.isLoading ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box> : 
                  <textarea
                    ref={focusedTextarea}
                    className='text-[#383E42] h-full text-sm pt-3 bg-transparent border-0 outline-none w-full resize-none'
                    value={original.text?.replace(/[*#_`~]/g, '')}
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
                  />


              //   <ReactMarkdown
              //   components={{
              //     p: ({ node, ...props }) => (
              //       <p {...props} className="text-gray-500 hover:text-gray-400">
              //         {props.children}
              //       </p>
              //     )
              //   }}
              // >
              //   {original.text}
              // </ReactMarkdown>
                  }
                </div>
                <div className={`row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] relative overflow-y-scroll border-[#E5E7EB] ${isSwapped ? 'order-2' : 'order-1'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
                    <div className="flex gap-2">
                      <Tooltip title="Copy text">
                        <div 
                          className={`w-8 h-8 ${isCopied ? 'bg-green-500' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors duration-200`}
                          onClick={handleCopyText}
                        >
                          <Image
                            src={require(`../../assets/icons/${isCopied ? 'square-check 1.svg' : 'file-arrow.svg'}`)}
                            alt="copy text"
                            width={20}
                            height={20}
                            priority
                          />
                        </div>
                      </Tooltip>
                      {/* {translated?.context?.length > 0 && (
                        <Tooltip title={showContext ? "Show Translation" : "Show Translation with Context"}>
                          <div className={`w-8 h-8 ${showContext ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`} onClick={() => setShowContext(!showContext)}>
                            <Image
                              src={require(`../../assets/icons/${showContext ? 'on.eye.svg' : 'eye.svg'}`)}
                              alt="toggle context"
                              width={20}
                              height={20}
                              priority
                            />
                          </div>
                        </Tooltip>
                      )} */}
                    </div>
                  </div>
    
                  {translated.isLoading || loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    // <p className='text-[#383E42] text-sm pt-3'>{!showContext ? translated.text : translated.context}</p>
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => (
                          <p {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </p>
                        ),
                        h1: ({ node, ...props }) => (
                          <h1 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h1>
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h2>
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h3>
                        ),
                        h4: ({ node, ...props }) => (
                          <h4 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h4>
                        ),
                        h5: ({ node, ...props }) => (
                          <h5 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h5>
                        ),
                        h6: ({ node, ...props }) => (
                          <h6 {...props} className="text-gray-500 hover:text-gray-400">
                            {props.children} <br /> <br />
                          </h6>
                        )
                      }}
                    >
                      {translated.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
            <div className='w-full flex items-center justify-center' onClick={debouncedHandleChange}> <div className='bg-sirp-primary cursor-pointer text-white font-bold rounded-lg py-2 px-4 w-[20%] flex items-center justify-center'>Run Translator</div></div>
          </HomeLayout>
        </div>
      );
}

export default HomeContent;