import React from 'react'
import Navbar from '../shared/Navbar'

import Sidebar from './Sidebar'

const Layout = (): JSX.Element => {
    return (
        <>
            <Navbar />
            <Sidebar />
        </>
    )
}

export default Layout
