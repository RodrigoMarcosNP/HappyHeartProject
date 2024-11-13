import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SessionContextType {
  token: string | null;
  role: string | null;
  cpf: string | null;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  getAuth: () => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [cpf, setCPF] = useState<string | null>(null);
  const navigation = useNavigation();

  // Load token from AsyncStorage on mount
  const loadTokenFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      console.log('Loaded token from storage:', storedToken); // Log to see the token
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading token from AsyncStorage:', error);
    }
  };

  // Call the loadTokenFromStorage when the component mounts
  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/auth', { email, password });
      const data = response.data;

      if (response.status === 200) {
        // Save the token in state and AsyncStorage
        console.log(data.data.token)
        setToken(data.data.token);
        setRole(data.data.role);
        setCPF(data.data.cpf);
        console.log(response.data)
        await AsyncStorage.setItem('authToken', data.token);
        console.log('Token successfully set:', data.token); // Log the token after setting
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Could not authenticate.');
    }
  };

  const getAuth = async () => {
    if (token) {
      try {
        const response = await axios.get('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/protected', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = response.data;
        console.log(data)
        if (response.status === 200) {
          console.log('Protected data:', data);
          if (data.role) {
            setRole(data.role);
          }
        } else {
          throw new Error(data.message || 'Failed to fetch protected data');
        }
      } catch (error) {
        console.error('Failed to fetch protected data:', error);
        //clearSession();
      }
    } else {
      //clearSession();
    }
  };

  const clearSession = async () => {
    setToken(null);
    setRole(null);
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('Authentication');
    Alert.alert('Session Expired', 'Your session has expired. Please log in again.');
  };

  useEffect(() => {
    if (!token) {
      //clearSession();
    }
  }, [token]);

  return (
    <SessionContext.Provider value={{ token, role, cpf, setToken, setRole, login, getAuth, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};
