import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreateComments from "../comments/CreateComments";
import {useHistory} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
    inline: {
        display: "flex",
        justifyContent: "space-around"
    }
}));

export default function DisplayFunction(props) {
    const classes = useStyles();
    console.log(props)
    const {post} = props;
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const history = useHistory();

    return (
        <Grid>
            <div className={classes.inline}>
                <Button size="small" variant="outlined" color="primary" onClick={()=> history.push("/improve/" + props.mainId+"/"+post._id)}>
                    Improve this version
                </Button>
                <div>
                    <p>Asked: {post.author.creationDate}</p>
                </div>
                <div>
                    <p>Created by: <a href='#' target='_blank'>{post.author.pseudo}</a></p>
                </div>
            </div>
            <div>
                { showResults ? <CreateComments {...props} /> : null }
            </div>
        </Grid>
    )
}
