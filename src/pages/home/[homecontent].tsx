import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import BreadCrum from '../../components/ui/Breadcrumbs';
import Min_and_Max_icon from './components/Min_Max_icon';
import ActionIcons from './components/actionIcons/ActionIcon';
import TranslatorService from '../../services/Translator.service';
import {
    setSingleHistory,
} from '@/redux/reducer/translateSlice';
import { useDispatch, useSelector } from 'react-redux';
import BasicTabs from './components/history/tab';

function HomeContent() {
    const router = useRouter();
    const [hideMeta, setHideMeta] = useState(true);
    const { homecontent } = router.query;
    const dispatch = useDispatch();
    const { singleHistory } =
        useSelector(
            (state: any) => state.translate // Include summaryTitle in the state selector
        );

    const handleMax = () => {
        setHideMeta(true);
    };

    const handleMin = () => {
        setHideMeta(false);
    };

    useEffect(() => {
        TranslatorService.getTranslationsById(homecontent)
            .then(translate => {
                if (homecontent) {
                    dispatch(setSingleHistory(translate.data))
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [dispatch, homecontent]);

    return (
        <div className="bg-sirp-secondary2 h-[100%] mx-5 rounded-[1rem]">
            <div className="flex md:justify-between flex-wrap px-5 pt-10">
                <div className=''>
                    <Image
                        src={require('../../../public/icons/arrow-narrow-left_1.svg')}
                        alt="documents"
                        className="cursor-pointer pb-5 mx-10"
                        width={20}
                        onClick={() => router.back()}
                    />
                    {/* User's name */}
                    <h1 className="text-2xl mx-10  text-gray-500">Translation Details</h1>
                </div>
                {/* Action icons */}
                <ActionIcons />
            </div>
            {/* Min and Max */}
            <div className="bg-white border my-10 mx-10 rounded-[1rem]">
                <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
                {hideMeta === true && (
                    <div className="pl-5 my-5 ">
                        <p className="text-md text-gray-500 text-2xl">{ }</p>
                        <h1 className="md:text-3xl whitespace-nowrap text-gray-500 overflow-hidden overflow-ellipsis">
                            {singleHistory?.title}
                        </h1>
                    </div>
                )}
                {hideMeta === false && (
                    <h1 className="md:text-lg font-bold pl-5 pb-2">
                        {/* {summaryTitle ? summaryTitle : <h1> No available title</h1>} */}
                        {/* Use the extracted title value from Redux */}
                    </h1>
                )}
            </div>
            <div className="my-10 mx-5 pb-10">
                <div className='m-5 grid grid-cols-2 gap-4'>
                    <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] max-h-[60vh] overflow-y-scroll border-2 border-[#E5E7EB]">
                        <span className=' text-[#383E42] text-xl font-bold'>Original Text</span>
                        <p className='text-[#383E42] text-sm pt-3'>{singleHistory?.text}</p>
                    </div>
                    <div className="row-span-2 p-5 rounded-[20px] bg-[#E8EAEC] border-2 max-h-[60vh] overflow-y-scroll border-[#E5E7EB]">
                        <span className='text-[#383E42] text-xl font-bold'>Translated Text</span>
                        <p className='text-[#383E42] text-sm pt-3'>{singleHistory?.textTranslation}
                        </p>
                    </div>
                </div>
            </div>
            <BasicTabs />
        </div>
    );
}

export default HomeContent;
