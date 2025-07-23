import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server running on ws://localhost:8080');

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    ws.on('message', function incoming(message) {
        const str = message.toString();
        console.log('Received:', str);

        let data;
        try {
            data = JSON.parse(str);
        } catch {
            return ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
        }

        // Ping mesajı geldiyse, pong cevabını oluştur
        if (data.type === 'ping') {
            const response = {
                type: 'pong',
                playerId: data.playerId || null
            };

            const json = JSON.stringify(response);
            console.log('Sending:', json);   // Konsola yaz

            ws.send(json);                   // Geri gönder
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
