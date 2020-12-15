import Chip from "@material-ui/core/Chip";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";


export default function GenerateChipsTooltipEditable(props) {
    const {handleDelete, handleClick,chips} = props


    let chipsComponents =chips.map((chip, index) => {
        const {name, type, description, defaultValue} = chip
        const tooltipContent = <div>
            <h1>Click me to edit again</h1>
            <h2>{name}</h2>
            <h3>Type : {type}</h3>
            <h4>{description}</h4>
            <h3>Default value : {defaultValue}</h3>
        </div>
        return <Grid item key={index}>
            <Tooltip title={tooltipContent}>
            <Chip label={name} component="a" onDelete={() => handleDelete( index)}
                  onClick={() => handleClick(index)} size="medium"/>
        </Tooltip>
        </Grid>
    })
    chipsComponents.pop()
    return chipsComponents
}

