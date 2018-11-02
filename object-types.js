const express = require('express');
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');

const schema = buildSchema(`
    type Animal {
        dogSay: String
    }
    type Query {
        animalSay: Animal
    }
`);
const root = {
    animalSay: () => {
        return {
            dogSay: () => {
                return 'dogSay';
            }
        }
    }
};
const app = express();
app.use('/graphql', graphqlHTTP({
    rootValue: root,
    schema,
    graphiql: true
}));
app.listen(2000)