import React from 'react'
import { Header, NavBar } from '@/components/layouts';

function AppLayout({ children }) {

    return (
        <div className='bg-white h-[100vh] w-[100vw] flex flex-row'>
            {/* Nav Bar Component */}
            <NavBar />

            <div className='bg-white w-full h-full bg-red-700' >
                {/* Layout header */}
                <Header />

                {/* wrapper childen */}
                <div className='ml-[20vw]'>
                    <div className='mt-[20vh]'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 