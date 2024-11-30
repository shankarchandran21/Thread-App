import {ThemeProvider, useColorScheme} from "@mui/material"
import { useSelector} from "react-redux"
import {lightTheme , darkTheme} from "./utils/theme"
import { useEffect } from "react"



function App() {
  const {themeMode} = useSelector((state)=>state.theme)

  const { setMode } = useColorScheme()


  useEffect(()=>{
      setMode(localStorage.getItem("theme"))
  },[themeMode])
   

      
  return (
   
       <ThemeProvider theme={themeMode === "light"?lightTheme:darkTheme}>

       </ThemeProvider>
   
  )
}

export default App
