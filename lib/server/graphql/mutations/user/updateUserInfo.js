import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
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
        authority: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    async resolve (root, params, options) {
        authorize(root);

        const {id, name, authority} = params;
        const projection = getProjection(options.fieldASTs[0]);
        const user = await UserModel.findByIdAndUpdate(id,
            {name, authority},
            {upsert: false, new: true}
        )
        .select(projection);

        if (!user) {
            throw new Error('Error updating user');
        }
        return user;
    }
};
