import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_CHAT_APP_BASE_URL);
export default socket;