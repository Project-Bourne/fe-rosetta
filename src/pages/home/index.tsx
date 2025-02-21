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

export default function Reader() {
  const { original, translated, isSwapped } = useSelector((state: any) => state?.translate);
  const [showContext, setShowContext] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
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
                {/* {showContext ? */}
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
                  </Tooltip>
                  {/* // <Tooltip title="Show Translation with Context" className="badge-icon absolute top-2 right-2 cursor-pointer" onClick={() => setShowContext(!showContext)}>
                  //   <div className="w-8 h-8 bg-white text-white rounded-full flex items-center justify-center">
                  //     <Image
                  //       src={require(`../../assets/icons/eye.svg`)}
                  //       alt="upload image"
                  //       width={20}
                  //       height={20}
                  //       priority
                  //     />
                  //   </div>
                  // </Tooltip>
                // } */}
                </>
              }

              {translated.isLoading || loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <p className='text-[#383E42] text-sm pt-3'>{!showContext ? translated.text : translated.context}</p>
              )}
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center' onClick={debouncedHandleChange}> <div className='bg-sirp-primary cursor-pointer text-white font-bold rounded-lg py-2 px-4 w-[20%] flex items-center justify-center'>Run Translator</div></div>
      </HomeLayout>
    </div>
  );
}

