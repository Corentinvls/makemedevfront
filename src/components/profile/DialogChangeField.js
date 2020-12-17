import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogChangeField(props) {
    const {handleClose, open, handleChangeField} = props
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Change Pseudo or Mail</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You're about to change your Pseudo or Mail !<br/>
                        This will change your connection log
                        REMEMBER IT !!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleChangeField()
                        handleClose();
                    }} color="primary">
                        Change
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
