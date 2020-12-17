import Chip from "@material-ui/core/Chip";
import React from "react";
import {useHistory} from "react-router";


export default function GenerateChipsLinks(props) {
    const history = useHistory()
        return props.tags.map((chip,index)=>{
            return <Chip label={chip}
                         key={index}
                         component="a"
                         onClick={()=> history.push("/results/["+ chip +"]")}
                         size="small"
                         clickable />
        })

}
