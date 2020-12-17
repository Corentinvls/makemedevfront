import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import GenerateChipsLinks from "../../../utils/GenerateChipsLink";
import generateChipsTooltip from "../../../utils/generateChipsTooltip";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        minWidth: 345,
        maxWidth: 445,
        borderRadius: 20,

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    headerCard:{
        borderColor:"black",
        borderBottom:"solid",
        borderBottomWidth:1,
    },
    row:{
        display:"flex",
        alignItems:"center",
        justifyContent: "space-around"
    },
    rowContain:{
        display:"flex",
        justifyContent: "space-between"
    },
    alignLeft:{
        textAlign: "left",
        wordBreak: "break-all"
    },
    contentPL:{
        textAlign: "left",
        wordBreak: "break-all",
        paddingLeft : '10%'
    }
}));

let themeFont = createMuiTheme();

themeFont = responsiveFontSizes(themeFont);

function RecipeReviewCard(props) {
    const history = useHistory();
    const classes = useStyles();
    const accoladeOpen = '{' ;
    const accoladeClose = '}' ;

    function getChipToolTip(array) {
        return <>
            {generateChipsTooltip(array).map((component, index) => {
                return <span key={index}> {index === 0 ? null : ','} {component} </span>
            })}
        </>;
    }

    const handleClick = () =>{
        history.push("/details/" + props.post._id)
    }

    return (
        <Card className={classes.root} elevation={2} onClick={handleClick}>
            <CardHeader
                className={classes.headerCard}
                title={props.post.name}
                subheader={<GenerateChipsLinks tags={props.post.tag}/>}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Description
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.post.post[0].description}
                </Typography>
            </CardContent>
            <CardContent>
                <h4 className={classes.alignLeft}>
                    {props.post.name}({getChipToolTip(props.post.params)}){accoladeOpen}
                </h4>
                <p className={classes.contentPL}>
                    {props.post.post[0].function}
                </p>
                <h4 className={classes.contentPL}>
                    return {getChipToolTip(props.post.returns)} {accoladeClose};
                </h4>
            </CardContent>
            <CardContent className={classes.rowContain}>
                <CardContent className={classes.row}>
                    <p>
                        {props.post.post.length}
                    </p>
                <Icon aria-label="Comments">
                    <CommentIcon/>
                </Icon>
                <p>
                    {props.post.post[0].like}
                </p>
                <Icon aria-label="UpVote">
                    <ThumbUpIcon/>
                </Icon>
                <p>
                    {props.post.post[0].dislike}
                </p>
                <Icon aria-label="DownVote">
                    <ThumbDownIcon/>
                </Icon>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </CardContent>

        </Card>
    );
}



export default RecipeReviewCard
