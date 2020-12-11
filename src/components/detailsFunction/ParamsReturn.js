import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import generateChipsLink from "../../utils/generateChipsLink";
import generateChipsTooltip from "../../utils/generateChipsTooltip";

const useStyles = makeStyles((theme) => ({
}));


export default function ParamsReturn(props){
    const classes = useStyles();
    const {tag, params, returnvalue, name} = props;
    function getChipToolTip(array) {
        return <>
            {generateChipsTooltip(array).map((component, index) => {
                return <span key={index}> {index === 0 ? null : ','} {component} </span>
            })}
        </>;
    }
    return(
        <div>
            <h2>{name}</h2>
            <p>{generateChipsLink(tag)}</p>
            <h2>Params</h2>
            <p>{getChipToolTip(params)}</p>
            <h2>Return</h2>
            <p>{getChipToolTip(returnvalue)}</p>
        </div>
    )
}
