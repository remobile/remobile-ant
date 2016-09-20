import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList,
} from 'graphql';

export const userType = new GraphQLObjectType({
    name: 'userType',
    fields: {
        _id: {type: GraphQLString},
        phone: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        date: {type: GraphQLString}
    }
});

export const userInputType = new GraphQLInputObjectType({
    name: 'userInputType',
    fields: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
    }
});
