import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from 'actions/users';
import {registerUser} from 'actions/users';

import AdminRegister from './components/register';

@connect(
    () => ({}),
    (dispatch) => ({
        actions : bindActionCreators(userActions, dispatch)
    }),
)
export default class Init extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    onSubmit(user) {
        this.props.actions.registerUser(user, {_id:1})
        .then(() => {
            window.location = '/admin/login';
        })
        .done();
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
