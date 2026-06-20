const http = require('http');
const fs = require('fs');
const path = require('path');
const { text } = require('stream/consumers');

const server = http.createServer((req, res) => {
    if(req.url === '/api/message' && req.method === 'GET') {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ text: 'Hello world! This Message is from Node.js server!'}));
        return;
    }

    let filePath = path.join(__dirname, 'frontend', req.url === '/' ? 'index.html': req.url);

    fs.readFile(filePath, (err, content) => {
        if(err) {
            res.writeHead(404, {'content-type': 'text/plain'});
            res.end('404 Not Found...')
        } else {
            res.writeHead(200, {'content-type': "application/javascript"});
            res.end(content);
        }
    });

});

server.listen(3000, () => {
    console.log('Server Started! http://localhost:3000');
});