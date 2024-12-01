import { Grid2 } from '@mui/material'
import React from 'react'
import { UserHeader } from '../../components/molecules'
import { UserPost } from '../../components/atoms'

function Index() {
  return (
    <Grid2 sx={{
      width:"100%",
    }}>
        <UserHeader/>
        <UserPost/>
    </Grid2>
  )
}

export default Index