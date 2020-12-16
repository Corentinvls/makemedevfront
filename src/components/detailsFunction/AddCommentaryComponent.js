import React from "react";
import {sendCommentary} from "../../request/postRequest";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";
import CustomDraft from "../../utils/components/CustomDraft";


function AddCommentaryComponent(props) {
    const classes = useStyles();
    const [commentary, setCommentary] = React.useState()

    async function handleCommentary() {
        let resultCommentary = await sendCommentary(commentary, props.id);
        if (resultCommentary.success) {
            props.updateUser(resultCommentary.success.user, resultCommentary.token)
            props.updatePosts(resultCommentary.success.post)
        }
    }

    return (
        <>
            <CustomDraft
                value={commentary}
                onChange={(value) => {
                    setCommentary(value);
                }}
            />
            <Button
                style={{marginTop: 5}}
                color="primary"
                variant="contained"
                onClick={handleCommentary}>Add comment !</Button>
        </>
    );
}

const useStyles = makeStyles((theme) => ({

}));

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(null, mapDispatchToProps)(AddCommentaryComponent)
