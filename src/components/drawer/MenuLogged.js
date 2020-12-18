import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItemText from "@material-ui/core/ListItemText";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";

export default function MenuLogged(props) {
    return <>
        <ListItem button onClick={props.onClick}>
            <ListItemIcon><AccountCircle/></ListItemIcon>
            <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem button onClick={props.onClick1}>
            <ListItemIcon><PostAddIcon/></ListItemIcon>
            <ListItemText>Post a function</ListItemText>
        </ListItem>
        <ListItem button onClick={props.onClick2}>
            <ListItemIcon>
                <ExitToAppIcon/>
            </ListItemIcon>
            <ListItemText>
                Log out
            </ListItemText>
        </ListItem>
    </>;
}
