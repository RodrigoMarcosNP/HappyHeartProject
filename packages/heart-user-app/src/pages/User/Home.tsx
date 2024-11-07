import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StatusBar } from '@/src/components/StatusBar';
import { Cards } from '@/src/components/Cards/Cards';

import DefaultIcon from '@/assets/avatar-user-default.png'
import ExerciseIcon from '@/assets/tool-muscle-exercise.png'
import HistoricIcon from '@/assets/historic-patient.png'
import GuideApp from '@/assets/guide-app.png'

export function PatientHome({navigation}: {navigation: any}) {
  const data = [
    {
      title: 'Registrar Exercicios',
      icon: ExerciseIcon,
      screenName: 'PatientExercises'
    },
    {
      title: 'Visualizar Histórico',
      icon: HistoricIcon,
      screenName: 'EvaluatorHome'
    },
    {
      title: 'Consultar Guia Do App',
      icon: GuideApp,
      screenName: 'EvaluatorHome'
    },
  ]

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false}/>
      <StatusBar title='Paciente'></StatusBar>
      <Cards data={data.map((item) => ({
        title: item.title,
        icon: item.icon,
        screenName: item.screenName
      })
      )} navigation={navigation}></Cards>
    </SafeAreaView>
  );
}
