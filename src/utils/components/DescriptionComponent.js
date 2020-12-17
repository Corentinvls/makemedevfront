import {Converter} from "showdown";
import React from "react";

export default function DescriptionComponent(props) {
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });
    return (
            <div dangerouslySetInnerHTML={{__html: converter.makeHtml(props.description)}}/>
    );
}
