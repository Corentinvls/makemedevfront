import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: "flex",
        justifyContent: "space-around"
    }
}));


export default function Comments(props) {
    const classes = useStyles();
    let comment = '';
    return (
        <Grid>
            <form role='form'>
                <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows"
                onChange={event => comment = event.target.value}/>
                <input name="submit" type="submit" id="submit" value="Submit"/>
            </form>
        </Grid>
    )
}
