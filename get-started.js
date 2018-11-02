const {graphql, buildSchema} = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

const root = {
    hello: () => {
        return 'get started graphql'
    }
}

graphql(schema, `{hello}`, root)
    .then(res => {
        console.log(res)
    })