import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CodeMirrorRead from "../../../utils/components/CodeMirrorRead";
import "moment-timezone"
import CardFunctionNameComponent from "../utils/components/CardFunctionNameComponent";
import DescriptionComponent from "../../../utils/components/DescriptionComponent";

function RecipeReviewCard(props) {
    const history = useHistory();
    const classes = useStyles();

    const handleClick = () => {
        history.push("/details/" + props.post._id)
    }

    return (
        <Card className={classes.root} elevation={2} onClick={handleClick}>
            <Grid container item>
                <CardFunctionNameComponent classes={classes} post={props.post}/>
                <Grid item xs={12}>
                    <CardContent style={{padding: 0}}>
                        <Grid item container className={classes.footerCard}>
                            <Grid item md={6} sm={12} style={{padding: 10}}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Description
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div"
                                            className={classes.descBox}>
                                    <DescriptionComponent description={props.post.post[0].description}/>
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} style={{padding: 10, borderRadius: 5}}>
                                <Typography gutterBottom variant='h5' component="h2">
                                    Function
                                </Typography>
                                <Grid className={classes.descBox} style={{borderRadius: 5}}>
                                    <CodeMirrorRead function={props.post.post[0].function}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
        ;
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        width: '98%',
        borderRadius: 10,
        minWidth: 320
    },
    rowContain: {
        display: "flex",
        alignItems: 'center',
        // borderColor: "black",
        // borderBottom: "solid",
        // borderBottomWidth: 1,
        boxShadow: '5px -12px 15px 5px #000000',
        [theme.breakpoints.down('sm')]: {
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
        overflow: "auto",
    },
    marginElementR: {
        marginRight: 10
    },
    contentNameFunction: {
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        [theme.breakpoints.down('sm')]: {
            marginTop: 5,
            marginBottom: 5
        }
    },
    nameFunction: {
        textTransform: 'capitalize',
        wordBreak: 'break-word',
    },
    footerCard: {
        padding: 5,
        backgroundColor: "rgba(250, 250, 250, 0.5)",
        [theme.breakpoints.down('sm')]: {
            padding: 50
        }
    }
}));

export default RecipeReviewCard
