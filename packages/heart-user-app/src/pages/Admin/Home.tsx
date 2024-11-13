import React, { useEffect } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StatusBar } from '@/src/components/StatusBar';
import { Cards } from '@/src/components/Cards/Cards';

import EvaluatorIcon from '@/assets/evaluator-default.png'
import HistoricIcon from '@/assets/historic-patient.png'
import GuideApp from '@/assets/guide-app.png'

import { NavigationProp } from '@react-navigation/native';
import { ImageSourcePropType } from 'react-native/types';
import { useSession } from '@/src/components/Session/SessionProvider';

export interface DataScreen {
  title: string,
  icon: ImageSourcePropType,
  screenName: string,
  cpf?: string;
}

export function EvaluatorHome({ navigation, route }: {navigation: NavigationProp<any>, route: any}) {
  const { token, getAuth } = useSession();

  const data: DataScreen[] = [
    {
      title: 'Avaliadores',
      icon: EvaluatorIcon,
      screenName: 'EvaluatorOptions',
    },
    {
      title: 'Pacientes',
      screenName: 'PatientOptions',
      icon: HistoricIcon,
    },
    {
      title: 'Relatórios',
      screenName: 'EvaluatorReports',
      icon: GuideApp,
    },
  ]

  useEffect(() => {
    if (token) {
      console.log(token)
      getAuth();
    }
  }, [token]);


  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false}/>
      <StatusBar title='Administrador' navigation={navigation}></StatusBar>
      <Cards navigation={navigation} data={
        data.map((item) => ({
          title: item.title,
          icon: item.icon,
          screenName: item.screenName,
        })
      )}></Cards>
    </SafeAreaView>
  );
}
