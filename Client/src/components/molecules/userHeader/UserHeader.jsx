import { Avatar, Box, Button, CircularProgress, Grid2, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import { center, headerSpaceBetween, iconContainer } from './style'
import InstagramIcon from '@mui/icons-material/Instagram';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { useSnackbar } from 'notistack';
import SuccessSnackbar from '../customsnackbar/successSnackbar';
import noProfilePic from "../../../assets/defaultProfile.png"
import { useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { followUnFollowApi } from './api';
import ErrorSnackbar from '../customsnackbar/errorSnackbar';
function UserHeader({bio,name,userName,profilePic,followers,_id}) { 
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isLoading,setIsLoading] = useState(false)
  const {enqueueSnackbar} = useSnackbar()
const loginUser = useSelector((state)=>state.auth._id)
const [isfollowUnfollow,setIsFollowUnfollow] = useState(followers?.includes(loginUser))
const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // user for copied current url 
  }

  const handleUpdateFollow = async(isFollow)=>{
      if(loginUser === _id){
          navigate("/update")
      }else{

        if(!loginUser){
            enqueueSnackbar("Please login to follow",{
              variant:"error",
              content:(key,message)=>(
                <ErrorSnackbar id={key} message={message} allowDownload={true}/>
              )
            })
            return
        }

          try {
            setIsLoading(true)
            setIsFollowUnfollow((prev)=>!prev)
            const res = await followUnFollowApi(_id)
            if(res.status === 200){
                if(isfollowUnfollow){
                  followers.pop()
                  enqueueSnackbar("Unfollowed successfully",{
                    variant:"success",
                    content:(key,message)=>(
                      <SuccessSnackbar id={key} message={message} allowDownload={true}/>
                    )
                  })
              }else{
                followers.push(loginUser)
                enqueueSnackbar("Followed successfully",{
                  variant:"success",
                  content:(key,message)=>(
                    <SuccessSnackbar id={key} message={message} allowDownload={true}/>
                  )
                })

              }
            }
          } catch (err) { 
              console.log(err)
          }finally{
            setIsLoading(false)
          }
      }
  }
  

 

  const handleCopyURL =()=>{
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(()=>{
      enqueueSnackbar('Copied...', {
        variant: 'success', 
        content: (key, message) => (
          <SuccessSnackbar id={key} message={message} allowDownload={true} />
        ),
      });
      handleClose()
    })
  }


  return (
    <Grid2 >
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flexDirection: 'column',
              gap:3
            }}>
                    <Box sx={headerSpaceBetween}>
                        <Box>
                            <Box>
                              <Typography sx={{fontWeight:"bold"}} variant='h4'>{name}</Typography>
                            </Box>
                            <Box sx={center}>
                                <Typography variant='subtitle1'>{userName}</Typography>
                                <Typography sx={[(theme)=>({
                                  backgroundColor:theme.palette.secondary.main,
                                  color:theme.palette.secondary.contrastText,
                                  padding:0.5,
                                  borderRadius:"10px"
                                })]} variant='caption'>threads.net</Typography>
                            </Box>
                        </Box>
                        <Avatar  sx={{height:"80px",width:"80px"}} alt={name} src={profilePic||noProfilePic} />
                    </Box>
                    <Box>
                        <Typography>{bio}</Typography>
                    </Box>
                
                              <Button disabled={isLoading} onClick={handleUpdateFollow} sx={[(theme)=>({
                                  backgroundColor:theme.palette.secondary.main,
                                  color:"#fff",
                                  textTransform:"none"
                                })]} variant="contained">
                                    { isLoading?<CircularProgress sx={{color:"#fff"}} size="20px" />: loginUser===_id?"update Profile":isfollowUnfollow?"Unfollow":"Follow"}
                              </Button>
                    <Box sx={headerSpaceBetween}>
                        <Box sx={[(theme)=>({
                           display: "flex",
                           justifyContent:"center",
                           alignItems: "center",
                           gap:1,
                           color:theme.palette.secondary.contrastText
                        })]}>
                            <Typography>{followers?.length} followers</Typography>
                            <Typography sx={[(theme)=>({
                               fontWeight: "bold",
                               height:"5px",
                               width:"5px",
                               borderRadius:"100%",
                               fontSize:"20px",
                               backgroundColor:theme.palette.secondary.contrastText
                            })]}></Typography>
                            <Typography>instagram.com</Typography>

                        </Box>
                        <Box sx={center}>
                              <Box sx={[iconContainer]}>
                                <InstagramIcon/>
                              </Box>
                              <Box 
                                 aria-controls={open ? 'basic-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={open ? 'true' : undefined}
                                 onClick={handleClick}
                              sx={[iconContainer]}>
                                <PendingOutlinedIcon/>
                              </Box>
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                  sx: {
                                    padding: 0, // Remove default padding for the Menu container
                                  },
                                }}
                               
                              >
                                <MenuItem   sx={[(theme)=>({
                                  backgroundColor: theme.palette.secondary.main, // Full red background
                                  color: '#fff', // White text for contrast
                                  padding: "5px 10px 5px 10px", // Removes all padding
                                  minWidth: '180px', // Optional: Ensure sufficient width
                                  '&:hover': {
                                    backgroundColor:theme.palette.secondary.main, // Darker red on hover
                                  },
                                  '&.Mui-focusVisible': {
                                    backgroundColor:theme.palette.secondary.main, // Keep red even when focused
                                  },
                                })]} onClick={handleCopyURL}>Copy link</MenuItem>
                              </Menu>
                        </Box>
                    </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
                  <Typography sx={((theme)=>({flex:1,textAlign:"center",
                    borderBottom:`2px solid ${theme.palette.primary.contrastText}`,
                    fontWeight:"bold",
                    fontSize:"14px"
                  }))}>Threads</Typography>
                  <Typography sx={(theme)=>({flex:1,textAlign:"center",
                    borderBottom:"2px solid #838383",
                    color:theme.palette.secondary.contrastText,
                    fontWeight:"bold",
                    fontSize:"14px"
                  })}>Replies</Typography>
            </Box>
    </Grid2>
  )
}

export default UserHeader