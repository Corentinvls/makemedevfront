import Typography from "@material-ui/core/Typography";
import generateChipsTooltip from "../generateChipsTooltip";
import GenerateChipsLinks from "../GenerateChipsLink";
import React from "react";

export default function FunctionNameComponent(props) {
    return <>
        <Typography variant="h4" component="h2" className={props.classes.nameFunction}>
            {props.functionName}
            ({generateChipsTooltip(props.params)})
            {"{"}{generateChipsTooltip(props.returns)}{"}"}
        </Typography>
        <Typography>
            <GenerateChipsLinks tags={props.tags}/>
        </Typography>
    </>;
}
