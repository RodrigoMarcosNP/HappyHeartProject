import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBackgroundImage } from '../../components/AppBackgroundImage';
import { StatusBar } from '../../components/StatusBar';
import { Cards } from '../../components/Cards';

import DefaultIcon from '@/assets/avatar-user-default.png'
import ExerciseIcon from '@/assets/tool-muscle-exercise.png'
import HistoricIcon from '@/assets/historic-patient.png'
import GuideApp from '@/assets/guide-app.png'

export function Home() {
  const data = [
    {
      title: 'Registrar Exercicios',
      icon: ExerciseIcon,
    },
    {
      title: 'Visualizar Histórico',
      icon: HistoricIcon,
    },
    {
      title: 'Consultar Guia Do App',
      icon: GuideApp,
    },
  ]

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false}/>
      <StatusBar title='Paciente'></StatusBar>
      <Cards data={
        data.map((item) => ({
          title: item.title,
          icon: item.icon
        })
      )}></Cards>
    </SafeAreaView>
  );
}
