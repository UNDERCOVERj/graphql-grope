const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const {
    execute,
    parse,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = require('graphql');

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

// 接受请求
app.post('/graphqlModuleA', (req, resA) => {
    let body = req.body;
    request({
        url: 'http://127.0.0.1:4000/graphqlModuleC',
        method: 'POST'
    }, (err, resB, resCData) => {
        request({
            url: 'http://127.0.0.1:4000/graphqlModuleB',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: resCData})
        }, (err, res, resBData) => {
            resA.send(JSON.stringify(resBData))
        })
    })
})

app.post('/graphqlModuleB', (req, res) => {
    // let {keys, data} = req.body;
    let { data } = req.body;
    data = JSON.parse(data);
    let document = parse(`
        query  {
            moduleA {
                result {
                    name
                    tag
                }
            }
        }
    `);
    let childType = new GraphQLObjectType({
        name: 'childType',
        fields: {
            name: {
                type: GraphQLString,
                resolve: (root) => {
                    return root.moduleA.name
                }
            },
            tag: {
                type: GraphQLString,
                resolve: (root) => {
                    return root.moduleA.child.tag;
                }
            }
        }
    })
    let moduleType = new GraphQLObjectType({
        name: 'moduleType',
        fields: {
            result: {
                type: childType,
                resolve: (root) => {
                    return root
                }
            }
        }
    })
    let queryType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            moduleA: {
                type: moduleType,
                resolve: (obj) => {
                    return data;
                }
            }
        }
    })
    let schema = new GraphQLSchema({
        query: queryType
    })
    res.send(execute(schema, document));
})

app.post('/graphqlModuleC', (req, res) => {
    let data = {
        moduleA: {
            name: 'parent module a',
            child: {
                tag: 'child a',
                name: 'child module a'
            }
        },
        moduleB: {
            name: 'parent module b',
            child: {
                tag: 'child b',
                name: 'child module b'
            }
        },
        moduleC: {
            name: 'parent module c',
            child: {
                tag: 'child c',
                name: 'child module c'
            }
        }
    };

    res.send(data)
})

app.listen(4000);