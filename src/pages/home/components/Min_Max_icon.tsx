import React from 'react'
import Image from 'next/image'
const Min_and_Max_icon = ({minOnClick, maxOnClick}) => {
  return (
    <div>
        <div className="flex justify-end items-center gap-2 mr-[5rem] pt-[2rem]">
        <Image
            src={require('../../../assets/icons/arrows-minimize_1.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
            onClick={minOnClick}
          />
        <Image
            src={require('../../../assets/icons/arrows-max.svg')}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
            onClick={maxOnClick}
          />
        </div>
    </div>
  )
}

export default Min_and_Max_icon