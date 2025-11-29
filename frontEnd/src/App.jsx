import React from 'react'
import Navbar from './components/Navbar';
import MainRoute from './routes/MainRoute';

const App = () => {
  return (
    <div className='w-full h-full bg-black'>
    <Navbar></Navbar>
    <MainRoute />

    </div>
  )
}

export default App
