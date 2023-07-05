import React from 'react'
import {Switch} from "@mui/material"
import { CustomSwitchType } from '@/models/ui/components.models';


const CustomSwitch = (props: CustomSwitchType) => {
    const {title, content} = props;
  return (
    <div className='w-[100%] flex flex-row mb-7'>
        <Switch defaultChecked size={"small"} color={'success'}/>
        
        <div className='ml-[20px]'>
            <p className='text-[12px] font-semibold mb-2'>{title}</p>
            <p className='text-[12px] w-[90%]'>{content}</p>
        </div>
    </div>
  )
}

export default CustomSwitch;