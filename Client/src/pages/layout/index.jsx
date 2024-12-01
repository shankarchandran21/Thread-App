import React from 'react'
import { HeaderLogo } from '../../components/atoms'
import {Outlet} from "react-router-dom"
import {Box} from "@mui/material"
function Index() {
  return (
    <>
        <Box sx={{
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
        }}>
            <HeaderLogo/>
            <Outlet/>
        </Box>
    </>
  )
}

export default Index