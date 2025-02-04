import { Box, Button, FormHelperText, Grid2, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {schema} from "./schema"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {loginPageApi} from "./api"
import ErrorSnackbar from "../customsnackbar/errorSnackbar"
import { useSnackbar } from 'notistack';
import {userAuth} from "../../../features/authPage/authSlice"
import { useDispatch } from 'react-redux';
import SuccessSnackbar from '../customsnackbar/successSnackbar';

function Login({themeMode,setAuthPageSetup}) {
        const { enqueueSnackbar } = useSnackbar();
        const [showPassword, setShowPassword] = useState(false);
        const dispatch = useDispatch()
          const handleClickShowPassword = () => setShowPassword((show) => !show);
          const {handleSubmit,register,formState: { errors },} = useForm({
                                        resolver: yupResolver(schema()),
                                        });
          const navigate = useNavigate()
           const {loginApi} = loginPageApi     

    const handleSubmitLogin = async (data)=>{
          try {
            const res = await loginApi(data)
            if(res?.status === 200){
              enqueueSnackbar("Successfully Login", {
                variant: "success",
                content: (key, message) => (
                  <SuccessSnackbar id={key} message={message} allowDownload={true} />
                ),
              });
              dispatch(userAuth(res.data))
               navigate("/")
             
            }
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
    <Grid2 sx={{
        width:"60%",display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column",gap:1
    }}>
                    <Box>
                          <Typography fontSize={"40px"} fontWeight={"600"} variant='h3'>Login </Typography>
                    </Box>
                    <Paper sx={[(theme)=>({backgroundColor:theme.palette.tertiary.main,borderRadius:"10px",padding:5,width:"100%",

                    })]}>
                         <form onSubmit={handleSubmit(handleSubmitLogin)} style={{ display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column",gap:20}}>
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
                                {...register("password")}
                                error={!!errors?.password}
                                
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
                         </form>
                        <Typography sx={{paddingTop:4,textAlign:"center"}}>Don't have an account ? <Link onClick={()=>setAuthPageSetup("signUp")} style={{color:"#1E88E5",textDecoration:"none"}}>Sign up</Link></Typography>
                    </Paper>
    </Grid2>
  )
}

export default Login