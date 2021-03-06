import {users as actionTypes} from 'actions';
import {notification} from 'antd';
import {mutation} from 'relate-js';

export function registerUser(data, fragments) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                registerUser: fragments
            },
            variables: {
                registerUser: {
                    data: {
                        value: data,
                        type: 'userInputType!'
                    }
                }
            }
        }, (result) => {
            if (result.registerUser) {
                notification.success({description: '添加成功'})
                dispatch({
                    type: actionTypes.registerSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.registerError
                })
                notification.error({description: '添加失败,用户名或邮箱被占用'})
            }
        })(dispatch, getState);
    };
}
export function removeUser(id) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                removeUser: {
                    _id: 1
                }
            },
            variables: {
                removeUser: {
                    id: {
                        value: id,
                        type: 'ID!'
                    }
                }
            },
            type: 'REMOVE'
        }, () => {
            dispatch({
                type: actionTypes.removeSuccess
            })
        })(dispatch, getState);
    }
}
export function updateUserInfo(id, user) {
    const {name, authority} = user;
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateUserInfo: {
                    _id: 1,
                    name: 1,
                    authority: 1,
                }
            },
            variables: {
                updateUserInfo: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    name: {
                        value: name,
                        type: 'String!'
                    },
                    authority: {
                        value: authority,
                        type: 'Int!'
                    }
                }
            }
        }, (result) => {
            if (result.updateUserInfo) {
                notification.success({description: '修改成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '添加失败,用户名或邮箱被占用'})
            }
        })(dispatch, getState);
    }
}
export function updateSelfInfo(id, user) {
    const {name, email} = user;
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateSelfInfo: {
                    _id: 1,
                    name: 1,
                    email: 1,
                }
            },
            variables: {
                updateSelfInfo: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    name: {
                        value: name,
                        type: 'String!'
                    },
                    email: {
                        value: email,
                        type: 'String!'
                    }
                }
            }
        }, (result) => {
            if (result.updateSelfInfo) {
                notification.success({description: '修改成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '修改失败，请检查邮箱是否被占用'})
            }
        })(dispatch, getState);
    }
}
export function updateUserPassword (id, password, newPassword) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.showWaiting
        });
        return mutation({
            fragments: {
                updateUserPassword: 1,
            },
            variables: {
                updateUserPassword: {
                    id: {
                        value: id,
                        type: 'ID!'
                    },
                    password: {
                        value: password,
                        type: 'String!'
                    },
                    newPassword: {
                        value: newPassword,
                        type: 'String!'
                    }
                }
            }
        }, (result) => {
            if (result.updateUserPassword) {
                notification.success({description: '修改密码成功'})
                dispatch({
                    type: actionTypes.updateSuccess
                })
            } else {
                dispatch({
                    type: actionTypes.updateError
                })
                notification.error({description: '旧密码验证错误'})
            }
        })(dispatch, getState);
    };
}
