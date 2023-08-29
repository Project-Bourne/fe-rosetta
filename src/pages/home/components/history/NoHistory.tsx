
import React from 'react'
import Image from 'next/image'

function NoHistory() {
    return (
        <main className="flex items-center justify-center flex-col gap-4">
            <div className="flex items-center justify-centery w-[50%] font-bold flex-col p-3 rounded-[1rem] gap-3 text-xl ">
                <span> <Image
                    src={require(`../../../../assets/icons/no_history.svg`)}
                    alt="upload image"
                    width={150}
                    height={150}
                    priority
                /></span>
                <h1 className="font-[700] text-2xl">No history yet</h1>
                <span className='text-gray-400'>Your recent documents will appear here</span>
            </div>
        </main>
    )
}

export default NoHistory