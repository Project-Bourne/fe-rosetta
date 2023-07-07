// home page
import { useState } from 'react';
import HomeLayout from '@/layout/HomeLayout'
import { HomeSubData } from '@/utils/constants';
import HomeHistory from './components/history'
import SettingsLayout from '@/layout/SettingsLayout'
import { useRouter } from 'next/router';
import FileUpload from './components/FileUpload';


function Home() {
  const showTitle = false;
  const router = useRouter()
  console.log(router, 'i am router')
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className='m-10 py-5 rounded-lg bg-[#F9F9F9]'>
      <HomeLayout>
        <FileUpload />
      </HomeLayout>

      <SettingsLayout showTitle={showTitle} data={HomeSubData}>
        <HomeHistory />
      </SettingsLayout>
    </div>

  )
}

export default Home;