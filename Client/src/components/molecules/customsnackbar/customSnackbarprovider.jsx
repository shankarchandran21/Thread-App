import { SnackbarProvider } from "notistack";
import SuccessSnackbar from "./successSnackbar";
import StyledMaterialDesignContent from "./styledMaterialDesignContent";
import CssBaseline from "@mui/material/CssBaseline";

const CustomSnackbarProvider = ({ children }) => {
  return (
    <SnackbarProvider
      // hideIconVariant
      maxSnack={1}
      preventDuplicate={true}
      autoHideDuration={3000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        customSuccess: SuccessSnackbar,
      }}
    >
      <CssBaseline />
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
