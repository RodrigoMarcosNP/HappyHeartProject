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
import axios from 'axios';
import CryptoJS from 'crypto-js';

export type EvaluatorRegisterInput = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  birthday: string;
};

export function EvaluatorRegister({ navigation }: { navigation: NavigationProp<any> }) {
  const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm<EvaluatorRegisterInput>();
  const navigateBack = useBackPage(navigation);

  const handleNavigateBack = useCallback(() => navigateBack('EvaluatorOptions'), [navigateBack]);

  const handleDateChange = useCallback((date: Date) => {
    setValue('birthday', date.toLocaleString().split(',')[0]);
  }, [control]);

  const onSubmit = useCallback(async (input: EvaluatorRegisterInput) => {
    try {
      console.log("Submitting evaluator data:", input);

      // Fixed salt value (10)
      const salt = "10"; 

      // Hash password with the fixed salt
      const generateHash = (password: string) => {
        const salt = "10";  // Fixed salt
        const iterations = 10;  // Reduced iteration count (default is 1000)
        const hashedPassword = CryptoJS.PBKDF2(password, salt, { keySize: 256 / 32, iterations }).toString(CryptoJS.enc.Hex);
        return hashedPassword;
      };
      
      const hashedPassword = await generateHash(input.password);
      console.log(hashedPassword)
      const response = await axios.post('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/register', {
        email: input.email,
        birthday: input.birthday,
        role: 'Evaluator',
        cpf: input.cpf,
        password: hashedPassword,
        complete_name: input.name, 
      });

      if (response.status === 200) {
        console.log('Evaluator registered successfully');
        navigateBack('EvaluatorOptions');
      } else {
        console.error('Error registering evaluator', response.data);
      }
    } catch (error) {
      console.error('Error submitting evaluator registration:', error);
    }
  }, [navigateBack]);

  useEffect(() => {
    // Handle any other side effects or clean-up
  }, []);

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
            setValue={setValue}
            rules={{ required: 'Coloque o Nome' }}
            placeholder="Roberto Silva"
            errorMessage={errors.name?.message}
          />
          <TextField
            label="CPF"
            inputName="cpf"
            setValue={setValue}
            setError={setError}
            isCpf={true}
            control={control}
            rules={{ required: 'Coloque o CPF' }}
            placeholder="###.###.###-##"
            errorMessage={errors.name?.message}
          />
          <TextField
            label="Email"
            inputName="email"
            isEmail={true}
            setValue={setValue}
            setError={setError}
            control={control}
            rules={{ required: 'Coloque o Email' }}
            placeholder="roberto@gmail.com"
            errorMessage={errors.email?.message}
          />
          <TextField
            label="Senha"
            inputName="password"
            setValue={setValue}
            secureTextEntry={true}
            control={control}
            rules={{ required: 'Coloque a Senha' }}
            placeholder="***********"
            errorMessage={errors.password?.message}
          />
          <TextField
            label="Data de Nascimento"
            inputName="birthday"
            setValue={setValue}
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
