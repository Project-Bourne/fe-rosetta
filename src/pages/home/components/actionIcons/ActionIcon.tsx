import React, { useState } from "react";
import Image from "next/image";
const ActionIcons = () => {
  return (
    <>
      <div className=" px-3 flex w-[40%] align-middle justify-between">
        <span className='w-[50px] cursor-pointer  shadow-xl h-[50px] flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/eye.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] shadow-xl cursor-pointer flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/box-arrow.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/binbin.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/searcharrow.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer flex shadow-xl align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/searchbox.svg`)}
            alt="upload image"
            width={20}
            height={20}
            priority
          /></span>
        </span>
        <span className='w-[50px] h-[50px] cursor-pointer shadow-xl flex align-middle rounded-[10px] justify-center border-2 border-[#E8EAEC] bg-[#fff]'>
          <span className='flex align-middle justify-center'>   <Image
            src={require(`../../../../../public/icons/file-arrow.svg`)}
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
