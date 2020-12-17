import React from 'react';

import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Badge from "@material-ui/core/Badge";
import EditIcon from '@material-ui/icons/Edit';
import DialogChangeAvatar from "./DialogChangeAvatar";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
}));

export default function EditableAvatar(props) {
    const classes = useStyles();
    const {pseudo,avatar,handleChangeAvatar}=props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<><Badge color="primary" overlap="circle" badgeContent={<EditIcon/>} onClick={handleClickOpen}
                       anchorOrigin={{
                           vertical: 'bottom',
                           horizontal: 'right',
                       }}>
                    <Avatar alt={pseudo}
                            src={avatar}
                            className={classes.large} style={{margin: 5}}/>
                </Badge>
        <DialogChangeAvatar open={open} handleClose={handleClose} handleChangeAvatar={handleChangeAvatar}/>
        </>
        );
}




