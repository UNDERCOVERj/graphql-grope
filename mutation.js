const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Mutation {
        sendMessage(msg: String): String
    }
    type Query {
        getMessage: String
    }
`);

// mutation {
//     sendMessage(msg: "graphql")
// }

const root = {
    getMessage: () => {
        return 'get message';
    },
    sendMessage: ({msg}) => {
        console.log('send message ' + msg);
        return 'lejunjie'
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue: root,
    schema,
    graphiql: true
}));
app.listen(2000);