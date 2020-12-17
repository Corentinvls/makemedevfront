import React, {useRef} from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DialogChangeField from "./DialogChangeField";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme) => ({}));

export default function EditableField(props) {
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false)
    const [field, setField] = React.useState(props.field)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const isInitialMount = useRef(true);
    React.useEffect(() => {
        if (isInitialMount.current) {
            setField(props.field)
        }
    }, [props])
    return (
        <div>{!edit ?
            <Button
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<EditIcon/>}
                onClick={() => setEdit(true)}
            >
                {field}
            </Button>
            : <>
                <TextField autoFocus
                           value={field}
                           onChange={(event) => {
                               setField(event.target.value)
                           }}/>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleClickOpen}
                    ><SaveIcon size="small"/>
                    </Button>
                    <Button
                        variant="contained"
                        style={{backgroundColor: "#e34b4b"}}
                        size="small"
                        className={classes.button}
                        onClick={() => setEdit(false)}
                    ><CancelIcon/>
                    </Button>
                </ButtonGroup>

                <DialogChangeField open={open} handleClose={handleClose}
                                   handleChangeField={() => props.handleChangeField(field)}/>

            </>
        }

        </div>
    );
}
