import { CustomSwitch } from '@/components/ui';
import { SettingsData } from '@/utils/constants';
import SettingsLayout from '@/layout/SettingsLayout'
import { EmailNotificationData, PushNotificationData } from '@/utils/constants';
import React from 'react'

const NotificationSettings = () => {
  return (
    <SettingsLayout data={SettingsData}>

      {/* Email Notification */}
      <div className='border-b w-full'>
        <div className='w-full px-8 py-8 flex flex-row justify-evenly items-start'>
          <div className='w-[40%]'>
            <p className='text-[13px] font-semibold my-5'>Email Notifications</p>
            <p className='text-[11px] text-sirp-grey w-[30%]'>Get emails to find out the activities happening on your profile.</p>
          </div>

          <div className='w-[60%]'>
            {
              EmailNotificationData.map((item, index) => (
                <CustomSwitch title={item.name} content={item.content} key={index} />
              ))
            }
          </div>
        </div>
      </div>

      {/* Push Notification */}
      <div className='w-full'>
        <div className='w-full px-8 py-8 flex flex-row justify-evenly items-start'>
          <div className='w-[40%]'>
            <p className='text-[13px] font-semibold my-5'>Push Notifications</p>
            <p className='text-[11px] text-sirp-grey w-[30%]'>Get push notifications in-app to find out the activities happening on your profile.</p>
          </div>

          <div className='w-[60%]'>
            {
              PushNotificationData.map((item, index) => (
                <CustomSwitch title={item.name} content={item.content} key={index} />
              ))
            }
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default NotificationSettings;