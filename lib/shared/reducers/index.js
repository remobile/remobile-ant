import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

import common from './common';
import users from './users';

export const reducersToCombine = {
    relateReducer,
    router,
    common,
    users,
};
const rootReducer = combineReducers(reducersToCombine);

export default rootReducer;
