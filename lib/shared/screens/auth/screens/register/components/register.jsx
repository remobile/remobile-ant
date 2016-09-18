import React, {PropTypes} from 'react';

export default class Init extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    render () {
        return (
            <div>
                <div>后台注册</div>
                <div>欢迎注册后台管理员</div>
                <br />
                <br />
                <br />
             </div>
        );
    }
}
