import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import CustomSnackbarProvider from './components/molecules/customsnackbar/customSnackbarprovider.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <CustomSnackbarProvider>
          <Provider store={store}>
                <App />
          </Provider>
      </CustomSnackbarProvider>      
  </BrowserRouter>
   
)
