import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({children}) {

    return (
        <div className='bg-white w-[100vw] h-[100vh] flex flex-row justify-between'>
            {/* Nav Bar Component */}
            <NavBar/>

            <div className='bg-white w-[80vw] ml-[60vw] h-full'>
                {/* Layout header */}
                <Header/>

                {/* wrapper childer */}
                <div className='mt-[120px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 