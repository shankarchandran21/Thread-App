import { Grid, Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import React from "react";

const SuccessSnackbar = React.forwardRef((props, ref) => {
  const { id, message, allowDownload, ...other } = props;

  return (
    <SnackbarContent
      ref={ref}
      role="alert"
      {...other}
      style={{ justifyContent: "flex-end" }}
    >
    <Grid container alignItems={"center"} justifyContent={"center"} borderRadius={1} style={{ backgroundColor: "#03FF84", margin: 0, padding: 5,height:"50px",width:"350px" }}>
    <Typography color={"#000"} fontWeight={"bold"} fontSize={12}>
    {message}
    </Typography>
    </Grid>
    </SnackbarContent>
  );
});

export default SuccessSnackbar;
