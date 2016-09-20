import React, {PropTypes} from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import moment from 'moment';
import { Button, Form, Input, InputNumber, Spin, notification } from 'antd';
const FormItem = Form.Item;

function noop() {
    return false;
}

@antd_form_create
export default class Register extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit, form, administrator } = this.props;
        const { validateFields } = form;
        validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            onSubmit({
                ...administrator,
                phone: value.phone,
                password: value.password,
                name: value.name,
                email: value.email,
                authority: value.authority,
            });
        });
    }
    handleCancel(e) {
        e.preventDefault();
    }
    checkPhone(rule, value, callback) {
        if (!value ) {
            callback('电话号码不能为空');
        } else if (!/^1[34578]\d{9}$/.test(value)) {
            callback('无效电话号码');
        } else {
            callback();
        }
    }
    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    }
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render() {
        const {form} = this.props;
        const {waiting} = this.props.states||{};
        const {getFieldProps, getFieldError, isFieldValidating} = form;
        const phoneProps = getFieldProps('phone', {
            initialValue: '18085192480',
            rules: [
                { required: true },
                { validator: ::this.checkPhone },
            ],
            trigger: 'onBlur',
        });
        const passwdProps = getFieldProps('password', {
            initialValue: '123',
            rules: [
                { required: true, whitespace: true, min:3, message: '请输入密码' },
                { validator: ::this.checkPass },
            ],
        });
        const rePasswdProps = getFieldProps('rePassword', {
            initialValue: '123',
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: ::this.checkPass2,
            }],
        });
        const emailProps = getFieldProps('email', {
            initialValue: '42550564@qq.com',
            validate: [{
                rules: [
                    { required: true,  message: '请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <div>疾风步工作室</div>
                <br />
                <br />
                <br />
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="电话号码:"
                        hasFeedback
                        help={isFieldValidating('phone') ? '校验中...' : _.last(getFieldError('phone'))}
                        >
                        <Input {...phoneProps} placeholder="请输入用户名"/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码:"
                        hasFeedback
                        >
                        <Input {...passwdProps} type="password" autoComplete="off"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码:"
                        hasFeedback
                        >
                        <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱:"
                        hasFeedback
                        >
                        <Input {...emailProps} placeholder="请输入邮箱"/>
                    </FormItem>
                    {
                        waiting ?
                        <div style={{textAlign:'center'}}>
                            <Spin />
                            <div>请稍后...</div>
                        </div>
                        :
                        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" onClick={::this.handleSubmit}>确定</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={::this.handleReset}>重置</Button>
                        </FormItem>
                    }
                </Form>
            </div>
        );
    }
}
