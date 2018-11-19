import { server as WsServer } from 'websocket';
import HttpServer from 'http';
import WsConneciton from './WsConnection';


const serverPort = 8081;



const server = HttpServer.createServer((request, response) => {

});

server.listen(serverPort, () => {});

let wsServer = new WsServer({
    httpServer: server
});

wsServer.on('request', (request) => new WsConneciton(request));