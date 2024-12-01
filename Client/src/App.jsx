import {Grid, Grid2, ThemeProvider, useColorScheme} from "@mui/material"
import { useSelector} from "react-redux"
import {lightTheme , darkTheme} from "./utils/theme"
import { useEffect } from "react"
import {Routes,Route} from "react-router-dom"
import { Layout, PostPage, UserPage } from "./pages"
import CustomSnackbarProvider from "./components/molecules/customsnackbar/customSnackbarprovider"

function App() {
  const {themeMode} = useSelector((state)=>state.theme)

  const { setMode } = useColorScheme()


  useEffect(()=>{
      setMode(localStorage.getItem("theme"))
  },[themeMode])
   

      
  return (
    <ThemeProvider  theme={themeMode === "light"?lightTheme:darkTheme}>
        <CustomSnackbarProvider>
            <Grid sx={[(theme)=>({
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: "100vh",
              backgroundColor:theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              padding:"10px 30px 10px 30px",
            })]}>
                <Grid2 sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "650px",
                    
                }}>
                  <Routes>
                        <Route  path="/" element={<Layout/>}>
                          <Route index element={<div>HOME</div>} />
                          <Route path="/:username" element={<UserPage/>} />
                          <Route path="/:username/post/:pid" element={<PostPage/>} />

                        </Route>
                    </Routes>
                </Grid2>
          </Grid>
        </CustomSnackbarProvider>
     
    </ThemeProvider>
       
   
  )
}

export default App
