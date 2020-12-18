import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CardFunctionNameComponent from "../utils/components/CardFunctionNameComponent";


function CardFunctionNameProfile(props) {

    const history = useHistory();
    const classes = useStyles();


    const handleClick = () => {
        history.push("/details/" + props.post._id)
    }

    return (
        <Card className={classes.root} elevation={2} onClick={handleClick}>
            <Grid container item>
                <CardFunctionNameComponent classes={classes} post={props.post}/>
            </Grid>
        </Card>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        width: '80%',
        borderRadius: 10,
        minWidth:320
    },
    rowContain: {
        display: "flex",
        alignItems: 'center',
        boxShadow:'5px -12px 15px 5px #000000',
        [theme.breakpoints.down('sm')]:{
            display: "block"
        }
    },
    alignLeft: {
        textAlign: "left",
        wordBreak: "break-all",
        fontSize: 18
    },
    contentPL: {
        textAlign: "left",
        wordBreak: "break-all",
        paddingLeft: '10%',
        fontSize: 18

    }, large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    descBox: {
        maxHeight: 120,
        overflow: "scroll",
    },
    marginElementR: {
        marginRight: 10
    },
    contentNameFunction :{
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        [theme.breakpoints.down('sm')]:{
            marginTop:5,
            marginBottom:5
        }
    },
    nameFunction:{
        textTransform: 'capitalize',
        wordBreak: 'break-word',
    },
    footerCard:{
        padding: 5,
        backgroundColor: "rgba(250, 250, 250, 0.5)",
        [theme.breakpoints.down('sm')]:{
            padding: 50
        }
    }
}));

export default CardFunctionNameProfile
