const request = require('request');
let data = '';
const req = request('https://sv.baidu.com/videoui/page/videoland?vid=6633749243382997339&pd=wisenatural', (err, res, body) => {
    console.log(res.headers);
})
console.log(req.path);
console.log(req.headers);
console.log(req.method);