import React from 'react'
import { Box, Button, FormHelperText, Grid2, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { useForm } from 'react-hook-form';
import { SignupPageApi } from './api';
import { enqueueSnackbar } from 'notistack';
import ErrorSnackbar from '../customsnackbar/errorSnackbar';
function SignUp({themeMode,setAuthPageSetup}) {
      const [showPassword, setShowPassword] = React.useState(false);
          const {handleSubmit,register,formState: { errors },} = useForm({
                                        resolver: yupResolver(schema()),
                                        });
      const {RegisterUserApi}= SignupPageApi
      const navigate = useNavigate()
      const handleClickShowPassword = () => setShowPassword((show) => !show);

     const handleSubmitSignup = async(data)=>{
          try {
            const res = await RegisterUserApi(data)
            localStorage.setItem("user-threads",JSON.stringify(res.data))
            navigate("/home")
          } catch (err) {
            enqueueSnackbar(err.message, {
              variant: "error",
              content: (key, message) => (
                <ErrorSnackbar id={key} message={message} allowDownload={true} />
              ),
            });
          }
      }

  return (
    <Grid2 sx={{width:"80%",display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column",gap:3}}>
    <Box>
          <Typography fontSize={"40px"} fontWeight={"600"} variant='h3'>Sign up</Typography>
    </Box>
    <Paper sx={[(theme)=>({backgroundColor:theme.palette.tertiary.main,borderRadius:"10px",padding:5,width:"100%"})]}>
        <form onSubmit={handleSubmit(handleSubmitSignup)} style={{
          display:"flex",
          justifyContent:"center",
          alignItems:'center',
          flexDirection:"column",
          gap:15
        }}>
                  <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:2,width:"100%"}}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        gap:0.5,
                        width:"100%"
                      }}>
                          <Typography sx={{fontWeight:600,fontSize:"14px"}}>Full Name <span style={{color:"#E4080A"}}>*</span></Typography>
                          <TextField
                             error={!!errors?.name}
                             helperText={errors?.name?.message}
                            {...register("name")}
                            id="outlined-size-small"
                            sx={[(theme)=>({
                                "& .MuiOutlinedInput-root": {
                               
                                "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                },
                            },
                            
                            })]}
                            size="small"
                            fullWidth
                          />
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        gap:0.5,
                        width:"100%"
                      }}>
                          <Typography sx={{fontWeight:600,fontSize:"14px"}}>User Name <span style={{color:"#E4080A"}}>*</span></Typography>
                          <TextField
                             error={!!errors?.userName}
                             helperText={errors?.userName?.message}
                            {...register("userName")}
                            id="outlined-size-small"
                            sx={[(theme)=>({
                                "& .MuiOutlinedInput-root": {
                               
                                "&.Mui-focused fieldset": {
                                borderColor: theme.palette.primary.contrastText, // Primary color when focused
                                },
                            },
                            
                            })]}
                            size="small"
                            fullWidth
                          />
                      </Box>
                      
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    gap:0.5,
                    width:"100%"
                  }}>
                      <Typography sx={{fontWeight:600,fontSize:"14px"}}>Email address <span style={{color:"#E4080A"}}>*</span></Typography>
                      <TextField
                         error={!!errors?.email}
                         helperText={errors?.email?.message}
                        {...register("email")}
                        id="outlined-size-small"
                        sx={[(theme)=>({
                            "& .MuiOutlinedInput-root": {
                           
                            "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.contrastText, // Primary color when focused
                            },
                        },
                        
                        })]}
                        size="small"
                        fullWidth
                      />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    gap:0.5,
                    width:"100%"
                  }}>
                      <Typography sx={{fontWeight:600,fontSize:"14px"}}>Password <span style={{color:"#E4080A"}}>*</span></Typography>
                      <OutlinedInput
                             error={!!errors?.password}
                            {...register("password")}
                          sx={[
                            (theme) => ({
                             
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.contrastText, // Focused border color
                              },
                            }),
                          ]}
                          id="outlined-adornment-password"
                          size="small"
                          fullWidth
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                               
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                         
                        />
                        <FormHelperText sx={{color:"#f43d2e",paddingLeft:2}}>{errors?.password?.message}</FormHelperText>
                        
                  </Box>
                  <Button type='submit' sx={{backgroundColor:themeMode==="dark"?"#27303d":"#404b5a",color:"#fff"}} fullWidth variant="contained" >Submit</Button>
                  <Typography sx={{paddingTop:4}}>Already have account ? <Link style={{color:"#1E88E5",textDecoration:"none"}} onClick={()=>setAuthPageSetup("login")}>Login</Link></Typography>
        </form>
    </Paper>
</Grid2>
  )
}

export default SignUp