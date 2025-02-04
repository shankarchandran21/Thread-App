import React, { useRef, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Grid2, Paper, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from '../../assets/defaultProfile.png';
import UserPrevViewImg from '../../components/atoms/userPrevViewImg/userPrevViewImg';
import { updateProfileApi } from './api';
import { userAuth } from '../authPage/authSlice';
import { useSnackbar } from 'notistack';
import SuccessSnackbar from '../../components/molecules/customsnackbar/successSnackbar';
function Index() {
  const userDetail = useSelector((state)=>state.auth)
  const [userState,setUserState] = useState(userDetail)
  const [isLoading,setIsLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
  const fileRef = useRef("")
  const {handleUploadImg,img} =  UserPrevViewImg()
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setUserState((prev)=>{
        return {...prev,[name]:value}
    })
  }
  const handleButtonClick = () => {
      fileRef.current.click()
  };

  const handleProfileUpdate = async()=>{
      try {
          setIsLoading(true)
          const res = await updateProfileApi({...userState,profilePic:img})
          if(res.status === 200){
              dispatch(userAuth(res.data.user))
              setUserState({...userState,password:""})
              enqueueSnackbar("Update profile",{
                variant:"success",
                content:(key,message)=>(
                  <SuccessSnackbar id={key} message={message} allowDownload={true}/>
                )
              })
          }
      } catch (err) {
        console.log(err)
      }finally{
        setIsLoading(false)
      }
  }


  return (
      <Grid2 

      width="100%" 
      display="flex" 
      justifyContent="center" 
      alignItems="center"
      >
               <Paper sx={[(theme)=>({
                  backgroundColor:theme.palette.tertiary.main,
                  padding:2,
                  width:"60%",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%", // Set width to 100% on smaller screens
                  },
              })]}>
                  <Grid2 sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    gap:1
                  }}>
                        <Box>
                              <Typography sx={{fontWeight:"bold"}} variant='h5'>User Profile Edit</Typography>
                        </Box>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap:2,
                          width:"100%"
                        }}>
                            <Box sx={{
                              width:135,
                              height:95,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                                <Avatar
                                  alt="profile"
                                  src={img||userState.profilePic||defaultProfile}
                                  sx={{ width: "100%", height: "100%" }}
                                />     
                            </Box>
                            <Box sx={{
                              position:"relative",
                              width: "100%",
                            }}>
                              <Button onClick={handleButtonClick} sx={[(theme)=>({
                                  width:"100%",
                                  backgroundColor:theme.palette.tertiary.main,
                                  textTransform:"none",
                                  fontWeight: "bold",
                                
                              })]} variant="contained">Change Avatar</Button>
                              <input id="file-input" type='file' ref={fileRef} onChange={handleUploadImg} hidden/>
                            </Box>
                        </Box>
                        <Box sx={{width:"100%"}}>
                              <Typography sx={{fontWeight:"bold",fontSize:"13px"}}>Full name <span style={{color:"red"}}>*</span></Typography>
                              <TextField 
                                  name="name"
                                  value={userState.name}
                                  onChange={handleChange}
                                sx={[(theme)=>({
                                  "& .MuiOutlinedInput-root": {
                                    height: "40px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                    },
                                  },
                                  "& .MuiOutlinedInput-input": {
                                      padding: "8px 14px", // Adjust the padding for vertical centering
                                    },
                                    color:theme.palette.tertiary.contrastText
                                })]}
                              fullWidth 
                              placeholder='Enter Full name'
                              variant="outlined" />
                        </Box>
                        <Box sx={{width:"100%"}}>
                              <Typography sx={{fontWeight:"bold",fontSize:"13px"}}>User name <span style={{color:"red"}}>*</span></Typography>
                              <TextField 
                                name="userName"
                                value={userState.userName}
                                onChange={handleChange}
                                sx={[(theme)=>({
                                  "& .MuiOutlinedInput-root": {
                                    height: "40px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                    },
                                  },
                                  "& .MuiOutlinedInput-input": {
                                      padding: "8px 14px", // Adjust the padding for vertical centering
                                    },
                                    color:theme.palette.tertiary.contrastText
                                })]}
                              fullWidth 
                              placeholder='Enter User name'
                              variant="outlined" />
                        </Box>
                        <Box sx={{width:"100%"}}>
                              <Typography sx={{fontWeight:"bold",fontSize:"13px"}}>Email address <span style={{color:"red"}}>*</span></Typography>
                              <TextField 
                              name="email"
                              value={userState.email}
                              onChange={handleChange}
                                sx={[(theme)=>({
                                  "& .MuiOutlinedInput-root": {
                                    height: "40px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                    },
                                  },
                                  "& .MuiOutlinedInput-input": {
                                      padding: "8px 14px", // Adjust the padding for vertical centering
                                    },
                                    color:theme.palette.tertiary.contrastText
                                })]}
                              fullWidth 
                              placeholder='Enter Email address'
                              variant="outlined" />
                        </Box>
                        <Box sx={{width:"100%"}}>
                              <Typography sx={{fontWeight:"bold",fontSize:"13px"}}>Bio <span style={{color:"red"}}>*</span></Typography>
                              <TextField 
                                  name="bio"
                                  value={userState.bio}
                                  onChange={handleChange}
                                sx={[(theme)=>({
                                  "& .MuiOutlinedInput-root": {
                                    height: "40px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                    },
                                  },
                                  "& .MuiOutlinedInput-input": {
                                      padding: "8px 14px", // Adjust the padding for vertical centering
                                    },
                                    color:theme.palette.tertiary.contrastText
                                })]}
                              fullWidth 
                              placeholder='Enter bio'
                              variant="outlined" />
                        </Box>
                        <Box sx={{width:"100%"}}>
                              <Typography sx={{fontWeight:"bold",fontSize:"13px"}}>Password <span style={{color:"red"}}>*</span></Typography>
                              <TextField 
                                  name="password"
                                  value={userState.password}
                                  onChange={handleChange}
                                sx={[(theme)=>({
                                  "& .MuiOutlinedInput-root": {
                                    height: "40px",
                                    "&.Mui-focused fieldset": {
                                      borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                    },
                                  },
                                  "& .MuiOutlinedInput-input": {
                                      padding: "8px 14px", // Adjust the padding for vertical centering
                                    },
                                    color:theme.palette.tertiary.contrastText
                                })]}
                              fullWidth 
                              placeholder='Enter password'
                              variant="outlined" />
                        </Box>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: "center",
                          alignItems: "center",
                          width: '100%',
                          gap:2
                        }}>
                                  <Button  sx={{flex:1,backgroundColor: '#d32f2f',color:"#fff"}} variant="contained">Cancel</Button>
                                  <Button disabled={isLoading} onClick={handleProfileUpdate} sx={{flex:1,backgroundColor: '#4CAF50',color:"#fff"}} variant="contained">{isLoading?<CircularProgress sx={{color:"#fff"}} size="20px" />:"Submit"}</Button>
                        </Box>
                  </Grid2>
              </Paper>
      </Grid2>
  )
}

export default Index