import Image from 'next/image'
import React from 'react'
import RightComp from './RightComp'
import LeftComp from './LeftComp'

function Header() {
  return (
    <div className='w-[80vw] ml-[20vw] mb-[20vh] bg-white flex flex-row items-center justify-between py-8 px-8 border-b-[1.3px] fixed top-0 z-[100] right-0 border-sirp-lightGrey'>
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