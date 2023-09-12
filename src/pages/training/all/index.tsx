import TrainingLayout from '@/layout/TrainingLayout';
import { FAQS, LogData, QuickSearch } from '@/utils/constants';
import React from 'react'
import SearchComp from '../components/SearchComp';
import FAQComp from '../components/FAQ'
import Image from 'next/image';

const AllTraining = () => {
  return (
    <TrainingLayout>
      <div className='w-full h-full  m-auto overflow-y-scroll py-5 px-8'>
        <div className='w-full flex flex-row flex-wrap items-center'>
          <p className='text-[13px] font-semibold mr-3'>Quick searches: </p>
          
          {
            QuickSearch.map((item, index) => (
             <SearchComp item={item} index={index} key={index} list={QuickSearch} />
            ))
          }
        </div>

        <div className='flex flex-col md:flex-row w-full items-start my-4'>

          {/* Main */}
          <div className='md:w-[70%] w-full p-6 border-sirp-primaryLess2 bg-sirp-secondary2 rounded-[30px] pb-5'>
            <h2 className='text-[14px] font-semibold mb-2'>What you can do with Fact Checker</h2>
            <h3 className='text-[12px] font-semibold mt-4'>Interpretation: </h3>

            <p className='text-sirp-grey1 text-[12px] space-x-2 mt-3'>
              Redesigned Naira: CBN launches Cash Swap Programme for rural Development This website is operated by Web3D Media Incorporated, a Delaware-based corporation with a registered address at 651 N Broad St, New Castle, Delaware United States. (“Company”).
            </p>

            <h3 className='text-[12px] font-semibold mt-4'>Interpretation: </h3>

            <div className='w-full flex flex-row justify-center items-center my-8'>
              <Image
                src={require("../../../assets/svg/image-checker.svg")}
                alt="search"
                // width={200}
                // height={}
                className='w-[60%] h-[60%] self-center'
                style={{alignSelf: 'center'}}
                priority
              />
            </div>

            <p className='text-sirp-grey1 text-[12px] space-x-2 mt-3'>
             * Redesigned Naira: CBN launches Cash Swap Programme for rural Development
            </p>

            <p className='text-sirp-grey1 text-[12px] space-x-2 mt-3'>
              * Delaware-based corporation with a registered address at 651 N Broad St, New Castle, Delaware United States. (“Company”). perated by Web3D Media Incorporated, a Delaware-based corporation with a registered address at 651 N Broad St, New Castle, Delaware United States. (“Company”).
            </p>

            <p>
            </p>
          </div>
          
          {/* FAQ */}
          <div className='md:w-[18%] w-full my-4 ml-5'>
            <p className='text-[13px] text-black font-semibold'>Getting Started with Fact Checker.</p>

            <div className='w-full mt-5'>
              {
                FAQS.map((item, index) => (
                  <FAQComp text={item} key={index} index={index} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </TrainingLayout>
  )
}

export default AllTraining;