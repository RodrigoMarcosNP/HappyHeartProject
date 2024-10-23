import React, { useMemo, useRef } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Text, TextInput, TextInputProps, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import SafeAreaView from '@/src/components/SafeAreaView';
import { addUser, setAuthenticated, setToken } from '@/src/store/ducks/auth';
import TitleImageApp from '@/assets/title-heart-app.png';
import { useForm } from 'react-hook-form';
import { BtnAuth } from '@/src/components/BtnAuth';
import { AppBackgroundImage } from '../components/AppBackgroundImage';
import { TextField } from '../components/Forms';

const USER_DATA = {
  name: 'Porto',
  token: 'token123',
  authenticated: true,
};

type Inputs = {
  email: string;
  password: string;
};

export function Auth() {
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const dispatch = useDispatch();

  const onSubmit = (data: Inputs) => {
    console.log(data);
    dispatch(addUser({ email: data.email, password: data.password }));
    dispatch(setToken(USER_DATA.token));
    dispatch(setAuthenticated(USER_DATA.authenticated));
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={true} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
      >
        <View style={styles.contentWrapper}>
          <Image source={TitleImageApp} style={styles.titleImage} />
          <View>
            <TextField
              label="Email"
              inputName="email"
              control={control}
              rules={{ required: 'Email is required' }}
              placeholder="roberto@gmail.com"
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            
            <TextField
              label="Senha"
              inputName="password"
              control={control}
              rules={{ required: 'Password is required' }}
              placeholder="**********"
              secureTextEntry
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            <BtnAuth title="Entrar" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImage: {
    width: 200,
    height: 150,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 5,
    paddingLeft: 6.5,
    paddingRight: 6.5,
  },
  error: {
    color: 'red',
    backgroundColor: 'white',
    flexGrow: 0,
    flexShrink: 0,
    padding: 4,
    marginTop: 5,
  },
});
