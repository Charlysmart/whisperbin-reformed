type SocketOptions = {
    url: string;
    onMessage?: (data: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
    reconnectDelay?: number;
};

type Message = string;

let messageQueue: Message[] = [];

export const connectSocket = (options : SocketOptions) => {
    const {
        url,
        onMessage,
        onOpen,
        onClose,
        reconnectDelay = 2000
    } = options;

    let socket: WebSocket | null;
    let shouldReconnect = true;

    const connect = () => {
        socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_SERVER_URL}/pages/${url}`);

        socket.onopen = () => {
            console.log("WebSocket connected");
            onOpen?.();

            messageQueue.forEach(msg => socket!.send(msg));
            messageQueue = [];
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage?.(data);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        socket.onclose = () => {
            console.warn("WebSocket disconnected");
            onClose?.();

            if (shouldReconnect) {
                setTimeout(connect, reconnectDelay);
            }
        };
    };

    connect();

    return {
        send: (data: any) => {
            if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(data));
            } else {
                messageQueue.push(JSON.stringify(data));
            }
        },
        close: () => {
            shouldReconnect = false;
            socket?.close();
        },
        getSocket: () => socket
    };
}
