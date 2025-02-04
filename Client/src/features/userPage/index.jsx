import { Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UserHeader } from '../../components/molecules'
import { UserPost } from '../../components/atoms'
import PostImage from "/public/post1.png"
import PostImageTwo from "/public/post3.png"
import { useParams } from 'react-router-dom'
import { getProfileApi } from './api'
function Index() {
  const [userPost,setUserPost] = useState(null)
  const {username} = useParams()
  

  useEffect(()=>{
      (async()=>{
          try {
            const res = await getProfileApi(username)
            if(res.status === 200){
              setUserPost(res.data)
            }
          } catch (err) {
            console.log(err)
          }
      })()
  },[username])
 

  return (
    <Grid2 sx={{
      width:"100%",
    }}>
        <UserHeader {...userPost}/>
        <Grid2 sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:2}}>
          <UserPost aboutPost={"Let's talk about threads"} postImg={PostImage} likeCount={808} repliesCount={80} />
          <UserPost aboutPost={"Let's talk about tesla"} postImg={PostImageTwo} likeCount={808} repliesCount={80} />
          
        </Grid2>
      
    </Grid2>
  )
}

export default Index