import { createContext, useContext, useEffect, useState } from 'react';
import { socket, connectSocket, disconnectSocket } from '../lib/socket.js';
import { useAuth } from './AuthContext.jsx';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // If user is logged in, connect socket
    if (user) {
      connectSocket();
    } else {
      disconnectSocket();
    }

    function onConnect() {
      setIsConnected(true);
      console.log('Socket connected');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('Socket disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
