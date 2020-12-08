import Chip from "@material-ui/core/Chip";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";


export default function generateChipsTooltip(chipArray) {

    return chipArray.map((chip,index)=>{
        const tooltipContent = <h2>{chip.name}</h2>
        return <Tooltip title={tooltipContent}> <Chip label={chip.name} key={index} component="a" href="#chip" size="small" /> </Tooltip>
    })
}
