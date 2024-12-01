import React from 'react'
import DarkLogo from "/public/dark-logo.svg"
import LightLogo from "/public/light-logo.svg"
import { Grid } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {toggleTheme} from "../../../utils/themeSlice"
function HeaderLogo() {
  const {themeMode} = useSelector((state)=>state.theme)
  const dispatch = useDispatch()
  return (
    <Grid sx={{
      width:"30px",
      height:"60px"
    }}>
        <img onClick={()=>dispatch(toggleTheme())} 
        style={{cursor:"pointer"}}
         width={"100%"} height={"100%"} 
         src={themeMode === "light"?DarkLogo:LightLogo} alt='logo'/>
       
    </Grid>
  )
}

export default HeaderLogo