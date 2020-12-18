import AvatarWithPseudo from "./AvatarWithPseudo";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import {formatTime} from "../format";
import React from "react";

export default function UserInfo(props){
    console.log(props);
    return <>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <AvatarWithPseudo pseudo={props.pseudo}
                              avatar={props.avatar}
                              marginLeft={props.marginleftPseudo}
            />
        </div>
        <Typography>
            {<Moment local
                     format="YYYY/MM/DD HH:MM:SS">{formatTime(props.date)}</Moment>}
        </Typography>
    </>;
}
