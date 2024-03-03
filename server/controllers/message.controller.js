import ConversationModel from '../models/conversation.model.js';
import MessageModel from '../models/message.model.js';
import { getSocketIdFromuserId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.params.userId;
    const { message } = req.body;
    const senderId = req.user._id;
    let conversation = await ConversationModel.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const socketId = getSocketIdFromuserId(receiverId);
    if (socketId) {
      io.to(socketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500, { error: 'Internal Server Error!' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.userId;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    }).populate('messages');

    res.status(200).json(conversation?.messages ?? []);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error!' });
  }
};
