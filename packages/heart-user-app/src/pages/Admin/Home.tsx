import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StatusBar } from '@/src/components/StatusBar';
import { Cards } from '@/src/components/Cards';

import EvaluatorIcon from '@/assets/evaluator-default.png'
import HistoricIcon from '@/assets/historic-patient.png'
import GuideApp from '@/assets/guide-app.png'

import { EvaluatorOptions } from './Evaluator/EvaluatorOptions';
import { NavigationProp } from '@react-navigation/native';

export function Home({ navigation }: {navigation: NavigationProp<any>}) {
  const data = [
    {
      title: 'Avaliadores',
      icon: EvaluatorIcon,
      screenName: 'Avaliador',
      navigateTo: EvaluatorOptions
    },
    {
      title: 'Pacientes',
      screenName: 'Avaliador',
      icon: HistoricIcon,
      navigateTo: EvaluatorOptions
    },
    {
      title: 'Relatórios',
      screenName: 'Avaliador',
      icon: GuideApp,
      navigateTo: EvaluatorOptions
    },
  ]

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false}/>
      <StatusBar title='Administrador'></StatusBar>
      <Cards navigation={navigation} data={
        data.map((item) => ({
          title: item.title,
          icon: item.icon,
          screenName: item.screenName
        })
      )}></Cards>
    </SafeAreaView>
  );
}
