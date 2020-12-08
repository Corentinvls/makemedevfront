import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import generateChipsLink from "../../utils/generateChipsLink";
import generateChipsTooltip from "../../utils/generateChipsTooltip";


const tags = [
"js ","php ","react"
];

const props = [
    "Bob", 4, "split"
]


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 345,
        maxWidth: 645,
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
    inline:{
        display:"flex",
        justifyContent:"space-around"
    }
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    const accoladeOpen = '{' ;
    const accoladeClose = '}' ;
    const returnvalue = [{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    }]
    const params = [{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    }];
    return (

        <Card className={classes.root} elevation={2}>
            <CardHeader
                className={classes.headerCard}
                title="TITLE"
                subheader={generateChipsLink(tags)}
            />
            <CardContent>
                <Typography variant="h4">
                    ({generateChipsTooltip(params)}){accoladeOpen}
                </Typography>
                <Typography variant="h4">
                    return {generateChipsTooltip(returnvalue)} {accoladeClose};
                </Typography>
            </CardContent>
            <CardContent className={classes.inline}>
                <Icon aria-label="Comment">
                    <CommentIcon />
                </Icon>
                <Icon aria-label="UpVote">
                    <ThumbUpIcon />
                </Icon>
                <Icon aria-label="DownVote">
                    <ThumbDownIcon />
                </Icon>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
