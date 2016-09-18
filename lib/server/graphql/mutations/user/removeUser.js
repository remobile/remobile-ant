import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

export default {
    type: userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve (root, params) {
        authorize(root);

        return UserModel
        .findByIdAndRemove(params.id)
        .exec()
        .then((removedUser) => {
            if (!removedUser) {
                throw new Error('Error removing user');
            }
            return removedUser;
        });
    }
};
