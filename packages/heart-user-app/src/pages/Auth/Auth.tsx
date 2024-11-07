import React, { useEffect } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import TitleImageApp from '@/assets/title-heart-app.png';
import { useForm } from 'react-hook-form';
import { BtnSubmit } from '@/src/components/Buttons/BtnSubmit';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { TextField } from '@/src/components/Forms/TextField';
import { useBackPage } from '@/src/hooks/useBackPage';
import { NavigationProp } from '@react-navigation/native';
import { useSession } from '@/src/components/Session/SessionProvider';

export type MainInputs = {
  email: string;
  password: string;
};

export function Auth({ navigation }: { navigation: NavigationProp<any> }) {
  const { control, handleSubmit, formState: { errors } } = useForm<MainInputs>();
  const { login, token, role } = useSession();
  const useNavHook = useBackPage(navigation);

  const onSubmit = async (input: MainInputs) => {
    try {
      await login(input.email, input.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    console.log(token)
    if (token) {

      const navigateTo = role === "Admin" ? 'EvaluatorHome' : 'Home';
      useNavHook(navigateTo);
    }
  }, [token, useNavHook, login]);

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

            <BtnSubmit title="Entrar" onPress={handleSubmit(onSubmit)} />
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordTitle} onPress={() => useNavHook('ForgotPasswordChoose')}>
                Esqueci a Senha
              </Text>
            </View>
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
  forgotPassword: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  forgotPasswordTitle: {
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
