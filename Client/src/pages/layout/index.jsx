import React, { useEffect, useState } from "react";
import { HeaderLogo, LayoutModal } from "../../components/atoms";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Typography,} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { logoutApi } from "./api";
import { logoutUserAuth } from "../../features/authPage/authSlice";
import { enqueueSnackbar } from "notistack";
import SuccessSnackbar from "../../components/molecules/customsnackbar/successSnackbar";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CreatePost } from "..";
function Index() {
  const detail = useSelector((state)=>state.auth)
  const getUser = JSON.parse(localStorage.getItem("user-threads"))
  const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

useEffect(()=>{

      if(!getUser?.name){
         dispatch(logoutUserAuth())
      }
},[navigate])

const handleLogout= async ()=>{
  const res = await logoutApi()
  if(res.status === 200){
    enqueueSnackbar("successfully Logout", {
      variant: "success",
      content: (key, message) => (
        <SuccessSnackbar id={key} message={message} allowDownload={true} />
      ),
    });
      navigate("/auth")
      dispatch(logoutUserAuth())
  }
}

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {detail?.name &&(<Button onClick={handleLogout} startIcon={<LogoutIcon/>} sx={{
          position: "absolute",
          top:"0",
          right:"0",
          m:2
        }} variant="contained">Logout</Button>)}
         {detail?.name &&(<Button onClick={()=>setOpen(true)} startIcon={< AddIcon/>} sx={{
          position: "fixed",
          bottom:"0",
          right:"0",
          m:2
        }} variant="contained">Post</Button>)}
      <HeaderLogo user={detail} />
      {detail.name? <Outlet /> : <Navigate to="/auth" />}
      <LayoutModal w={"40%"}  open={open} handleCloseOpen={setOpen}>
      <Box sx={[(theme)=>({
          display:"flex",
          justifyContent: "space-between",
          alignContent:"center",
          padding:2,
          color:theme.palette.tertiary.contrastText

        })]}>
              <Typography variant="h5">Create Post</Typography>
              <CloseOutlinedIcon onClick={()=>setOpen(false)} sx={{cursor:"pointer"}}/>
        </Box>
            <CreatePost setOpen={setOpen}/>
      </LayoutModal>
    </Box>
  );
}

export default Index;
