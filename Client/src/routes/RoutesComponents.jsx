import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, AuthPage, ErrorPage, Layout, PostPage, UpdateProfilePage, UserPage } from '../pages'
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
          <Route path=":username/post/:pid" element={<PostPage/>} />
          <Route path="user/:username" element={<UserPage/>} />
          <Route path="update" element={<UpdateProfilePage/>} />
      </Route>
      
      <Route path="/auth" element={<AuthLayout/>}>
        <Route index element={<AuthPage/>}/>
      </Route>
        <Route path='*'element={<ErrorPage/>}/>
</Routes>
  )
}

export default RoutesComponents