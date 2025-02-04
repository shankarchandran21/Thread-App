import { Box, Grid2, Typography } from '@mui/material'
import React from 'react'

function Index() {
  return (
      <Grid2 sx={{
        width:"100vw",
        padding:"0",
        height:"90vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>
            <Box sx={{
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column",
              gap:5
            }}>
                  <Typography variant='h5'>Sorry, this page isn't available</Typography>
                  <Typography textAlign="center">The link you followed may be broken, or the page may have been removed. Go back to threads</Typography>
            </Box>
      </Grid2>
  )
}

export default Index