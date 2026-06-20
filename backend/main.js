const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
}

const server = http.createServer((req, res) => {
    console.log(`Reqest URL : ${req.url}`);

    if(req.url === '/api/message' && req.method === 'GET') {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({ text: 'Hello world! This Message is from Node.js server!'}));
    } else {
        const filePath = req.url === '/'
            ? path.join(__dirname, '../frontend', 'index.html')
            : path.join(__dirname, '../frontend', req.url);

        const ext = path.extname(filePath).toLowerCase();

        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if(err) {
                res.writeHead(404, {'content-type': 'text/plain'});
                res.end('404 Not Found...');
            } else {
                res.writeHead(200, {'content-type': contentType});
                res.end(content);
            }
        })
    }
});

server.listen(PORT, () => {
    console.log(`Server Started! http://localhost:${PORT}`);
});