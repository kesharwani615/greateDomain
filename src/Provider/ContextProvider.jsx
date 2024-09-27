/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const MyContext = createContext('');

export const useMyContext = () => useContext(MyContext);

const ContextProvider = ({children}) => {

  const [width,setWidth] = useState(false);

  const [pageShow,setPageShow] = useState('Dashboard')

  

  return (
    <MyContext.Provider value={{width,setWidth,pageShow,setPageShow}}>
      {children}
    </MyContext.Provider>
  )
}

export default ContextProvider
