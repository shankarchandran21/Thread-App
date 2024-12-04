import { Avatar, Box, colors, Divider, Grid2, Typography } from '@mui/material'
import React, { useState } from 'react'
import Action from '../action/Action'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

function Comment({name,pic,postComment,likeCount}) {
    const [like,setLike] = useState(false)

  return (
    <Grid2 sx={{width:"100%"}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom:2
            }}>
                    {/* LEFT SIDE AVATAR AND COMMENT AND ICONS*/}
                    <Box sx={{
                        display:"flex",
                        justifyContent:"flex-start",
                        alignItems:"flex-start",
                        gap:2
                    }}>
                        <Avatar sx={{width:"25px",height:"25px"}} alt={name} src={pic} />
                         <Box sx={{
                            display:"flex",
                            justifyContent:"flex-start",
                            alignItems:"flex-start",
                            flexDirection:"column",
                            gap:0.5
                         }}>
                            <Typography sx={{fontWeight:"bold",}} variant='body2'>{name}</Typography>
                            <Typography variant='body2'>{postComment}</Typography>
                            <Box sx={{
                                display:"flex",
                                justifyContent:"flex-start",
                                alignItems:"flex-start"
                            }}>
                                <Action like={like} setLike={setLike}/>
                            </Box>
                            <Box>
                                <Typography variant='body2' sx={[(theme)=>({color:theme.palette.secondary.contrastText})]}>{like?likeCount+1:likeCount} likes</Typography>
                            </Box>
                         </Box>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:1}}>
                            <Box sx={[(theme)=>({color:theme.palette.secondary.contrastText})]}>
                                1d
                            </Box>
                            <MoreHorizOutlinedIcon/>
                    </Box>
            </Box>
            <Divider/>
    </Grid2>
  )
}

export default Comment