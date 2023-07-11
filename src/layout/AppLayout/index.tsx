import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({ children }) {

    return (
        <div className='bg-white h-full w-full flex flex-row overflow-x-hidden'>
            {/* Nav Bar Component */}
            <NavBar />

            <div className='w-full h-full' >
                {/* Layout header */}
                <Header />

                {/* wrapper childen */}
                <div className='ml-[20vw] mt-[23vh]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 