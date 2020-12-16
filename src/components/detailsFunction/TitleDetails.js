import {CardHeader} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import 'moment-timezone';
import {formatTime} from "../../utils/format";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function TitleDetails(props) {
    const classes = useStyles();

    return <CardHeader className={classes.title}
        title={
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                <Avatar alt={props.pseudo} src={props.avatar}/>
                <div style={{marginLeft: 10}}>{props.title}{props.pseudo}</div>
            </div>
        }
        subheader={<Moment format="YYYY/MM/DD HH:MM:SS">{formatTime(props.date)}</Moment>}
        action={props.action}
    />;
}

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: 14,
    }
}));
