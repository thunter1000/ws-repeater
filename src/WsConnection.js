
let connectionIdCounter = 0;

class WsConneciton {
    constructor(request) {
        this._message.bind(this);
        this._close.bind(this);
        this._log.bind(this);

        this.connectionId = connectionIdCounter++;

        this._log('Client connected');

        const connection = request.accept(null, request.origin);
        connection.on('message', message => this._message(message));
        connection.on('close', () => this._close());
    }

    _message(message) {
        this._log('Client Sent', message);
    }
    
    _close() {
        this._log('Client disconnected');
    }

    _log(message, ...optionalParams) {
        console.log(`${message}[${this.connectionId}]`, ...optionalParams);
    }
}

export default WsConneciton;
