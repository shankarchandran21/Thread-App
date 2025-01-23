import React, { useEffect, useState } from "react";
import { HeaderLogo } from "../../components/atoms";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {userAuth} from "../../features/authPage/authSlice"
function Index() {
  const detail = useSelector((state)=>state.auth)
  const getUser = JSON.parse(localStorage.getItem("user-threads"))
  const navigate = useNavigate()

  useEffect(()=>{
    
    if(!getUser?.name){
          navigate("/auth")
      }
  },[navigate])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <HeaderLogo />
      {detail.name? <Outlet /> : <Navigate to="/auth" />}
    </Box>
  );
}

export default Index;
