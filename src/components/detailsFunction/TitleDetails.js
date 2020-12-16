import {CardHeader} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import 'moment-timezone';
import {formatTime} from "../../utils/format";
import React from "react";


export default function TitleDetails(props) {

    return <CardHeader
        title={
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                <Avatar alt={props.pseudo} src={props.avatar}/>
                <div style={{marginLeft: 10}}>{props.title}{props.pseudo}</div>
            </div>
        }
        titleTypographyProps={{variant:props.variant}}
        subheader={<Moment format="YYYY/MM/DD HH:MM:SS">{formatTime(props.date)}</Moment>}
        action={props.action}
    />;
}


