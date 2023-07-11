import { HomeData } from '@/utils/constants';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import { LanguagesDropdown } from '../../components/ui/Input'

type LayoutType = {
    children: ReactNode;
};

const HomeLayout = ({ children }: LayoutType) => {
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [translatedLang, setTranslatedLang] = useState('')
    const [languages, setLanguages] = useState([])

    const handleChange = (e) => {
        e.preventDefault();
        setSelectedLanguage(e.target.value)
    }

    const handleTranslation = (e) => {
        e.preventDefault();
        setTranslatedLang(e.target.value)
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full border-b">
                {/* Header */}
                <div className="flex flex-row w-full py-7 px-7 items-center justify-between">
                    <h1 className="text-[18px] font-semibold">Add Content</h1>
                </div>
                <div className="w-[100%] flex-wrap flex flex-row items-center border-b justify-between overscroll-y-auto">
                    <div className="left w-[49%] flex items-center justify-between">
                        {/* {selectedLanguage.length > 1 && <span className='px-8 pt-3 flex cursor-pointer flex-row flex-wrap items-center w-[100%] border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'>{selectedLanguage}</span>} */}
                        <LanguagesDropdown
                            data={languages}
                            selectItem={setSelectedLanguage}
                            className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-7  w-[38%]'
                            style={"w-[100%] mx-4"} />
                    </div>
                    <span className='arrow w-[20px]'>
                        <Image
                            src={require(`../../assets/icons/arrows.svg`)}
                            alt="dropdown"
                            width={18}
                            height={18}
                            priority
                        />
                    </span>
                    <div className="right w-[49%] flex items-center justify-between">
                        {/* {translatedLang.length > 1 && <span className='px-8 pt-3 flex cursor-pointer flex-row flex-wrap items-center border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'>{translatedLang}</span>} */}
                        <LanguagesDropdown
                            data={languages}
                            selectItem={setTranslatedLang}
                            className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-7  w-[38%]'
                            style={"w-[100%] mx-4"} />
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default HomeLayout;
