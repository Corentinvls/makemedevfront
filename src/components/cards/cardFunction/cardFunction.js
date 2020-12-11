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
import generateChipsLink from "../../../utils/generateChipsLink";
import generateChipsTooltip from "../../../utils/generateChipsTooltip";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";


const tags = [
"js ","php ","react"
];

const useStyles = makeStyles((theme) => ({
    root: {
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
        description: "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.Praesent non nunc mollis, fermentum neque at, semper arcu.Nullam eget est sed sem iaculis gravida eget vitae justo",
        defaultValue: "null"
    }];

    const post = [
        {
            "id": "",
            "description": "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.Praesent non nunc mollis, fermentum neque at, semper arcu.Nullam eget est sed sem iaculis gravida eget vitae justo",
            "author": {
                "pseudo": "",
                "avatar": "",
                "creationDate": ""
            },
            "function": "Ma function",
            "like": 0,
            "dislike": 0,
            "commentary": [
                {
                    "pseudo": "",
                    "commentary": "",
                    "date": ""
                }
            ]
        }
    ]

    function getChipToolTip(array) {
        return <>
            {generateChipsTooltip(array).map((component, index) => {
                return <span key={index}> {index === 0 ? null : ','} {component} </span>
            })}
        </>;
    }

    return (

        <Card className={classes.root} elevation={2}>
            <CardHeader
                className={classes.headerCard}
                title="TITLE"
                subheader={generateChipsLink(tags)}
            />
            <CardContent>
                <h4 className={classes.alignLeft}>
                    {post[0].function}({getChipToolTip(params)}){accoladeOpen}
                </h4>
                <p className={classes.contentPL}>
                    {post[0].description}
                </p>
                <h4 className={classes.contentPL}>
                    return {getChipToolTip(returnvalue)} {accoladeClose};
                </h4>
            </CardContent>
            <CardContent className={classes.rowContain}>
                <CardContent className={classes.row}>
                <Icon aria-label="Comments">
                    <CommentIcon/>
                </Icon>
                <p>
                    {post[0].like}
                </p>
                <Icon aria-label="UpVote">
                    <ThumbUpIcon/>
                </Icon>
                <p>
                    {post[0].dislike}
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
