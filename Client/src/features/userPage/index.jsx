import { Grid2 } from '@mui/material'
import React, { useState } from 'react'
import { UserHeader } from '../../components/molecules'
import { UserPost } from '../../components/atoms'
import PostImage from "/public/post1.png"
import PostImageTwo from "/public/post3.png"
function Index() {
 

  return (
    <Grid2 sx={{
      width:"100%",
    }}>
        <UserHeader />
        <Grid2 sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:2}}>
          <UserPost aboutPost={"Let's talk about threads"} postImg={PostImage} likeCount={808} repliesCount={80} />
          <UserPost aboutPost={"Let's talk about tesla"} postImg={PostImageTwo} likeCount={808} repliesCount={80} />
          
        </Grid2>
      
    </Grid2>
  )
}

export default Index