const express = require('express');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
    type Query {
        getArray: [Int!]
    }
`)

const rootValue = {
    getArray: () => {
        return [1, 2]
    }
}

const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue,
    schema,
    graphiql: true
}));
app.listen(2000)