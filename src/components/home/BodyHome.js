import React from "react";
import {makeStyles} from "@material-ui/core";
import MediaCard from "../cards/cardsHome/CardMedia";
import Typography from "@material-ui/core/Typography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    body: {
        textAlign: "center",
        justifyContent:"center",
        padding:30
    },
    cardMargin:{
        textAlign: "center",
        padding:30,
        justifyContent:"center",
        marginTop:50,
    },
    card:{
        textAlign: "center",
        justifyContent:"center",
        padding:30
    },
    margin:{
        marginBottom: 70,
    }
}));

const fontTheme = createMuiTheme();

fontTheme.typography.h2 = {
    fontSize: '5rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [fontTheme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};


export default function BodyHome() {
    const classes = useStyles();
    return (

        <Grid>
            <Grid className={classes.body}>
                <Typography className={classes.margin} variant="h2">For developers, by developers</Typography>
                <Typography className={classes.margin} variant="body1">Make me Dev is an open community for anyone that codes. We post some functions, we help you get answers to your toughest coding questions, share knowledge with your coworkers in private, and find your next dream job.

                </Typography>
            </Grid>
            <Grid container spacing={0} className={classes.body} >
                <Grid container item xs={4} spacing={1} className={classes.card}>
                    <MediaCard title={"TEST"} buttonLabel={"buttonTest"}
                               image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Ft%2Fmaterial-design-background-mountain-landscape-vector-blue-illustration-92941969.jpg&f=1&nofb=1"}>
                        Level up with Stack Overflow while you work. Share knowledge privately with your coworkers using our flagship Q&A engine.
                    </MediaCard>
                </Grid>
                <Grid container item xs={4} spacing={1} className={classes.cardMargin}>
                    <MediaCard title={"TEST"} buttonLabel={"buttonTest"}
                               image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Ft%2Fmaterial-design-background-mountain-landscape-vector-blue-illustration-92941969.jpg&f=1&nofb=1"}>
                        Level up with Stack Overflow while you work. Share knowledge privately with your coworkers using our flagship Q&A engine.
                    </MediaCard>
                </Grid>
                <Grid container item xs={4} spacing={1} className={classes.card}>
                    <MediaCard title={"TEST"} buttonLabel={"buttonTest"}
                               image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Ft%2Fmaterial-design-background-mountain-landscape-vector-blue-illustration-92941969.jpg&f=1&nofb=1"}>
                        Level up with Stack Overflow while you work. Share knowledge privately with your coworkers using our flagship Q&A engine.
                    </MediaCard>
                </Grid>
            </Grid>
        </Grid>

    )
}
