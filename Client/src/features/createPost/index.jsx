import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import React, { useRef, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import UserPrevViewImg from '../../components/atoms/userPrevViewImg/userPrevViewImg';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { postApi } from './api';
import { useSnackbar } from 'notistack';
import SuccessSnackbar from '../../components/molecules/customsnackbar/successSnackbar';
import { ErrorSnackbar } from '../../components/molecules';
const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  min-height: 150px; /* Use min-height instead of height */
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? '#ccc' : '#000'};
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ccc'};
  box-shadow: none;

  &:hover {
    border-color: #4dabf5;
  }

  &:focus {
    border-color: #4dabf5;
  }

  &:focus-visible {
    outline: 0;
  }
`
);

function Index({setOpen}) {
  const [text,setText] = useState("")
  const fileRef = useRef("")
  const [remainingChar,setRemainingChar] = useState(500)
  const [isLoading,setIsLoading] = useState(false)
  const {handleUploadImg,img,setImg} = UserPrevViewImg()
  const {enqueueSnackbar} = useSnackbar()
  const handleChange = (e) => {
    if (e.target.value.length <= 500) {
      setText(e.target.value); // Now works with both typing and backspace
      setRemainingChar(500 - e.target.value.length)
    }
  };

  const handlePost = async ()=>{
      if(img && text){
        try {
          setIsLoading(true)
          const res = await postApi({text,img})
          console.log(res)
          if(res.status === 201){
            enqueueSnackbar("Successfully created post",{
              variant:"success",
              content:(key,message)=>(
                <SuccessSnackbar id={key} message={message} allowDownload={true}/>
              )
            })
            
          }
        } catch (err) {
          
        }finally{
          setIsLoading(false)
          setOpen(false)
          setImg(null)
          setText("")
          setRemainingChar(500)
        }
      }else{
          if(!text && !img){
              enqueueSnackbar("No post to upload",{
                variant:"success",
                content:(key,message)=>(
                  <ErrorSnackbar id={key} message={message} allowDownload={true}/>
                )
              })
            } else if(!text){
              enqueueSnackbar("Please tell something about post",{
                variant:"success",
                content:(key,message)=>(
                  <ErrorSnackbar id={key} message={message} allowDownload={true}/>
                )
              })
            }else if(!img){
              enqueueSnackbar("Please upload image",{
                variant:"success",
                content:(key,message)=>(
                  <ErrorSnackbar id={key} message={message} allowDownload={true}/>
                )
              })
            }
      }
      
  }


  return (
    <Box sx={[(theme)=>({
      color:theme.palette.tertiary.contrastText,
      p:2
    })]}>
      <Box sx={{ overflow: 'auto',height:"180px",width:"100%" }}>
        <TextareaAutosize name='text' value={text} onChange={handleChange}/>
      </Box>
      <Box sx={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
          <AddPhotoAlternateOutlinedIcon sx={{cursor:"pointer"}} onClick={()=>fileRef.current.click()}/>
          <Typography>{remainingChar}/500</Typography>
      </Box>
      <input onChange={handleUploadImg} id="file-input" type='file' ref={fileRef} hidden />
      {img&&(
           <Box sx={{position:"relative"}} mt={2} width={"100%"} height={"200px"}>
                <img style={{ objectFit: "cover" }} width={"100%"} height={"100%"} src={img} alt='created post' />
                <Box sx={{position:"absolute",
                  top:4,
                  right:5,
                  backgroundColor:"rgba(10, 10, 10, 0.66)",
                  padding:0.2,
                  display:"flex",
                  justifyContent:"center",
                  alignItems: "center",
                  cursor: "pointer",
                  borderRadius:"5px"
                  }} 
                  onClick={()=>{
                    setImg(null)
                    fileRef.current.value = ""
                  }}>
                <CloseOutlinedIcon  />
                </Box>
            </Box>
      )}
      <Box sx={{
        display:'flex',
        justifyContent:"flex-end",
        alignItems:"center",
        p:1
      }}>
          <Button onClick={handlePost} sx={[(theme)=>({
            backgroundColor:theme.palette.mode === 'dark'?"#27303d":"#404b5a",
            color:"#fff"
          })]} variant="contained">{isLoading?<CircularProgress sx={{color:"#fff"}} size="20px" />:"Post"}</Button>
      </Box>
    </Box>
  );
}

export default Index;
