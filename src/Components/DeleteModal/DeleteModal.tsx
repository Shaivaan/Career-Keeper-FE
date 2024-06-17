import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useZustandStore } from '../../Zustand/Zustand';

export default function DeleteModal({isOpen,closeModal,onClickYes} : DeleteModalType) {
  const isApiProcessing = useZustandStore((state) => state.isApiProcessing);
  return (
      <Dialog
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant='contained' color='info'>No</Button>
          <LoadingButton disabled={isApiProcessing} loading={isApiProcessing} onClick={()=>{onClickYes()}} autoFocus  variant='contained' color='error'>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
  );
}
