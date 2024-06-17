import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useZustandStore } from "../../Zustand/Zustand";
import { LoadingButton } from "@mui/lab";

export const SubmitAndCancel = ({handleClose,handleSubmit,submitButtonTitle='Add'}:SubmitAndCancelType) => {
  const isApiProcessing = useZustandStore((state) => state.isApiProcessing);

  return (
    <>
      <LoadingButton variant="contained" size="large" onClick={() => handleSubmit()} disabled={isApiProcessing} loading={isApiProcessing}>
        {submitButtonTitle}
      </LoadingButton>
      <Button variant="outlined" size="large" onClick={handleClose}>
        Cancel
      </Button>
    </>
  );
};


export const AddProjectButton = ({ handleOpen,buttonTitle }: AddProjectButtonParent) => {
  return (
    <Box className="addButtonParent">
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<AddCircleOutline />}
        size="large"
        style={{ textTransform: "none" }}
      >
        Add New {buttonTitle}
      </Button>
    </Box>
  );
};


