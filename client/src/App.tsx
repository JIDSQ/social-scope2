import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'

function App() {
    return (
        <div className="w-full h-screen bg-white">
            <Layout />
            <Dashboard />
        </div>
    )
}

export default App
