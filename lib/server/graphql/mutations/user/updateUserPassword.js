import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
} from 'graphql';
import {getProjection} from 'helpers/get-projection';
import {authorize} from '../../authorize';
import UserModel from '../../../models/user';
import {userType} from '../../types/user';

async function setPassword (user, password) {
    return new Promise((resolve, reject) => {
        user.setPassword(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
async function authenticatePassword (user, password) {
    return new Promise((resolve, reject) => {
        user.authenticate(password, (err, thisModel, passwordErr) => {
            if (passwordErr) {
                reject(passwordErr);
            }
            resolve();
        });
    });
}
export default {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        newPassword: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve (root, params) {
        authorize(root);

        const user = await UserModel.findById(params.id);

        if (!user) {
            throw new Error('User does not exist');
        }
        await authenticatePassword(user, params.password);
        await setPassword(user, params.newPassword);
        await user.save();

        return user;
    }
};
