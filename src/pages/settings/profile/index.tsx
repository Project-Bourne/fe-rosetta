import SettingsLayout from '@/layout/SettingsLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { View1, View2 } from '../components';
import { Button, Dropdown, DropdownWithFlag } from '@/components/ui';
import { UserRoles } from '@/utils/constants';
import { useCountries } from 'use-react-countries';



const ProfileSettings = () => {


  return (
    <SettingsLayout>

      {/* First View Component */}
      <View1/>

      {/* Second View Component */}
      <View2 />
    </SettingsLayout>
  )
}

export default ProfileSettings;