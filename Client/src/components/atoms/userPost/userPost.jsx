import { Avatar, Box, Grid2, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AvatarUser from '/zuck-avatar.png';
import verifiedLog from '/verified.png';
import { centerNameAndVerify } from './style';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

function UserPost() {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'inherit' }}
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
							src={AvatarUser}
							
							sx={{
                                position:"absolute",
                                top:"-5px",
                                left:"12px",
                                 height:"25px",
                                width:"25px",
                                borderRadius:"50%",
                               
                                

                            }}
						/>
						<Avatar
							size='xs'
							name='John doe'
							src={AvatarUser}
                            sx={{
                                position:"absolute",
                                bottom:0,
                                right:"0px",
                                 height:"25px",
                                width:"25px",
                                borderRadius:"50%"

                            }}
						/>
						<Avatar
							
							name='John doe'
							src={AvatarUser}
                            sx={{
                                position: "absolute",
                                bottom: "0px",
                                left:"0px",
                                height:"25px",
                                width:"25px",
                                borderRadius:"50%"
                            }}
						/>
          </Box>
        </Box>
        {/* Right Side */}
        <Box width={'100%'} height={'100%'}>
          {/* Name and three dot container */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
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
            <MoreHorizOutlinedIcon />
          </Box>
          {/* About post container */}
          <Box sx={{ height: '100px', backgroundColor: 'white' }}>
            <Typography variant="body2">Let's talk about threads</Typography>
          </Box>
        </Box>
      </Grid2>
    </Link>
  );
}

export default UserPost;
