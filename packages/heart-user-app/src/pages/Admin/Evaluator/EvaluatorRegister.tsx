import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '../../../components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import EvaluatorIcon from '@/assets/user-evaluator.png';
import { TextField } from '@/src/components/Forms/TextField';
import { useForm } from 'react-hook-form';
import { BtnSubmit } from '@/src/components/Buttons/BtnSubmit';
import { useRegister } from '@/src/hooks/useRegister';

export type EvaluatorRegisterInput = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthday: string;
};

export function EvaluatorRegister({ navigation }: { navigation: NavigationProp<any> }) {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<EvaluatorRegisterInput>();
  const { setData, isScreen, resetScreen } = useRegister({ isEvaluator: true });

  const navigateBack = useBackPage(navigation);

  const handleNavigateBack = useCallback(() => navigateBack('EvaluatorOptions'), [navigateBack]);


  const handleDateChange = useCallback((date: Date) => {
    setValue('birthday', date.toLocaleString().split(',')[0]);
  }, [control]);

  const onSubmit = useCallback((input: EvaluatorRegisterInput) => {
    setData(input);
  }, [setData]);

  useEffect(() => {
    if (isScreen) {
      setData(null);
      navigateBack(isScreen);
      resetScreen();
    }
  }, [isScreen, navigateBack, resetScreen, setData]);

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.bacNavTitle}>Registrar Avaliador</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
      >
        <View style={styles.formEvaluator}>
          <Image source={EvaluatorIcon} style={styles.evaluatorIcon} />
          
          <TextField
            label="Nome"
            inputName="name"
            control={control}
            rules={{ required: 'Coloque o Nome' }}
            placeholder="Roberto Silva"
            errorMessage={errors.name?.message}
          />
          <TextField
            label="CPF"
            inputName="cpf"
            control={control}
            rules={{ required: 'Coloque o CPF' }}
            placeholder="###.###.###-##"
            errorMessage={errors.name?.message}
          />
          <TextField
            label="Email"
            inputName="email"
            control={control}
            rules={{ required: 'Coloque o Email' }}
            placeholder="roberto@gmail.com"
            errorMessage={errors.email?.message}
          />
          <TextField
            label="Senha"
            inputName="password"
            secureTextEntry={true}
            control={control}
            rules={{ required: 'Coloque a Senha' }}
            placeholder="***********"
            errorMessage={errors.password?.message}
          />
          <TextField
            label="Data de Nascimento"
            inputName="birthday"
            control={control}
            rules={{ required: 'Obrigatório Colocar A Data de Nascimento' }}
            placeholder="20/02/2024"
            isDate={true}
            onDateChange={handleDateChange}
            errorMessage={errors.birthday?.message}
          />
          <BtnSubmit title="Registrar" onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperNavBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backNavView: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bacNavTitle: {
    color: 'white',
    fontSize: 25,
    paddingLeft: 10,
  },
  formEvaluator: {
    width: '80%',
    paddingTop: 10,
    alignItems: 'center',
  },
  evaluatorIcon: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
