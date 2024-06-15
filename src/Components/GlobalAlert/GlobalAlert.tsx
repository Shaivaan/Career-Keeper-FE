import { Snackbar, Alert } from "@mui/material";
import { useZustandStore } from "../../Zustand/Zustand";

const duration = 3000;
export const GlobalAlert = () => {
  const isAlertOpen = useZustandStore((state) => state.isAlertOpen);
  const handleClose = useZustandStore((state) => state.setAlertOpen);
  const message = useZustandStore((state) => state.message);
  const alertType = useZustandStore((state) => state.alertType);

  return (
    <Snackbar
      open={isAlertOpen}
      autoHideDuration={duration}
      onClose={()=>handleClose(false)}
    >
      <Alert variant="filled" severity={alertType}>
        {message}
      </Alert>
    </Snackbar>
  );
};
