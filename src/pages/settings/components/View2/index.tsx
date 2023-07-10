import { Dropdown, DropdownWithFlag } from '@/components/ui';
import Image from 'next/image';
import React, { useState } from 'react'
import { UserRoles } from '@/utils/constants';
import { useCountries } from 'use-react-countries';
import { useRouter } from 'next/router';

const View2 = () => {


    const router = useRouter();
    const { countries } = useCountries()

    const [country, setCountry] = useState(null);
    const [role, setRole] = useState("");
    const [file, setFile] = useState()
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleFileUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        setFile(selectedFile);


        if (selectedFile) {
            setIsFileUploaded(true);
        }
    };

  return (
    <div className='py-4 w-full mt-3 border-b-[1.5px]'>
        <div className='flex flex-col w-full'>
        <h2 className='font-semibold text-[13px] px-8'>Profile Picture</h2>
        <div className='flex flex-row w-full items-center my-4 border-b px-8 pb-2'>
            <div className='w-[80px]'>
            <p className='text-[12px] text-sirp-grey'>AVI:</p>
            </div>

            <div className='flex flex-col ml-[3vh] items-center bo'>
            
            {/* Profile Image */}
            <div className='flex flex-row items-center'>
                <Image
                src={require(`../../../../assets/icons/userIcon.svg`)}
                alt="user"
                width={30}
                height={30}
                className='cursor-pointer mx-5'
                priority
                />

                <div className='px-6 py-2 cursor-pointer border border-sirp-primaryLess1 rounded-md'>
                     <input
                        id="file-upload"
                        type="file"
                        accept=".txt,.rtf,.doc,.pdf,.svg,.mp4"
                        className="hidden"
                    />
                <p className='text-[11px] font-semibold text-sirp-primary'>Change</p>
                </div>

                <Image
                src={require(`../../../../assets/icons/delete.svg`)}
                alt="delete"
                width={17}
                height={17}
                className='cursor-pointer mx-5'
                priority
                />
            </div>
            <p className='text-[11px] text-gray-400 my-1'>JPG, PNG or GIF - 1MB Max</p>
            </div>
        </div>
        
        </div>

        {/* Roles */}
        <div className='flex flex-row items-center my-[20px] w-full px-8'>
        <div className='w-[80px]'>
            <label htmlFor='email' className='text-[12px] text-sirp-grey'>Role: </label>
        </div>
        
        <Dropdown
            data={UserRoles}
            onChange={(e) => setRole(e.target.value)}
            className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-2 mx-4 w-[38%]'
            style={{fontSize: 12}}
        />
        </div>


        {/* Countries */}
        <div className='flex flex-row items-center my-[20px] w-full px-8'>
        <div className='w-[80px]'>
            <label htmlFor='email' className='text-[12px] text-sirp-grey'>Country: </label>
        </div>

        <DropdownWithFlag
            data={countries}
            selectItem={setCountry}
            className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-7  w-[38%]'
            style={"w-[38%] mx-4"}
        />
        </div>
    </div>
  )
}

export default View2;