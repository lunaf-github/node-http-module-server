import  http from "http";
import https from 'https';
import data from './data/data.json';
import fs from 'fs';
import path from 'path';
const { Buffer } = require('node:buffer');

type openlibraryAPIData = {
    "docs": BookInfo[];
}
type BookInfo = {
    "title": string;
}

const PORT = 8080;


const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile("./dist/index.html", "utf-8", function(err, html){
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            });
        } else if (req.url?.match('\.js')) {
            const jsPath = path.join(__dirname, 'dist', req.url);
            var fileStream = fs.createReadStream(jsPath, 'utf-8');
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            fileStream.pipe(res);
        } else if(req.url?.match("\.css$")){
            var cssPath = path.join(__dirname, 'dist', req.url);
            var fileStream = fs.createReadStream(cssPath, "utf-8");
            res.writeHead(200, {"Content-Type": "text/css"});
            fileStream.pipe(res);
        } else if (req.url === '/api/scores') {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(data))
            res.end();
        } else if (req.url?.match("[?]")) { // the [] prevents interpretation as meta-character
            const path = req.url.split('?');
            const queries: {[k: string]: string} = path[1].split('&').reduce((acc, entry) => {
                const [key, value] = entry.split('=');
                acc[key] = value;
                return acc;
            }, {});

            if (path[0] === '/api/books') {
                // fetch request with http module
                https.get(`https://openlibrary.org/search.json?title=${queries.title}`, getResponse => {
                    let data: Buffer[] = [];
                    getResponse.on('data', (chunk: Buffer) => {
                        data.push(chunk);
                    })
                    getResponse.on('end', () => {
                        const parsedData: openlibraryAPIData = JSON.parse(Buffer.concat(data).toString()); // Concating buffer and turning into string converts the buffer into JSON format
                        const titles = parsedData.docs.map(books => books.title);
                        res.writeHead(200, {"Content-Type": "application/json"})
                        res.write(JSON.stringify(titles));
                        res.end();
                    })
                })
            }

        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("No Page Found");
        }
    }
        

    if (req.method === 'POST') {

    }
});

server.on('connect', () => console.log(`Listening on port ${PORT}`))
server.listen(PORT);


