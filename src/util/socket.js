import io from 'socket.io-client';

const socket = io.connect('https://www.nadeuli.kr:81');
export default socket;