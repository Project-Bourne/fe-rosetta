import Image from 'next/image';
import React from 'react'


type FAQtype = {
    text: string,
    index: number
}

const FAQComp = ({text, index}: FAQtype) => {
  return (
    <div className='items-center flex flex-row my-2 cursor-pointer'>
        <Image
            src={require("../../../assets/icons/report-search.svg")}
            alt="search"
            width={13}
            height={13}
            className='self-center mr-2'
            style={{alignSelf: 'center'}}
            priority
        />

        <h4 className='text-[12px] text-sirp-primary'>{text}</h4>

    </div>
  )
}

export default FAQComp;