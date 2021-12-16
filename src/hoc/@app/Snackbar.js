import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeSnackbar } from "@/store/reducers/@app/snackbarSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AppSnackbar() {
  const dispatch = useDispatch();
  const { open, message } = useSelector(({ app }) => app.snackbar.data);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackbar())}
      >
        <Alert
          onClose={() => dispatch(closeSnackbar())}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AppSnackbar;
