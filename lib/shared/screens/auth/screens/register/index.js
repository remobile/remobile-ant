import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'actions/users';
import {registerUser} from 'actions/users';

import AdminRegister from './components';

@connect(
    (state) => ({states: state.users}),
    (dispatch) => ({
        actions : bindActionCreators(userActions, dispatch)
    }),
)
export default class Init extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onSubmit(user) {
        this.props.actions.registerUser(user, {_id:1});
    }
    componentWillReceiveProps(nextProps) {
        const {success} = nextProps.states;
        if (success) {
            window.location = '/admin/login';
        }
    }
    render() {
        return (
            <AdminRegister
                {...this.props}
                onSubmit={::this.onSubmit}
                />
        );
    }
}
