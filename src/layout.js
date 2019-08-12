import React, {Component} from 'react';
import {connect} from 'react-redux';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Layout</h1>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Page);
