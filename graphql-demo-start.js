const request = require('request');

request({
    method: 'POST',
    url: 'http://127.0.0.1:4000/graphqlModuleA',
    headers: {
        'Content-Type': 'application/graphql'
    }
}, (err, res, body) => {
    console.log(body)
})