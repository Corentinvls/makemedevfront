import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    inline: {
        display: "flex",
        justifyContent: "space-around"
    }
}));


export default function CreateComments() {
    const classes = useStyles();
    const [comments , setComments] = useState({_id:'',pseudo:'',date:'',commentary:''});
    const [showLoading, setShowLoading] = useState(false)
    const fetchUrl = 'http://185.163.126.173:4021/api/post?search=[test](int)';

    useEffect(()=>{
        axios.post(fetchUrl, comments).then(res=>setComments(res.data))
    },[])
    return (
        <Grid>
            <form role='form'>
                <TextareaAutosize aria-label="minimum height" name="commentary" rowsMin={3} placeholder="Minimum 3 rows"
                />
                <input name="submit" type="submit" id="submit" value="Submit"/>
            </form>
        </Grid>
    )
}
