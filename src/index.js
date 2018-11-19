import { load as DotEnvLoad } from 'dotenv';
import { server as WsServer } from 'websocket';
import HttpServer from 'http';
import WsConneciton from './WsConnection';

DotEnvLoad();

const server = HttpServer.createServer((request, response) => {

});

const ServerPort = process.env.SERVER_PORT || 8081;

server.listen(ServerPort, () => {});

let wsServer = new WsServer({
    httpServer: server
});

wsServer.on('request', (request) => new WsConneciton(request));

console.log(`Server listening on port ${ServerPort}`);