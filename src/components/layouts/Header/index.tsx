import Image from 'next/image'
import React from 'react'
import RightComp from './RightComp'
import LeftComp from './LeftComp'

function Header() {
  return (
    <div className='w-[80vw] bg-white flex flex-row items-center justify-between py-8 px-8 mb-5 border-b-[1.3px] border-sirp-lightGrey'>
        {/* Left component */}
        <LeftComp />

        {/* Right component */}
        <RightComp />
    </div>
  )
}


const styles = {
    rowView: "flex flex-row"
}

export default Header