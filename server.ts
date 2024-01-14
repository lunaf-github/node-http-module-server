import  http from "http";
import data from './data/data.json';
import fs from 'fs';
import path from 'path';

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
            res.write(JSON.stringify(data))
            res.end();
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


    // function fileExt(req: IncomingMessage, fileExt: string): string {
    //     if (!req.url) return '#'
    //     if(path.extname(req.url) === fileExt) return fileExt;
    //     return '#'
    // }


// if (req.url) {
//     console.log(req.url === fileExt(req, '.js'));
//     switch (req.url) {
//         case '/':
//             fs.readFile("./dist/index.html", "utf-8", function(err, html){
//                 res.writeHead(200, {"Content-Type": "text/html"});
//                 res.end(html);
//             });
//             break;
//         case 'api/scores':
//             res.write(JSON.stringify(data))
//             res.end();
//             break;
//         case fileExt(req, '.js'):
//             console.log(req.url)
//             const jsPath = path.join(__dirname, 'dist', req.url);
//             var fileStream = fs.createReadStream(jsPath, 'utf-8');
//             res.writeHead(200, {'Content-Type': 'text/javascript'});
//             fileStream.pipe(res);   
//             break;
//         case fileExt(req, '.css'):
//             var cssPath = path.join(__dirname, 'dist', req.url);
//             var fileStream = fs.createReadStream(cssPath, "utf-8");
//             res.writeHead(200, {"Content-Type": "text/css"});
//             fileStream.pipe(res);
//             break;
//         default:
//             res.writeHead(404, {"Content-Type": "text/html"});
//             res.end("No Page Found");
//             break;
//     }
// }



// console.log(httpNode)
// const { ClientRequest, Server, ServerResponse } = httpNode

// const http: http = require('node:http');
// const url = require('url');
// type ClientRequest = http.IncomingMessage & {value?: string}
// type ServerResponse = http.ServerResponse & {locals?: string}
// type cb =   (req: ClientRequest, res: ServerResponse) => void
// type Server = http.Server & {get: (req: ClientRequest, res: ServerResponse) => void}
// interface ServerMethods {
//     get: (f: cb) => void
//     post: (f: cb) => void
// }

// function initServer(port: number): Server {


    // const posts: cb[] = [];
    // const gets: cb[] = [];

    
    // const server: ServerMethods =  {
    //     get: (endpoint: string, f: cb) => {
    //         if(f) gets.push(f)
    //     },
    //     post: (endpoint: string, f: cb) => {
    //         if(f) gets.push(f)
    //     }
    // }

    // httpServer.on('request', (req, res) => {if (req.method === 'GET') gets.forEach(cb => cb(req, res))})
    // httpServer.on('request', (req, res) => {if (req.method === 'POST') posts.forEach(cb => cb(req, res))})
    // return server;
// }

// const server = initServer(PORT);



// server.get((req, res) => res.write('get1'));
// server.get((req, res) => res.end(' end'));

// server.post((req, res) => res.write('Post1'));
// server.post((req, res) => res.end('end'));

// const server: Server  = http.createServer().listen(PORT);
// server.on('connection', () => console.log(`Listening on port ${PORT}`))

// server.get()

// server.on('request', (req: ClientRequest, res) => req.value = 'world');
// server.on('request', (req: ClientRequest, res) => res.write('hello' + req.value));
// server.on('request', (req: ClientRequest, res) => res.end());




// http.get(`http://localhost:${PORT}`, (res) => {
    // const { statusCode } = res;
    // const headers = new Headers({'Content-Type': 'text/html'})

// })

// server.post('http://localhost:${Port}/api/scores', (req: ClientRequest, res: ServerResponse) => {
//     res.write('hello api')
// })