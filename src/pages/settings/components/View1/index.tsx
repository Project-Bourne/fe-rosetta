import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const View1 = () => {

    const router = useRouter();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

  return (
    <div className='py-4 px-8 w-full mt-3 border-b-[1.5px]'>
        <div className='flex flex-row w-full items-center justify-between'>
          <h2 className='font-semibold text-[13px]'>Personal Information</h2>
          <div className='flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer'>
            <Image
              src={require(`../../../../../public/icons/edit.svg`)}
              alt="Edit btn"
              width={18}
              height={18}
              style={{marginRight: 15}}
              priority
            />
            <h2 className='text-[13px] text-sirp-primary'>Edit Profile</h2>
          </div>
        </div>

        {/* Names */}
        <div className='flex flex-row items-center my-[20px] w-full'>
          <label htmlFor='name' className='text-[12px] text-sirp-grey'>Name: </label>

          <div className='ml-[3vh] w-full'>
            <input
              name='name'
              type='text'
              placeholder='First name'
              onChange={(e: any) => setFirstname(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[18%]'
            />
            <input
              type='text'
              placeholder='Last name'
              onChange={(e: any) => setLastname(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[18%]'
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-row items-center my-[20px] w-full'>
          <label htmlFor='email' className='text-[12px] text-sirp-grey'>Email: </label>

          <div className='ml-[3vh] w-full items-center flex flex-row relative'>
            <Image
              src={require(`../../../../../public/icons/mail.svg`)}
              alt="mail"
              width={16}
              height={16}
              className='absolute self-center item-center left-[2.3vh]'
            />

            <input
              type='email'
              name='email'
              placeholder='Email Address'
              onChange={(e: any) => setEmail(e)}
              className='text-[12px] text-black border-[1.5px] rounded-md py-2 px-7 mx-4 w-[38%]'
            />

          </div>
        </div>

      </div>
  )
}

export default View1;
