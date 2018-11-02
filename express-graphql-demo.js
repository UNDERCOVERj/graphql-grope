const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');
const express = require('express');

// 所有标量类型都可返回null，加上！来防止返回null

const schema = buildSchema(`
    type Obj {
        sex: String,
        Age: Number
    }
    type Query {
        getName: String!,
        getSexAndAge: [Obj!]
    }
`)

const root = {
    getName: () => {
        return 'name: graphql'
    },
    getSexAndAge: () => {
        return [{
            sex: 'male',
            age: 12
        }]
    }
}

const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue: root,
    schema,
    graphiql: true
}));

app.listen(2000)