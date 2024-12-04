import { Avatar, avatarClasses, Box, Grid2, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AvatarUser from '/zuck-avatar.png';
import Post from '../post/Post';
function UserPost({aboutPost,postImg,likeCount,repliesCount}) {
  const [like,setLike] = useState(false)

  return (
    <Link
      style={{ textDecoration: 'none', color: 'inherit',width:"100%" }}
      to={'/markZuckerberg/post/1'}
    >
      <Grid2
        height={'100%'}
        display={'flex'}
        paddingTop={2}
        justifyContent={'flex-start'}
        gap={2}
        alignItems={'stretch'} // Ensures left and right sides match height
      >
        {/* Left Side */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{ height: '50px', width: '50px' }}
            alt="Mark Zuckerberg"
            src={AvatarUser}
          />
          <Box
            sx={(theme) => ({
              backgroundColor: theme.palette.secondary.contrastText,
              width: '1px',
              flexGrow: 1, // Allows the line to grow dynamically
              marginY:1
            })}
          />
          <Box sx={{position:"relative",width:"100%"}}>
                         <Avatar
                            size='xs'
                            name='John doe'
                            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
                              sx={{
                                    position:"absolute",
                                    top:"0px",
                                    bottom:"0px",
                                    left:"12px",
                                    height:"20px",
                                    width:"20px",
                                    borderRadius:"50%",
                                          }}
                              />
                              <Avatar
                                size='xs'
                                name='John doe'
                                src="https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-312.jpg?w=2000"
                                sx={{
                                      position:"absolute",
                                      bottom:0,
                                      right:"0px",
                                      height:"20px",
                                      width:"20px",
                                      borderRadius:"50%"
                                    }}
                                />
                              <Avatar 
                                name='John doe'
                                src={"https://img.freepik.com/premium-vector/vector-illustration-young-man-with-beard-mustache-cartoon-style_1142-67946.jpg"}
                                sx={{
                                    position: "absolute",
                                    bottom: "0px",
                                    left:"0px",
                                    height:"20px",
                                    width:"20px",
                                    borderRadius:"50%"
                                    }}
                              />
          </Box>
        </Box>
        {/* Right Side */}
       <Post like={like} setLike={setLike} aboutPost={aboutPost} postImg={postImg} likeCount={likeCount} repliesCount={repliesCount}/>
      </Grid2>
    </Link>
  );
}

export default UserPost;
