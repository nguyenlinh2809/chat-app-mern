import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

const userMap = {};

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userMap[userId] = socket.id;
  }
  io.emit('onlineUsers', Object.keys(userMap));
  socket.on('disconnect', () => {
    delete userMap[userId];
    io.emit('onlineUsers', Object.keys(userMap));
  });
});

const getSocketIdFromuserId = (userId) => {
  return userMap[userId];
};

export { app, server, io, getSocketIdFromuserId };
