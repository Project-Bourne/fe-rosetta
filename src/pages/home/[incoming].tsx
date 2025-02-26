import React, { useState, useRef, useEffect } from 'react';
import HomeLayout from '@/layout/HomeLayout';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';
import {
  setOriginalText,
  seTranslatedData,
  setOriginal,
  setTranslated,
  setTranslatedUuid
} from '@/redux/reducer/translateSlice';
import _debounce from 'lodash/debounce';
import TranslatorService from '@/services/Translator.service';
import NotificationService from '@/services/notification.service';
import AuthService from '@/services/auth.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import ReactMarkdown from 'react-markdown';

const markdownIcon = require('../../../public/icons/markdown.svg');

export default function Reader() {
  const { original, translated, isSwapped } = useSelector(
    (state: any) => state?.translate
  );
  const [showContext, setShowContext] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState('');
  const focusedTextarea = useRef(null);
  const dispatch = useDispatch();
  // const [importText,setImportText] = useState('')
  const router = useRouter();
  const { incoming } = router.query;
  const cookies = new Cookies();
  const token = cookies.get('deep-access');
  const [markdownView, setMarkdownView] = useState(true);

  const headers = {
    'deep-token': token
  };

  useEffect(() => {
    const fetchData = async () => {
      // Clear both original and translated states first
      dispatch(setOriginal({
        text: '',
        lang: 'auto',
      }));
      dispatch(setTranslated({
        text: '',
        context: '',
        lang: 'en',
      }));
      dispatch(setTranslatedUuid(''));
      
      setLoading(true);
      if (typeof incoming === 'string') {
        try {
          const [routeId, routeName] = incoming.split('&');
          let url;

          // Clear translated text again when receiving data
          dispatch(setTranslated({
            text: '',
            context: '',
            lang: 'en',
          }));

          switch (routeName) {
            case 'summarizer':
              // url = `http://192.81.213.226:81/82/summary/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE}/summary/${routeId}`;
              break;
            case 'translator':
              // url = `http://192.81.213.226:81/83/translation/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE}/translation/${routeId}`;
              break;
            case 'factcheck':
              // url = `http://192.81.213.226:81/84/fact/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case 'irp':
              // url = `http://192.81.213.226:81/81/irp/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case 'deepchat':
              // url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE}/deepchat/${routeId}`;
              break;
            case 'analyser':
              // url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE}/analysis/${routeId}`;
              break;
            case 'collab':
              // url = `http://192.81.213.226:81/86/api/v1/doc/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/api/v1/doc/${routeId}`;
              break;
            case 'interrogator':
              // url = `http://192.81.213.226:82/87/interrogation/message/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE}/interrogation/message/${routeId}`;
              break;
            default:
              throw new Error('Invalid routeName');
          }

          const response = await fetch(url, {
            method: 'GET',
            headers: headers
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          
          // Clear translated text before setting original text
          dispatch(setTranslated({
            text: '',
            context: '',
            lang: 'en',
          }));

          switch (routeName) {
            case 'translator':
              dispatch(setOriginal({
                text: data?.data?.textTranslationt,
                lang: 'auto',
              }))
              break;
            case 'factcheck':
              dispatch(setOriginal({
                text: data?.data?.confidence?.content5wh,
                lang: 'auto',
              }))
              break;
            case 'irp':
              dispatch(setOriginal({
                text: data?.data?.confidence?.content5wh,
                lang: 'auto',
              }))
              break;
            case 'summarizer':
              dispatch(setOriginal({
                text: data?.data?.summaryArray[0].summary,
                lang: 'auto',
              }))
              break;
            case 'analyser':
              if(data?.data?.text){
                dispatch(setOriginal({
                  text: data?.data?.text,
                  lang: 'auto',
                }))
              }
              // console.log(data?.data?.text, 'data?.data?.text', data)
              break;
            case 'interrogator':
              dispatch(setOriginal({
                text: data?.data?.answer,
                lang: 'auto',
              }))
              break;
            case 'collab':
              const collabData: string[] = data?.data?.data?.ops.map((el) => {
                return el.insert;
              });
              dispatch(setOriginal({
                text: collabData.join(' '),
                lang: 'auto',
              }))
              break;
            case 'deepchat':
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
          console.error('Error:', error);
          NotificationService.error({
            message: 'Error!',
            addedText: <p>{`${error.message}, please try again`}</p>,
            position: 'top-center'
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [incoming]);


  // useEffect(() => {
  //   dispatch(
  //     setTranslated({
  //       text: '',
  //       lang: 'en'
  //     })
  //   );
  //   dispatch(
  //     setOriginal({
  //       text: '',
  //       lang: 'auto'
  //     })
  //   );
  // }, []);

  useEffect(() => {
    setLoading(true);
    try {
      AuthService.getUserViaAccessToken()
        .then(response => {
          setLoading(false);
          if (response?.status) {
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch(err => {
          NotificationService.error({
            message: 'Error',
            addedText: 'Could not fetch user data',
            position: 'top-center'
          });
        });
    } catch (err) {
      // console.log(err);
    }
  }, []);

  const debouncedHandleChange = async () => {
    // Clear translated state first
    dispatch(setTranslated({
      text: '',
      context: '',
      lang: translated.lang || 'en',
    }));
    
    setLoading(true);
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

  const handleKeyDown = async e => {
    if (e.key === 'Enter') {
      setLoading(true);
      await debouncedHandleChange();
      setEditMode(false);
      setLoading(false);
    }
  };

  const handleTextareaBlur = () => {
    setEditMode(false);
  };

  const handlechange = async e => {
    e.preventDefault();
    // dispatch(setOriginalText(formData));
    dispatch(setOriginalText(e.target.value))
  };
  useEffect(() => {
    if (focusedTextarea.current && focusedTextarea.current.value) {
      focusedTextarea.current.value = original?.text;
    }
  }, [original]);

  return (
    <div className='min-h-screen bg-[#F9F9F9]'>
      <HomeLayout>
        <div className='p-4 sm:p-5'>
          {/* Upload Section */}
          <div className='flex justify-center mb-6'>
            <div className='bg-white rounded-xl shadow-sm p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow w-[140px]'>
              <Image
                src={require(`../../assets/icons/upload.svg`)}
                alt="upload"
                width={40}
                height={40}
                priority
              />
              <span className='text-sirp-primary mt-2 text-center'>Upload File</span>
            </div>
          </div>

          {/* Text Areas */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white rounded-xl p-4 min-h-[400px] shadow-sm'>
              <span className='text-[#383E42] text-xl font-bold'>Original Text</span>
              {original.isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <textarea
                  ref={focusedTextarea}
                  className='text-[#383E42] h-full text-sm pt-3 bg-transparent border-0 outline-none w-full resize-none min-h-[300px]'
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
              )}
            </div>

            <div className={`bg-white rounded-xl p-4 min-h-[400px] shadow-sm relative ${isSwapped ? 'order-2' : 'order-1'}`}>
              <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
              {/* Context and Markdown toggles */}
              <div className="absolute top-4 right-4 flex gap-2">
                {translated?.context?.length > 0 && (
                  <Tooltip title={showContext ? "Show Translation" : "Show Translation with Context"}>
                    <div className={`w-8 h-8 ${showContext ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`}>
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
                <Tooltip title={markdownView ? "Show Plain Text" : "Show Markdown"}>
                  <div className={`w-8 h-8 ${markdownView ? 'bg-sirp-primary' : 'bg-white'} rounded-full flex items-center justify-center shadow-sm cursor-pointer`}>
                    <Image
                      src={markdownIcon}
                      alt="toggle markdown"
                      width={20}
                      height={20}
                      priority
                    />
                  </div>
                </Tooltip>
              </div>

              {/* Content */}
              {translated.isLoading || loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div className='text-[#383E42] text-sm pt-3'>
                  {markdownView ? (
                    <div className="prose max-w-none">
                      <ReactMarkdown>
                        {!showContext ? translated.text : translated.context}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    // <p>{!showContext ? translated.text : translated.context}</p>
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
              )}
            </div>
          </div>

          {/* Run Translator Button */}
          <div className='mt-6 flex justify-center w-full md:w-[400px]'>
            <button 
              onClick={debouncedHandleChange}
              className='w-full bg-sirp-primary text-white font-bold rounded-xl py-3 px-6 hover:bg-opacity-90 transition-colors shadow-sm'
            >
              Run Translator
            </button>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}
