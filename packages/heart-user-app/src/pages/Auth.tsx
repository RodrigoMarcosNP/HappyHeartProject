import React from 'react';
import { Button, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { addUser, setAuthenticated, setToken } from '../store/ducks/auth';

const USER_DATA = {
  name: 'Porto',
  token: 'token123',
  authenticated: true,
};

export function Auth(): React.JSX.Element {
  const dispatch = useDispatch();

  const login = () => {
    dispatch(addUser(USER_DATA.name));
    dispatch(setToken(USER_DATA.token));
    dispatch(setAuthenticated(USER_DATA.authenticated));
  };

  return (
    <View>
      <Text>Não Autenticado</Text>
      <Button title="Login" onPress={login}></Button>
    </View>
  );
}
