import { client as WsClient } from 'websocket';

let connectionIdCounter = 0;

class WsConneciton {
    constructor(request) {
        this._handleClientMessage.bind(this);
        this._handleClientClose.bind(this);
        this._handleServerMessage.bind(this);
        this._handleServerClose.bind(this);
        this._log.bind(this);

        this.connectionId = connectionIdCounter++;

        this._log('Client connected');

        this.wsClient = new WsClient();

        this.wsClient.on('connect', (connection) => {
            this._log('Server Connected');
            this.wsClientConnection = connection;
            this.wsClientConnection.on('message', (message) => this._handleServerMessage(message));
            this.wsClientConnection.on('close', () => this._handleServerClose());

            this.connection = request.accept(null, request.origin);
            this.connection.on('message', message => this._handleClientMessage(message));
            this.connection.on('close', () => this._handleClientClose());
        });
        this.wsClient.on('connectFailed', (e) => {
            this._log(`Failed to relay connection to ${process.env.CONNECT_ADDR}`);
            console.error(e);
            this.connection.close();
        });

        this.wsClient.connect("wss://stock-test.retail.js-devops.co.uk/api/rss/789");
    }

    _handleClientMessage(message) {
        if (message.type === 'utf8') {
            this._log('Client Sent', message.utf8Data);
            this.wsClientConnection.sendUTF(message.utf8Data);
        }
    }
    
    _handleClientClose() {
        this._log('Client disconnected');
        this.wsClientConnection.close();
    }

    _handleServerMessage(message) {
        if (message.type === 'utf8') {
            this._log('Server Sent', message.utf8Data);
            this.connection.sendUTF(message.utf8Data);
        }
    }

    _handleServerClose() {
        this._log('Server disconnected');
        this.connection.close();
    }

    _log(message, ...optionalParams) {
        console.log(`${message}[${this.connectionId}]`, ...optionalParams);
    }
}

export default WsConneciton;
