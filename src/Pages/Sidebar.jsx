/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useMyContext } from '../Provider/ContextProvider'
import { IoLogoBitcoin } from 'react-icons/io5';
import Menubar from './Menubar';
// import image from '../../public'

const Sidebar = () => {
  
  const {width} = useMyContext();



  return (
    <>
     <div className={`custom-scrollbar h-[100vh] ${!width?'w-0 sm:w-[240px]':'w-[0%] sm:w-[10%]  md:w-[7%]'} overflow-y-auto  flex flex-col items-center gap-3 transition-all duration-[400ms] ease-out bg-[#004aad]`}>
     <img src="/logo/logo.webp" className={`${!width?'h-[15%]':'h-[13%]'} my-5 `} alt="/logo/logo.webp" />
     <Menubar/>
     </div> 
    </>
  )
}

export default Sidebar
