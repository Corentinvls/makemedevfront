import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

export default function MenuLogOut(props) {
    return <>
        <ListItem button onClick={props.onClick}>
            <ListItemIcon>
                <AccountCircle/>
            </ListItemIcon>
            <ListItemText>
                SignIn or SignUp
            </ListItemText>
            {props.renderMenu}
        </ListItem></>;
}
