import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogChangeAvatar(props) {
   const {handleClose,open, handleChangeAvatar}=props
    const [value,setValue]=React.useState("")
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Avatar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To change your avatar copy the URL of your image and put it here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={value}
                        margin="dense"
                        id="url"
                        label="Image URL"
                        onChange={(e)=>{setValue(e.target.value)}}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=> {
                        handleChangeAvatar(value)
                        handleClose();
                    }} color="primary">
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
