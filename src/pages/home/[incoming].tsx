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
import CustomModal from '@/components/ui/CustomModal';
import Loader from '@/components/ui/Loader';

export default function Reader() {
  const { original, translated, isSwapped } = useSelector(
    (state: any) => state?.translate
  );
  const [showContext, setShowContext] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState('');
  const focusedTextarea = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { incoming } = router.query;
  const cookies = new Cookies();
  const token = cookies.get('deep-access');

  const headers = {
    'deep-token': token
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (typeof incoming === 'string') {
        try {
          const [routeId, routeName] = incoming.split('&');
          let url;

          switch (routeName) {
            case 'summarizer':
              url = `http://192.81.213.226:81/82/summary/${routeId}`;
              break;
            case 'translator':
              url = `http://192.81.213.226:81/83/translation/${routeId}`;
              break;
            case 'factcheck':
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case 'deepchat':
              url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              break;
            case 'analyzer':
              url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              break;
            case 'interrogator':
              url = `http://192.81.213.226:81/837/interrogator/${routeId}`;
              break;
            case 'collab':
              url = `http://192.81.213.226:81/86/api/v1/${routeId}`;
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
          switch (routeName) {
            case 'translator':
              setFormData(data?.data?.textTranslation);
              break;
            case 'factcheck':
              setFormData(data?.data?.confidence?.content);
              break;
            case 'summarizer':
              setFormData(data?.data?.summaryArray[0].summary);
              break;
            case 'analyzer':
              setFormData(data?.data?.text);
            case 'interrogator':
            case 'collab':
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

  console.log(formData);

  useEffect(() => {
    dispatch(
      setTranslated({
        text: '',
        lang: 'en'
      })
    );
    dispatch(
      setOriginal({
        text: '',
        lang: 'auto'
      })
    );
  }, []);

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
      console.log(err);
    }
  }, []);

  const debouncedHandleChange = async () => {
    try {
      const data = {
        text: original.text,
        sourceLang: original.lang == 'auto' ? '' : original.lang,
        targetLang: translated.lang
      };
      const response = await TranslatorService.translate(data);
      if (response.status) {
        dispatch(
          setTranslated({
            text: response.data.textTranslation,
            context: response.data.textTranslationContext,
            lang: 'en'
          })
        );
        dispatch(
          setOriginal({
            text: response.data.text,
            lang: 'auto'
          })
        );
        dispatch(setTranslatedUuid(response.data.uuid));
        setLoading(false);
      } else {
        NotificationService.error({
          message: 'Error!',
          addedText: <p>{response.message}. please try again</p>
        });
      }
    } catch (error) {
      console.log(error);
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
    dispatch(setOriginalText(formData));
  };
  useEffect(() => {
    if (focusedTextarea.current && focusedTextarea.current.value) {
      focusedTextarea.current.value = original?.text;
    }
  }, [original]);

  return (
    <div className="m-10 py-5 rounded-[1rem] bg-[#F9F9F9]">

{loading && (
        <CustomModal
          style="md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setLoading(false)}
        >
          <div className="flex justify-center items-center mt-[10rem]">
            <Loader />
          </div>
        </CustomModal>
      )}
      <HomeLayout>
        <div className="p-5">
          <div className="m-5 grid grid-cols-2 gap-4">
            <div
              className={`row-span-2 p-5 rounded-[20px] bg-[#f4f5f6] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]`}
            >
              <span className="text-[#383E42] text-xl font-bold">
                Original Text
              </span>
              {original.isLoading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <textarea
                  ref={focusedTextarea}
                  className="text-[#383E42] h-full text-sm pt-3 bg-transparent border-0 outline-none w-full resize-none"
                  value={formData}
                  onClick={handleTextareaClick}
                  onBlur={handleTextareaBlur}
                  onChange={handlechange}
                  onFocus={() => {
                    focusedTextarea.current = 'original';
                  }}
                  onKeyDown={handleKeyDown}
                  rows={20} // Set an initial value for rows
                  style={{
                    height:
                      editMode && focusedTextarea.current === 'original'
                        ? 'auto'
                        : 'auto' // Set initial height
                  }}
                />
              )}
            </div>
            <div
              className={`row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] relative overflow-y-scroll border-[#E5E7EB] ${
                isSwapped ? 'order-2' : 'order-1'
              }`}
            >
              <span className="text-[#383E42] text-xl font-bold">
                Translated Text
              </span>
              {showContext ? (
                <Tooltip
                  title="Get normal traslation"
                  className="badge-icon absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShowContext(!showContext)}
                >
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
              ) : (
                <Tooltip
                  title="Get a contextual traslation"
                  className="badge-icon absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShowContext(!showContext)}
                >
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
              )}
              {translated.isLoading || loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <p className="text-[#383E42] text-sm pt-3">
                  {!showContext ? translated.text : translated.context}
                </p>
              )}
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}
