import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, AuthPage, Layout, PostPage, UserPage } from '../pages'
import { useSnackbar } from 'notistack';
import { setEnqueueSnackbarFunction } from '../service/axios';

function RoutesComponents() {
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setEnqueueSnackbarFunction(enqueueSnackbar);
    }, [enqueueSnackbar]);
  return (
    <Routes>
    <Route  path="/" element={<Layout/>}>
        <Route index element={<div>HOME</div>} />
        <Route path="/:username" element={<UserPage/>} />
        <Route path="/:username/post/:pid" element={<PostPage/>} />
    </Route>
    
    <Route path="/auth" element={<AuthLayout/>}>
      <Route index element={<AuthPage/>}/>
    </Route>
</Routes>
  )
}

export default RoutesComponents