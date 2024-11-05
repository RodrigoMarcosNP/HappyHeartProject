import React from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StatusBar } from '@/src/components/StatusBar';
import { Cards } from '@/src/components/Cards/Cards';

import EvaluatorIcon from '@/assets/evaluator-default.png'
import HistoricIcon from '@/assets/historic-patient.png'
import GuideApp from '@/assets/guide-app.png'

import { NavigationProp } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native/types';

export interface DataScreen {
  title: string,
  icon: ImageSourcePropType,
  screenName: string
}

export function Home({ navigation }: {navigation: NavigationProp<any>}) {
  const data: DataScreen[] = [
    {
      title: 'Avaliadores',
      icon: EvaluatorIcon,
      screenName: 'EvaluatorOptions',
    },
    {
      title: 'Pacientes',
      screenName: 'EvaluatorOptions',
      icon: HistoricIcon,
    },
    {
      title: 'Relatórios',
      screenName: 'EvaluatorOptions',
      icon: GuideApp,
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
