const express = require('express');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');
const schema = buildSchema(`
    type Query {
        getSomething(thing1: Int!, thing2: Int): [Int!]
    }
`);

const rootValue = {
    getSomething: ({thing1, thing2}) => {
        return [1, 2, 3]
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue,
    schema,
    graphiql: true
}));
app.listen(2000)