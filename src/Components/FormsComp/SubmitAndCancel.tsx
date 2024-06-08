import { AddCircleOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export const SubmitAndCancel = ({handleClose,handleSubmit}:SubmitAndCancelType) => {
  return (
    <>
      <Button variant="contained" size="large" onClick={() => handleSubmit()}>
        Add
      </Button>
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


