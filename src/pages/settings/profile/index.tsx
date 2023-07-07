import SettingsLayout from '@/layout/SettingsLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { View1, View2 } from '../components';
import { SettingsData } from '@/utils/constants';
import { Button, Dropdown, DropdownWithFlag } from '@/components/ui';
import { UserRoles } from '@/utils/constants';
import { useCountries } from 'use-react-countries';



const ProfileSettings = () => {


  return (
    <SettingsLayout data={SettingsData}>

      {/* First View Component */}
      <View1/>

      {/* Second View Component */}
      <View2 />
    </SettingsLayout>
  )
}

export default ProfileSettings;