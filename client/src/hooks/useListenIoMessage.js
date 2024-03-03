import { useEffect } from 'react';
import { useSocketContext } from '../contexts/socketContext';
import useConversation from '../store/useConversation';

export const useListenIoMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
  }, [socket, messages, setMessages]);
};
