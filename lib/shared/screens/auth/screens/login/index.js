import request from 'superagent';
import React, {PropTypes} from 'react';

import Login from './components';

export default class LoginContainer extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    onSubmit (user) {
        const {username, password} = user;

        request
        .post('/admin/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({username, password})
        .end((error, res) => {
            if (error) {
                console.error({description: res.body.message});
            } else {
                window.location.href = '/admin';
            }
        });
    }

    render () {
        return (
            <Login
                {...this.props}
                onSubmit={::this.onSubmit}
                />
        );
    }
}
