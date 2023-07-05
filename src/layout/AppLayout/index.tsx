import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({children}) {

    return (
        <div className='bg-white h-[100vh] w-[100vw] flex flex-row'>
            {/* Nav Bar Component */}
            <NavBar/>

            <div className='bg-white h-full w-[80vw]'>
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