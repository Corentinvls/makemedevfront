import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Icon from "@material-ui/core/Icon";
import generateChipsTooltip from "../../../utils/generateChipsTooltip";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import * as Showdown from "showdown";
import Grid from "@material-ui/core/Grid";
import GenerateChipsLinks from "../../../utils/GenerateChipsLink";
import Moment from "react-moment";
import CodeMirrorRead from "../../../utils/components/CodeMirrorRead";
import "moment-timezone"

function RecipeReviewCard(props) {
    const history = useHistory();
    const classes = useStyles();
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });


    const handleClick = () => {
        history.push("/details/" + props.post._id)
    }

    return (
        <Card className={classes.root} elevation={2} onClick={handleClick}>
            <Grid container item>
                <Grid item xs={12}>
                    <CardContent className={classes.rowContain}>
                        <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid item>
                            <Typography variant="h4" component="h2" className={classes.nameFunction}>
                                {props.post.name}
                                ({generateChipsTooltip(props.post.params)})
                                {"{"}{generateChipsTooltip(props.post.returns)}{"}"}
                            </Typography>
                            <Typography>
                                <GenerateChipsLinks tags={props.post.tag}/>
                            </Typography>
                             </Grid>
                            <Grid container
                                  direction="row"
                                  justify="space-evenly">
                                <Grid item style={{marginLeft: 10}}>
                                <Typography>
                                    By : {props.post.post[0].author.pseudo}
                                </Typography>
                                <Typography>
                                    {<Moment local format="YYYY/MM/DD HH:MM:SS">{props.post.post[0].creationDate*1000}</Moment>}
                                </Typography>
                            </Grid>


                        <Grid item style={{display: 'flex', justifyContent: 'flex-end'}} sm={12} md={4}>
                            <Typography className={classes.marginElementR}>
                                {props.post.post.length}
                            </Typography>
                            <Icon aria-label="Comments" className={classes.marginElementR}>
                                <CommentIcon/>
                            </Icon>
                            <Typography className={classes.marginElementR}>
                                {props.post.post[0].like}
                            </Typography>
                            <Icon aria-label="UpVote" className={classes.marginElementR}>
                                <ThumbUpIcon/>
                            </Icon>
                            <Typography className={classes.marginElementR}>
                                {props.post.post[0].dislike}
                            </Typography>
                            <Icon aria-label="DownVote">
                                <ThumbDownIcon/>
                            </Icon>
                        </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent style={{padding:0}}>
                        <Grid item container className={classes.footerCard}>
                            <Grid item md={6} sm={12} spacing={2}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Description
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div" className={classes.descBox}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: converter.makeHtml(props.post.post[0].description)}}>
                                    </div>
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} spacing={2} style={{ padding:10, borderRadius:5}}>
                                <Typography gutterBottom variant='h5' component="h2">
                                    Function
                                </Typography>
                                <Grid className={classes.descBox} style={{borderRadius:5}}>
                                    <CodeMirrorRead function={props.post.post[0].function} />
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
        width: '80%',
        borderRadius: 10,
        minWidth:320
    },
    rowContain: {
        display: "flex",
        alignItems: 'center',
        // borderColor: "black",
        // borderBottom: "solid",
        // borderBottomWidth: 1,
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

export default RecipeReviewCard
