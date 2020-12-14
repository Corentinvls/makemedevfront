import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    divComm: {
        padding:'1% 2% 1% 2%'
    }
}));


export default function ShowComments() {
    const classes = useStyles();
    const [comments, setComments] = useState({success: []});
    const fetchUrl = 'http://185.163.126.173:4021/api/post?search={?}';


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(fetchUrl);
            setComments(result.data)
        }
        fetchData();
    }, [])

    function showCommentaries() {
        return comments.success.map(comment => (
            <div key={comment._id}>
                <hr>
                </hr>
                {comment.post[0].commentary.length > 0 ?
                    <div className={classes.divComm}>
                        {console.log(comment.post[0].commentary[0].date)}
                        {console.log(comment)}
                        <p> Pseudo : {comment.post[0].commentary[0].pseudo} , answered
                            : {comment.post[0].commentary[0].date}</p>
                        {/*new Date(comment.post[0].commentary[0].date * 1000)*/}
                        <Box component="p" p={2} ml={6}
                             bgcolor={'lightgrey'}>{comment.post[0].commentary[0].commentary}
                        </Box>
                    </div>
                    : null
                }
            </div>
        ));
    }

    return (
        <Grid>
            <div className={classes.contain}>
                <div>{showCommentaries()}</div>
            </div>
        </Grid>
    )
}
