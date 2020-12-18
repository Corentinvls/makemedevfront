import Avatar from "@material-ui/core/Avatar";
import React from "react";

export default function AvatarWithPseudo(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Avatar alt={props.pseudo} src={props.avatar}/>
            <div style={{marginLeft: props.marginLeft}}>{props.pseudo}</div>
        </div>
    );
}
