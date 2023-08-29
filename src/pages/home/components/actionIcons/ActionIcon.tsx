import React, { useState } from "react";
import Image from "next/image";
const ActionIcons = () => {
  return (
    <>
      <div className=" px-3 flex w-[40%] align-middle justify-between">
        <span className='w-[50px] cursor-pointer  shadow-xl h-[50px] flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/eye.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] shadow-xl cursor-pointer flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/box-arrow.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/binbin.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/searcharrow.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer flex shadow-xl align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/searchbox.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../assets/icons/file-arrow.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
      </div>
    </>
  );
};

export default ActionIcons;