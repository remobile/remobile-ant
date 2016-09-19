import React, {PropTypes} from 'react';
import _ from 'lodash';

function noop() {
  return false;
}
export default class Login extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    handleSubmit(e) {
        e.preventDefault();
    }
    render () {
        return (
            <div>
                <div>后台登录</div>
                <div>欢迎使用后台管理员</div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
