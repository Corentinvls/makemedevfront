import Chip from "@material-ui/core/Chip";
import React from "react";

export default function generateChipsLink(chipArray) {
   return chipArray.map((chip,index)=>{
        return <Chip label={chip} key={index} component="a" href="#chip" size="small" clickable />
    })
}
