import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthContext } from './authContext';
import useConversation from '../store/useConversation';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const socket = io('localhost:5000', {
        query: {
          userId: user._id,
        },
      });
      setSocket(socket);

      socket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
