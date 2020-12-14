import React from 'react';

import DetailsFunction from "../components/detailsFunction/DetailsFunction";
import {connect} from "react-redux";

function DetailsFunctionView(props) {

    return (
        <div >
            {props.post.post.map(post => <DetailsFunction post={post}
                                                          tag={props.post.tag}
                                                          params={props.post.params}
                                                          returns={props.post.returns}
                                                          name={props.post.name}/>)}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        post: state.post,
    };
};

export default connect(mapStateToProps)(DetailsFunctionView)
