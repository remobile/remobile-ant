import request from 'superagent';
import React, {PropTypes} from 'react';

import Home from './components';

export default class HomeContainer extends React.Component {
    render () {
        return (
            <Home {...this.props}/>
        );
    }
}
