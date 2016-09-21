import {users as actionTypes} from 'actions';

const defaultState = {
    waiting: false,
    success: false,
};

export default function userReducer (state = defaultState, action = {}) {
    switch (action.type) {
        case actionTypes.showWaiting: {
            return Object.assign({}, state, {
                waiting: true,
            })
        }
        case actionTypes.registerSuccess: {
            return Object.assign({}, state, {
                waiting: false,
                success: true,
            })
        }
        case actionTypes.registerError: {
            return Object.assign({}, state, {
                waiting: false,
                success: false,
            })
        }
        default: {
            return state;
        }
    }
}
