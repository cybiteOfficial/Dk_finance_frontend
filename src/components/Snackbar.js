import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

export default function AutohideSnackbar({openSnack,message,severity}) {
  
  const [open, setOpen] = React.useState(openSnack);

  React.useEffect(() => {
    setOpen(openSnack);
  }, [openSnack]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
