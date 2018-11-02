const express = require('express');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');

let database = null;

const schema = buildSchema(`
    input MessageInput {
        title: String
        content: String
    }
    type Message {
        id: ID!
        title: String!
        content: String
    }
    type Query {
        getMessage(id: ID): Message
        getAll: [Message]
    }
    type Mutation {
        createMessage(input: MessageInput): Message
        addMessage(input: MessageInput): Message,
    }
`);
const root = {
    getMessage: ({id}) => {
        console.log(database)
        return database[id];
    },
    getAll: () => {
        return database;
    },
    createMessage: ({input}) => {
        database = [];
        database.push({
            id: 0,
            ...input
        });
        return {
            id: 0,
            ...input
        };
    },
    addMessage: ({input}) => {
        let id = database.length;
        database.push({
            id,
            ...input
        });
        return {
            id,
            ...input
        };
    }
}

const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue: root,
    schema,
    graphiql: true
}));
app.listen(4000);