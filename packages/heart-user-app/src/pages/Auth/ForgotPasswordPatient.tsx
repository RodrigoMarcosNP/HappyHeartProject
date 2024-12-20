import React, { useCallback } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { useForm } from 'react-hook-form';
import { BtnSubmit } from '@/src/components/Buttons/BtnSubmit';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { TextField } from '@/src/components/Forms/TextField';
import { useBackPage } from '@/src/hooks/useBackPage';
import { NavigationProp } from '@react-navigation/native';

import ArrowBack from '@/assets/arrow-left.png';

const USER_DATA = {
  name: 'Porto',
  token: 'token123',
  authenticated: true,
};

export type Inputs = {
  cpf: string;
  password: string;
  type: string;
};

export function ForgotPassword({ navigation }: { navigation: NavigationProp<any> }) {
  const { control, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const navigateToScreen = BackPage(navigation);

  const onSubmit = useCallback(async (data: Inputs) => {
    try {
      console.log(data)
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.error("ERROR: USER NOT FOUND");
      } else {
        console.error("An unexpected error occurred:", error.message);
      }
    }
  }, [data]);

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={true} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={navigateToScreen} style={styles.backButton}>
            <Image source={ArrowBack} />
            <Text style={styles.backNavTitle}>Avaliadores</Text>
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <TextField
              label="CPF"
              inputName="cpf"
              control={control}
              rules={{ required: 'CPF is required' }}
              placeholder="roberto@gmail.com"
            />
            {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
            <BtnSubmit title="Recuperar" onPress={handleSubmit(onSubmit)} />
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
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  backNavTitle: {
    color: 'white',
    fontSize: 25,
    paddingLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
