import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({ children }) {

    return (
        <div className='bg-white h-full w-full flex flex-row overflow-x-hidden'>
            {/* Nav Bar Component */}
            <NavBar />

            <div className='h-full bg-white w-full md:w-[80vw] ml-[15vw] md:ml-[20vw]' >
                {/* Layout header */}
                <Header />

                {/* wrapper childen */}
                <div className='mt-[120px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 