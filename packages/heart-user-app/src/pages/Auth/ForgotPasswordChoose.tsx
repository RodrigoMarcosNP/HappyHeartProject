import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import SafeAreaView from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';

export function ForgotPasswordChoose({ navigation }: { navigation: NavigationProp<any> }) {
  const useNavHook = useBackPage(navigation);

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={true} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -100}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={() => useNavHook()} style={styles.backButton}>
            <Image source={ArrowBack} />
            <Text style={styles.backNavTitle}>Esquecer Senha</Text>
          </TouchableOpacity>
          <View style={styles.optionsContainer}>
            <Text style={styles.title}>Você é um...</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => useNavHook('EvaluatorForget')}>
              <Text style={styles.optionText}>Avaliador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Paciente</Text>
            </TouchableOpacity>
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
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: 'white',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  optionText: {
    fontWeight: '600',
  },
});
