import {Converter} from "showdown";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function DescriptionComponent(props) {
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    return (
        <Typography variant="body2" component="p">
            <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.description)}}/>
        </Typography>
    );
}
