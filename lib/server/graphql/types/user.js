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
        username: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});

export const userInputType = new GraphQLInputObjectType({
    name: 'userInputType',
    fields: {
        username: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        authority: {type: GraphQLInt},
        date: {type: GraphQLString}
    }
});
