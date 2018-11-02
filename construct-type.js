const express = require('express');
const {
    buildSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');
const graphqlHTTP = require('express-graphql');

const fakeDataBase = {
    a: {
        id: 'a',
        name: 'name: a'
    },
    b: {
        id: 'b',
        name: 'name: b'
    }
}

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    }
});
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (_, {id}) => {
                console.log(JSON.stringify(_))
                return fakeDataBase[id]
            }
        }
    }
})
const schema = new GraphQLSchema({query: queryType})
const app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// const graphqlHTTP = require('express-graphql');
// const schema = buildSchema(`
//     type User {
//         id: String
//         name: String
//     }
//     type Query {
//         user(id: String): User
//     }
// `);

// const root = {
//     user: ({id}) => {
//         return fakeDataBase[id]
//     }
// };
// const app = express();
// app.use('/graphql', graphqlHTTP({
//     rootValue: root,
//     schema,
//     graphiql: true
// }));

app.listen(2000)