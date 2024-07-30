import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your backend URL

export const sendMessage = (message) => {
  socket.emit('sendMessage', message);
};

export const onReceiveMessage = (callback) => {
  socket.on('receiveMessage', callback);
};