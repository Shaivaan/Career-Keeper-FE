import { Button } from "@mui/material";

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
