import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} from 'graphql';
import {getProjection} from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

export default {
    type: userType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve (root, params, options) {
        authorize(root);

        const {id, name, email} = params;
        const projection = getProjection(options.fieldASTs[0]);
        const user = await UserModel.findByIdAndUpdate(id,
            {name, email},
            {upsert: false, new: true},
        )
        .select(projection);

        if (!user) {
            throw new Error('Error updating user');
        }
        return user;
    }
};
