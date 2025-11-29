import React, { createContext, useState } from 'react'
export const isLoggedInContext = createContext(null)
const Wapper = (props) => {

    const [logInStatus, setLogInStatus] = useState(false)
        // setLogInStatus(false)
  return (
    <isLoggedInContext.Provider value = { [logInStatus, setLogInStatus] }>
      
      {props.children}
    
    </isLoggedInContext.Provider>
  )
}

export default Wapper
