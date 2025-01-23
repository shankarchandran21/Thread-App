import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SignUp from '../../components/molecules/signUp/SignUp';
import Login from '../../components/molecules/login/Login';
function Index() {
  const {themeMode} = useSelector((state)=>state.theme)
  const [authPageSetup,setAuthPageSetup] = useState("login")

  return (
    <>
      {authPageSetup==="login"?<Login setAuthPageSetup={setAuthPageSetup} themeMode={themeMode}/>:<SignUp setAuthPageSetup={setAuthPageSetup} themeMode={themeMode}/>}
    </>
  )
}

export default Index