import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import FunctionNameComponent from "../../../../utils/components/FunctionNameComponent";
import UserInfo from "../../../../utils/components/UserInfo";
import LikeDislikePostInfo from "../../cardProfile/LikeDislikePostInfo";
import React from "react";

export default function CardFunctionNameComponent(props) {
    return <Grid item xs={12}>
        <CardContent className={props.classes.rowContain}>
            <Grid
                container
                direction="column"
                justify="space-between"
                spacing={3}
            >
                <Grid item>
                    <FunctionNameComponent classes={props.classes}
                                           functionName={props.post.name}
                                           params={props.post.params}
                                           returns={props.post.returns}
                                           tags={props.post.tag}/>
                </Grid>
                <Grid container
                      direction="row"
                      justify="space-between">
                    <Grid item style={{marginLeft: 10}}>
                        <UserInfo date={props.post.post[0].creationDate}
                                  pseudo={props.post.post[0].author.pseudo}
                                  avatar={props.post.post[0].author.avatar}
                                  marginleftPseudo={5}
                        />
                    </Grid>
                    <Grid item style={{display: "flex", justifyContent: "flex-end", marginRight: 10}}
                          sm={12} md={4}>
                        <LikeDislikePostInfo classes={props.classes} post={props.post}/>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Grid>;
}
