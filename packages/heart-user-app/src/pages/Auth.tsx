import React, { useEffect } from 'react';
import { View, Image, StyleSheet, useWindowDimensions, GestureResponderEvent, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import SafeAreaView from '@/src/components/SafeAreaView';
import { addUser, setAuthenticated, setToken } from '@/src/store/ducks/auth';
import TitleImageApp from '@/assets/title-heart-app.png';
import { TextField } from '@/src/components/Forms';
import { useForm } from 'react-hook-form';
import { BtnAuth } from '@/src/components/BtnAuth';
import { AppBackgroundImage } from '../components/AppBackgroundImage';

const USER_DATA = {
  name: 'Porto',
  token: 'token123',
  authenticated: true,
};

export function Auth() {
  const { register, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  const login = () => {
    dispatch(addUser(USER_DATA.name));
    dispatch(setToken(USER_DATA.token));
    dispatch(setAuthenticated(USER_DATA.authenticated));
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
                >
          <View style={[styles.containerWrapper]}>
            <View style={styles.container}>
              <View style={styles.contentWrapper}>
                  <Image source={TitleImageApp} style={styles.titleImage} />
                  <View>
                    <TextField 
                      label="Email"
                      inputMode="email"
                      placeholder="roberto@gmail.com"
                      onChangeText={(text) => setValue('email', text)}
                    />
                    <TextField 
                      label="Senha"
                      placeholder="**********"
                      secureTextEntry={true}
                      onChangeText={(text) => setValue('password', text)}
                    />
                    <BtnAuth 
                      title="Entrar" 
                      onPress={login} 
                    />
                  </View>
              </View>
            </View>
          </View>
          </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImage: {
    width: 200,
    height: 150,
  },
  btnLogin: {
    backgroundColor: '#000',
  },
});

