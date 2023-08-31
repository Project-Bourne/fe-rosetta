import SettingsLayout from '@/layout/SettingsLayout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { SettingsData } from '@/utils/constants';
import { Button, Dropdown, DropdownWithFlag } from '@/components/ui';
import { UserRoles } from '@/utils/constants';



const ProfileSettings = () => {


  return (
    <SettingsLayout data={SettingsData}>

      {/* First View Component */}
      {/*<View1/>*/}

      {/* Second View Component */}
      {/*<View2 />*/}
    </SettingsLayout>
  )
}

export default ProfileSettings;
