import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Like icon
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; // Comment icon
import SyncIcon from '@mui/icons-material/Sync'; // Share icon
import SendIcon from '@mui/icons-material/Send'; // Send
import { Grid } from '@mui/material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
function Action({like,setLike,}) {
 
  const handleLikeUnlike = (e)=>{
    e.preventDefault();
    setLike((prev)=>!prev)
  }

  return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap:2
        }}>
                {like? <FavoriteOutlinedIcon  onClick={handleLikeUnlike} sx={{color:"red",cursor:"pointer",fontSize:"20px"}}/>:<FavoriteBorderOutlinedIcon sx={{cursor:"pointer",fontSize:"20px"}} onClick={handleLikeUnlike}/>}
                <ChatBubbleOutlineIcon sx={{fontSize:"20px"}} />
                <SyncIcon sx={{fontSize:"20px"}}/>
                <SendIcon sx={{fontSize:"20px"}}/>
        </Grid>
  )
}

export default Action