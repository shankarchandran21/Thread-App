import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

function LayoutModal({open,handleCloseOpen,children,w,h}) {
  const  handleClose = ()=>{
    handleCloseOpen(false)
  }


  return (
    <Modal
    open={open}
    onClose={handleClose}

    >
        <Box  sx={ [(theme)=>({
          backgroundColor:theme.palette.tertiary.main,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
          borderRadius: 4,
        })]} style={{width:w?w:"fit-content",height:h?h:"auto",}}>
            {children}
        </Box>
        
    </Modal>
  )
}

export default LayoutModal