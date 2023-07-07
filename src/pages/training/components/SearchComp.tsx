import React from 'react'

type SearchType = {
    item: string,
    index: number,
    list: any[]
}

const SearchComp = ({item, index, list}: SearchType) => {
  return (
    <div className='item-center flex flex-row my-2'>
        <div className='p-2 px-5 rounded-[200px] border-x-sirp-dashbordb1 border-2 items-center justify-center mx-2 cursor-pointer' >
        <p className='text-[12px] text-ellipsis'>{item}</p>
        </div>
        {index == list.length -1 &&
        <div className='p-2 px-5 rounded-[200px] border-x-sirp-dashbordb1 border-2 items-center justify-center mx-2 cursor-pointer'>
            <p className='text-[12px] text-ellipsis text-sirp-primary'>More</p>
        </div>
        }
    </div>
  )
}

export default SearchComp;