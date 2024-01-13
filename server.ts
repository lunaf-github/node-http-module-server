import { Http2ServerRequest, Http2ServerResponse } from "http2";

const http = require('node:http');
// const url = require('url');



http.createServer((req: Http2ServerRequest, res: Http2ServerResponse) => {
    res.write('Hello World');
    res.end();
}).listen(8080);

