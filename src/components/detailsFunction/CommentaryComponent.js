import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import TitleDetails from "./TitleDetails";
import {Converter} from "showdown";

export default function CommentaryComponent(props) {
    const converter = new Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
    });

    return (
        <div style={{marginTop: 20}}>
            {props.commentary.map((commentary,key) => {
                return (
                    <Card variant="outlined" style={{marginBottom: 5}} key={key}>
                        <TitleDetails
                            pseudo={commentary.author.pseudo}
                            avatar={commentary.author.avatar}
                            date={commentary.date}
                        />
                        <CardContent style={{paddingTop:0,paddingBottom:0}}>
                            <Typography style={{paddingTop:0,paddingBottom:0}} variant="body2" component="div">
                                <div dangerouslySetInnerHTML={{__html: converter.makeHtml(commentary.commentary)}}/>
                            </Typography>
                        </CardContent>
                    </Card>
                )
            })}</div>
    )
}
