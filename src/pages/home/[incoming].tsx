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
      // Clear states first
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
          // console.log(data, "data-router")
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
                value={original.text}
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
            <div className={`row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] relative overflow-y-scroll border-[#E5E7EB] ${isSwapped ? 'order-2' : 'order-1'}`}>
              <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
              {translated?.context?.length > 0 &&
                <>
                  {showContext ?
                    <Tooltip title="Show Translation" className="badge-icon absolute top-2 right-2 cursor-pointer" onClick={() => setShowContext(!showContext)}>
                      <div className="w-8 h-8 bg-sirp-primary text-white rounded-full flex items-center justify-center">
                        <Image
                          src={require(`../../assets/icons/on.eye.svg`)}
                          alt="upload image"
                          width={20}
                          height={20}
                          priority
                        />
                      </div>
                    </Tooltip> :
                    <Tooltip title="Show Translation with Context" className="badge-icon absolute top-2 right-2 cursor-pointer" onClick={() => setShowContext(!showContext)}>
                      <div className="w-8 h-8 bg-white text-white rounded-full flex items-center justify-center">
                        <Image
                          src={require(`../../assets/icons/eye.svg`)}
                          alt="upload image"
                          width={20}
                          height={20}
                          priority
                        />
                      </div>
                    </Tooltip>
                  }
                </>
              }

              <Tooltip title={markdownView ? "Show Plain Text" : "Show Markdown"} className="badge-icon absolute top-2 right-12 cursor-pointer">
                <div 
                  className={`w-8 h-8 ${markdownView ? 'bg-sirp-primary' : 'bg-white'} text-white rounded-full flex items-center justify-center`}
                  onClick={() => setMarkdownView(!markdownView)}
                >
                  <Image
                    src={markdownIcon}
                    alt="toggle markdown"
                    width={20}
                    height={20}
                    priority
                  />
                </div>
              </Tooltip>

              {translated.isLoading || loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <div className='text-[#383E42] text-sm pt-3'>
                  {markdownView ? (
                    <div className="prose max-w-none">
                      <ReactMarkdown
                        components={{
                          a: ({ href, children }) => (
                            <a href={href} className="text-sirp-primary">{children}</a>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside">{children}</ol>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-sirp-primary pl-4 italic">{children}</blockquote>
                          )
                        }}
                      >
                        {!showContext ? translated.text : translated.context}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{!showContext ? translated.text : translated.context}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center' onClick={debouncedHandleChange}> <div className='bg-sirp-primary cursor-pointer text-white font-bold rounded-lg py-2 px-4 w-[20%] flex items-center justify-center'>Run Translator</div></div>
      </HomeLayout>
    </div>
  );
}
