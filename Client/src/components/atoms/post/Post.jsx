import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import Action from '../action/Action'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import verifiedLog from '/verified.png';
import { centerNameAndVerify } from './style';
import AvatarUser from '/zuck-avatar.png';

function Post({like,setLike,aboutPost,postImg,likeCount,repliesCount,postUserImg}) {
  return (
    <Box sx={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"flex-start",
        flexDirection:"column",
        gap:1
      }} width={'100%'} height={'100%'}>
        {/* Name and three dot container */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width:"100%"
          }}
        >
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap:2
            }}>
                 {postUserImg&&(
                     <Avatar
                     sx={{ height: '50px', width: '50px' }}
                     alt="Mark Zuckerberg"
                     src={AvatarUser}
                   />
                 )}
                <Box sx={centerNameAndVerify}>
                    <Typography fontSize={'14px'} fontWeight={'bold'}>
                      Mark Zuckerberg
                    </Typography>
                    <Box sx={{ width: '20px', height: '20px' }}>
                      <img
                        width={'100%'}
                        height={'full'}
                        src={verifiedLog}
                        alt="verified"
                      />
                    </Box>
                </Box>
            </Box>
          
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:2,}}>
            <Typography sx={(theme)=>({color:theme.palette.secondary.contrastText})}>1d</Typography>
            <MoreHorizOutlinedIcon />

          </Box>
        </Box>
        {/* About post container */}
        <Box>
          <Typography variant="body2">{aboutPost}</Typography>
        </Box>
        {/* Image Container*/}
        <Box sx={{width:"100%",height:"100%",borderRadius:"10px"}} >
              <img style={{borderRadius:6}} width={"100%"} height={"100%"} src={postImg} alt='post'/>
        </Box>
        {/* Action Container */}
          <Action like={like} setLike={setLike}/>
          {/* replies & Likes Container */}
          <Box sx={[(theme)=>({
            color:theme.palette.secondary.contrastText,
            display:"flex",
            justifyContent: "center",
            alignItems: "center",
            gap:1
          })]}>
                   <Typography variant='body2'>{repliesCount} replies</Typography>
                    <Typography sx={[(theme)=>({
                      fontWeight: "bold",
                      height:"5px",
                      width:"5px",
                      borderRadius:"100%",
                      fontSize:"20px",
                      backgroundColor:theme.palette.secondary.contrastText
                    })]}></Typography>
                    <Typography variant='body2'>{like?likeCount+1:likeCount} likes</Typography>
          </Box>
      </Box>
  )
}

export default Post