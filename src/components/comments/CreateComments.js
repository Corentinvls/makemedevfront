import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from 'axios';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    inline: {
        display: "flex",
        justifyContent: "space-around"
    }
}));


export default function CreateComments() {
    const classes = useStyles();
    const [comments, setComments] = useState({_id: '', pseudo: '', date: '', commentary: ''});
    const fetchUrl = 'http://185.163.126.173:4021/api/post-add-commentary';
    const handleChange = (event) => {
        setComments({...comments, [event.target.name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(fetchUrl, comments)
            .then(function (response) {
            })
            .catch(function (error) {
            })
    }

    //     useEffect(() => {
    //     axios.post(fetchUrl, comments).then(res => setComments(res.data))
    // }, [])


    return (
        <Grid>
            <form role='form' onSubmit={handleSubmit}>
                <label> Write a comments</label>
                <TextareaAutosize aria-label="minimum height" name="commentary" rowsMin={3} placeholder="Minimum 3 rows"
                                  required value={comments.commentary} onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary">
                    Submit
                </Button>
            </form>
        </Grid>
    )
}
