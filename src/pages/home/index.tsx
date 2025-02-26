import React, { useState, useRef, useEffect } from 'react';
import HomeLayout from '@/layout/HomeLayout';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { useTruncate } from "@/components/custom-hooks";
import { setOriginalText, seTranslatedData, setOriginal, setTranslated, setTranslatedUuid } from '@/redux/reducer/translateSlice';
import _debounce from 'lodash/debounce';
import TranslatorService from '@/services/Translator.service';
import NotificationService from '@/services/notification.service';
import { errorMonitor } from 'events';
import AuthService from '@/services/auth.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import ReactMarkdown from 'react-markdown';

export default function Reader() {
  const { original, translated, isSwapped } = useSelector((state: any) => state?.translate);
  const [showContext, setShowContext] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState({
    original: false,
    translated: false
  });
  const focusedTextarea = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTranslated({
      text: '',
      context:'',
      lang: '',
    }))
    dispatch(setOriginal({
      text: '',
      lang: '',
      context:'',
    }))
  }, [])

  useEffect(() => {
    setLoading(true);
    try {
      AuthService
        .getUserViaAccessToken()
        .then((response) => {
          setLoading(false);
          if (response?.status) {
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Error",
            addedText: "Could not fetch user data",
            position: "top-center",
          });
        });
    } catch (err) {
      // console.log(err);
    }
  }, []);

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
      // console.log(response.data, 'responseeeeeee')
      if (response.status) {
        dispatch(setTranslated({
          text: response.data.textTranslation,
          context: response.data.textTranslationContext,
          lang: response.data.targetLang,
        }))
        dispatch(setOriginal({
          text: response.data.text,
          lang: response.data.sourceLang,
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
    if (e.key === 'Enter') {
    
      await debouncedHandleChange();
      setEditMode(false);

    }
  };

  const handleTextareaBlur = () => {
    setEditMode(false);
  };

  const handlechange = async (e) => {
    e.preventDefault();
    dispatch(setOriginalText(e.target.value))
  }
  useEffect(() => {
    if (focusedTextarea.current && focusedTextarea.current.value) {
      focusedTextarea.current.value = original?.text;
    }
  }, [original]);


  return (
    <div className='lg:m-10 py-5 rounded-[1rem] bg-[#F9F9F9]'>
      <HomeLayout>
        <div className='p-5'>
          <div className='m-5 grid grid-cols-2 gap-4'>
            <div className={`row-span-2 p-5 rounded-[20px] bg-[#f4f5f6] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB] relative`}>
              <div className="flex justify-between items-center mb-4">
                <span className='text-[#383E42] text-xl font-bold'>Original Text</span>
                <Tooltip title={showMarkdown.original ? "Show Plain Text" : "Show Markdown"}>
                  <div 
                    className={`w-8 h-8 ${showMarkdown.original ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`}
                    onClick={() => setShowMarkdown(prev => ({ ...prev, original: !prev.original }))}
                  >
                    <Image
                      src={require(`../../assets/icons/markdown.svg`)}
                      alt="toggle markdown"
                      width={20}
                      height={20}
                      priority
                    />
                  </div>
                </Tooltip>
              </div>
              {original.isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : showMarkdown.original ? (
                <div className="prose max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p {...props} className="text-gray-500 hover:text-gray-400">
                          {props.children}
                        </p>
                      )
                    }}
                  >{original.text}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  ref={focusedTextarea}
                  className='text-[#383E42] h-full text-sm pt-3 bg-transparent border-0 outline-none w-full resize-none'
                  value={original.text}
                  onClick={handleTextareaClick}
                  onBlur={handleTextareaBlur}
                  onChange={handlechange}
                  onFocus={() => {
                    focusedTextarea.current = 'original';
                  }}
                  onKeyDown={handleKeyDown}
                  rows={20}
                  style={{
                    height: editMode && focusedTextarea.current === 'original' ? 'auto' : 'auto',
                  }}
                />

                // <ReactMarkdown
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
              )}
            </div>
            <div className={`row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] relative overflow-y-scroll border-[#E5E7EB] ${isSwapped ? 'order-2' : 'order-1'}`}>
              <div className="flex justify-between items-center mb-4">
                <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
                <div className="flex gap-2">
                  {translated?.context?.length > 0 && (
                    <Tooltip title={showContext ? "Show Translation" : "Show Translation with Context"}>
                      <div 
                        className={`w-8 h-8 ${showContext ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`}
                        onClick={() => setShowContext(!showContext)}
                      >
                        <Image
                          src={require(`../../assets/icons/${showContext ? 'on.eye.svg' : 'eye.svg'}`)}
                          alt="toggle context"
                          width={20}
                          height={20}
                          priority
                        />
                      </div>
                    </Tooltip>
                  )}
                  <Tooltip title={showMarkdown.translated ? "Show Plain Text" : "Show Markdown"}>
                    <div 
                      className={`w-8 h-8 ${showMarkdown.translated ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`}
                      onClick={() => setShowMarkdown(prev => ({ ...prev, translated: !prev.translated }))}
                    >
                      <Image
                        src={require(`../../assets/icons/markdown.svg`)}
                        alt="toggle markdown"
                        width={20}
                        height={20}
                        priority
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>

              {translated.isLoading || loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : showMarkdown.translated ? (
                <div className="prose max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p {...props} className="text-gray-500 hover:text-gray-400">
                          {props.children}
                        </p>
                      )
                    }}
                  >
                    {!showContext ? translated.text : translated.context}
                  </ReactMarkdown>
                </div>
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
        <div className='w-full flex items-center justify-center' onClick={debouncedHandleChange}>
          <div className='bg-sirp-primary cursor-pointer text-white font-bold rounded-lg py-2 px-4 w-[80%] md:w-[20%] flex items-center justify-center'>
            Run Translator
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}

