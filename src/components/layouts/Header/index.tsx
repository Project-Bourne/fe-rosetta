import Image from 'next/image'
import React from 'react'
import RightComp from './RightComp'
import LeftComp from './LeftComp'

function Header() {
  return (
    <div className='w-full md:w-[80vw] z-[100] bg-white flex items-center fixed top-0 justify-between py-8 px-4 md:px-8 -mb-[90px] border-b-[1.3px] border-sirp-lightGrey'>
        {/* Left component */}
        <div>
          <LeftComp />
        </div>

        {/* Right component */}
        <div>
          <RightComp />
        </div>
    </div>
  )
}


const styles = {
    rowView: "flex flex-row"
}

export default Header