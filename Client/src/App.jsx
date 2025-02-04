import {Grid, Grid2, ThemeProvider, useColorScheme} from "@mui/material"
import { useSelector} from "react-redux"
import {lightTheme , darkTheme} from "./utils/theme"
import { useEffect } from "react"
import {Routes,Route, useNavigate} from "react-router-dom"
import { AuthLayout, AuthPage, Layout, PostPage, UserPage } from "./pages"
import CustomSnackbarProvider from "./components/molecules/customsnackbar/customSnackbarprovider"
import Api, { setEnqueueSnackbarFunction, setNavigateFunction } from "./service/axios"
import { useSnackbar } from "notistack"
import RoutesComponents from "./routes/RoutesComponents"

function App() {
  const {themeMode} = useSelector((state)=>state.theme)
  let navigate = useNavigate()
  const { setMode } = useColorScheme()



  useEffect(()=>{
      setMode(localStorage.getItem("theme"))
  },[themeMode])
   
  useEffect(()=>{
      setNavigateFunction(navigate)
  },[navigate])



      
  return (
    <ThemeProvider  theme={themeMode === "light"?lightTheme:darkTheme}>
      
            <Grid sx={[(theme)=>({
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
              backgroundColor:theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding:"10px 30px 30px 30px",
              minHeight:"100vh",
              position: "relative",
            })]}>
                <Grid2 sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-center",
                    width: "700px",
                    height: "100%",
                }}>
                  <RoutesComponents/>
                </Grid2>
          </Grid>
      
     
    </ThemeProvider>
       
   
  )
}

export default App
