import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Icon from "@material-ui/core/Icon";
import generateChipsLink from "../../../utils/generateChipsLink";
import generateChipsTooltip from "../../../utils/generateChipsTooltip";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import * as Showdown from "showdown";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        width: '80%',
        borderRadius: 10,
    },
    rowContain: {
        display: "flex",
        alignItems: 'center',
        borderColor: "black",
        borderBottom: "solid",
        borderBottomWidth: 1,
        backgroundColor: "rgba(107, 185, 240, 0.5)",
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
        position: "relative",
        overflow: "hidden"
    },
    marginElementR: {
        marginRight: 3
    },
    contentNameFunction :{
        textAlign: 'center',
        borderColor: 'black',
        border: 'solid',
        borderWidth: 1,
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
        padding: 125,
        [theme.breakpoints.down('sm')]:{
            padding: 50
        }
    }
}));


function RecipeReviewCard(props) {
    const history = useHistory();
    const classes = useStyles();
    const accoladeOpen = '{';
    const accoladeClose = '}';
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    function getChipToolTip(array) {
        return <>
            {generateChipsTooltip(array).map((component, index) => {
                return <span key={index}> {index === 0 ? null : ','} {component} </span>
            })}
        </>;
    }

    const handleClick = () => {
        history.push("/details/" + props.post._id)
    }

    return (
        <Card className={classes.root} elevation={2} onClick={handleClick}>
            <Grid container item>
                <Grid item xs={12}>
                    <CardContent className={classes.rowContain}>
                        <Grid item md={4} sm={12} style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar alt="Avatar" src={props.post.avatar} className={classes.large}/>
                            <Grid item style={{marginLeft: 10}}>
                                <Typography>
                                    By : {props.post.author.pseudo}
                                </Typography>
                                <Typography>
                                    at : {props.post.post[0].author.creationDate}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item md={4} sm={12} className={classes.contentNameFunction}>
                            <Typography variant="h4" component="h2" className={classes.nameFunction}>
                                {props.post.name}
                            </Typography>
                            <Typography>
                                {generateChipsLink(props.post.tag)}
                            </Typography>
                        </Grid>
                        <Grid item style={{display: 'flex', justifyContent: 'center'}} sm={12} md={4}>
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
                    </CardContent>
                </Grid>
                <Grid item xs={12}>
                    <CardContent style={{padding:0}}>
                        <Grid item container className={classes.footerCard}>
                            <Grid item md={6} sm={12} spacing={2}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Description
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="div"
                                            className={classes.descBox}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: converter.makeHtml(props.post.post[0].description)}}>
                                    </div>
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={12} spacing={2}>
                                <Typography gutterBottom variant='h5' component="h2">
                                    Function
                                </Typography>
                                <Typography component='h4' className={classes.alignLeft}>
                                    {props.post.name}({getChipToolTip(props.post.params)}){accoladeOpen}
                                </Typography>
                                <Typography component='p' className={classes.contentPL}>
                                    {props.post.post[0].function}
                                </Typography>
                                <Typography component="h4" className={classes.contentPL}>
                                    return {getChipToolTip(props.post.returns)} {accoladeClose};
                                </Typography>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>

        </Card>
    )
        ;
}


export default RecipeReviewCard
