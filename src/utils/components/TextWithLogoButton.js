import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default function TextWithLogoButton(props) {
    return <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }}>
        <Typography variant="h6" component="p">{props.text}</Typography>
        <IconButton size="small" aria-label={"up vote"} onClick={props.onClick}>
            {props.icon}
        </IconButton>
    </div>;
}
