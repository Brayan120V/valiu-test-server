
import { io } from '../server.js';

io.on('connection', async (socket) => {
  socket.on('SEND_MESSAGE', (tag) => {
    socket.broadcast.emit('SEND_MESSAGE', tag);
  });
  socket.on('REMOVE_MESSAGE', (tag) => {
    socket.broadcast.emit('REMOVE_MESSAGE', tag);
  });
});
