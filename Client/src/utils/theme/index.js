import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F7FAFC",//gray.100
      contrastText: "#1A202C",//gray.800
    },
    secondary: {
      main: "#1e1e1e",//dark
      contrastText:"#616161"//light
     
    },
    tertiary: {
      main: "#fff",
      contrastText:"#000",
    },
    
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#101010",
      contrastText: "#FFFFFFE6",//whiteAlpha.900
    },
    secondary: {
      main: "#1e1e1e",//dark
      contrastText:"#616161"//light
    },
    tertiary: {
      main: "#1e1e1e",
      contrastText:"#fff",
    },
  
  },
});

export { lightTheme, darkTheme };
