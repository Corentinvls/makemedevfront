import Chip from "@material-ui/core/Chip";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";


export default function GenerateChipsTooltipEditable(props) {
    const {handleDelete, handleClick, chips} = props
    return chips.map((chip, index) => {
        const {name, type, description, defaultValue} = chip
        const tooltipContent = <div><h2>{name}</h2><h3>Type : {type}</h3><h4>{description}</h4>
            <h3>Default
                value : {defaultValue}</h3></div>
        return <Tooltip title={tooltipContent}>
            <Chip label={name} component="a" key={index} onDelete={()=>handleDelete(index)} onClick={()=>handleClick(index)} size="large"/>
        </Tooltip>
    })
}

