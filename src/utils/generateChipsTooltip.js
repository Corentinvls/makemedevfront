import Chip from "@material-ui/core/Chip";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";


export default function generateChipsTooltip(chipArray) {
    return chipArray.map((chip,index)=>{
        const tooltipContent = <div
        ><h2>{chip.name}</h2>
            <h3>Type : {chip.type}</h3>
            <h4>{chip.description}</h4>
            {chip.defaultValue!==""&&
            <h3>Default value : {chip.defaultValue}</h3>
            }
       </div>
        return <Tooltip title={tooltipContent}><Chip label={chip.name} key={index} component="a" href="#chip" size="small" /></Tooltip>
    })
}
