import SettingsLayout from '@/layout/SettingsLayout'
import React from 'react'
import { SettingsData } from '@/utils/constants';

const PersonalizationSettings = () => {
  return (
    <SettingsLayout data={SettingsData}>
      <div>PersonalizationSettings</div>
    </SettingsLayout>
  )
}

export default PersonalizationSettings;