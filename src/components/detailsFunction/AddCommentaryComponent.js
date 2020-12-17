import React from "react";
import {sendCommentary} from "../../request/postRequest";
import Button from "@material-ui/core/Button";
import {updatePosts, updateUser} from "../../store/actions";
import {connect} from "react-redux";
import CustomDraft from "../../utils/components/CustomDraft";

function AddCommentaryComponent(props) {
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
                isCode
                onChange={(value) => {
                    setCommentary(value);
                }}
            />
            <Button
                style={{marginTop: 5}}
                color="primary"
                variant="contained"
                onClick={handleCommentary}
                disabled={(!props.token.length > 0)}>
                Add comment !</Button>
        </>
    );
}
const mapStateToProps = state => {
    return {
        token: state.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        updateUser: (user, token) => dispatch(updateUser(user, token)),
        updatePosts: (posts) => dispatch(updatePosts(posts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentaryComponent)
