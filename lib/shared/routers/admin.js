import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import request from 'superagent';
import Admin from 'screens/admin';
let firstEntry = true;

function authenticate (nextState, replaceState, callback) {
    if (typeof window !== 'undefined' && !firstEntry) {
        request
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
            query: 'query { session }'
        })
        .end((error, result) => {
            if (error || !result.body.data.session) {
                window.location.href = '/admin/login';
            } else {
                callback();
            }
        });
    } else {
        firstEntry = false;
        callback();
    }
}

export default [
    <Route name='admin' path='/admin' component={Admin}>
    </Route>
];
