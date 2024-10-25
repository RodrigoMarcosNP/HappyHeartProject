import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import SafeAreaView from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import { BtnAuth } from '@/src/components/Buttons/BtnAuth';
import { TextField } from '@/src/components/Forms/TextField';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/src/hooks/useAuth';

export type EvaluatorInputs = {
  email: string;
  password: string;
};

export function ForgotPasswordEvaluator({ navigation }: { navigation: NavigationProp<any> }) {
  const [isBack, setBack] = useState<boolean | null>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<EvaluatorInputs>();
  const useNavHook = useBackPage(navigation);
  const { setData } = useAuth();

  useEffect(() => {
    if(isBack) {
      useNavHook(undefined)
    }
  }, [isBack]);

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={true} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => setBack(true)} style={styles.backButton}>
            <Image source={ArrowBack} />
            <Text style={styles.backNavTitle}>Esquecer Senha Avaliador</Text>
          </TouchableOpacity>
          <View style={styles.optionsContainer}>
            <TextField
              label="Email"
              inputName="email"
              control={control}
              rules={{ required: 'Email é obrigatório' }}
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

            <BtnAuth title="Esquecer" onPress={handleSubmit((data) => setData(data))} />
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
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
