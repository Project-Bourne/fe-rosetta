import Image from 'next/image'
import React, { useEffect } from 'react'
import  TabComp  from './components/TabComp'
import { SettingsData } from '@/utils/constants'
import ProfileSettings from './profile'
import { useRouter } from 'next/router'

function Settings() {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      {
        pathname: `/settings/profile`,
      },
      undefined,
      { shallow: true }
    )
  }, []);

  return (
    <></>
  )
}

export default Settings
