import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        maxWidth: 265,
        width: "fit-content",
        height:"fit-content"
    },
    media: {
        height: 140,
    },
});

export default function MediaCard(props) {
    const classes = useStyles();
    const {title, description, image, children} = props
    return (
        <Card className={classes.root}>
            {image &&
            <CardMedia
                className={classes.media}
                image={image}
            />
            }
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                    {children}
                </Typography>
            </CardContent>

        </Card>
    );
}
