var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String,
        random: Float!,
        rollDice(arg: Int): [Int]
    }
`)

var root  = {
    hello: () => {
        return 'hi lejunjie';
    },
    random: () => {
        return Math.random();
    },
    rollDice: ({arg}) => {
        if (arg === 1) {
            return [1]
        } else {
            return [1, 2]
        }
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000);
console.log('running graphql')