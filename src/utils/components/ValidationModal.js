import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ValidationModal(props) {

    const {open,handleClose,handleOk}=props;

    return (
            <Dialog
                open={open}
                onClose={()=>handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your function will be sent to the community.
                        No inappropriate behavior will be tolerated.
                        Are you sure you want to publish this post?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleClose()} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={()=>handleOk()} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
