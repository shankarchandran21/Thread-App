import { Grid2 } from '@mui/material'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { HeaderLogo } from '../../components/atoms'

function Index() {
  return (
    <Grid2  width={"100%"} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"column"} gap={"40px"}>
      <HeaderLogo/>
      <Outlet/>  
    </Grid2>
  )
}

export default Index