import HttpServer from 'http';
import {load as DotEnvLoad } from 'dotenv';
import { server as WsServer } from 'websocket';

const httpServer = HttpServer.createServer(() => {});

const TestServerPort = process.env.TEST_SERVER_PORT || 8082;

httpServer.listen(TestServerPort, () => {});

const wsServer = new WsServer({ httpServer });
wsServer.on('request', (request) => {
    console.log('Test server new connection');
    const connection = request.accept(null, request.origin);
    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            console.log('Test server new message');
            connection.send(message.utf8Data);
        }
    });
});


console.log(`Test server listening on port ${TestServerPort}`);