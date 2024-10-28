import React from 'react';
import SafeAreaView  from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '../../../components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png'
import { OptionsCards } from '@/src/components/Cards/OptionsCards';

import ConsultantPatient from '@/assets/consultant-patient.png'
import RegisterIcon from '@/assets/register-icon.png'
import ReportCreate from '@/assets/register-report.png'

export interface UserOptions {
  optionName: string,
  icon: ImageSourcePropType,
  screenName: string
}

export function PatientOptions({ navigation }: { navigation: NavigationProp<any> }) {
  const data:UserOptions[] = [
    {
      optionName: "Registrar Pacientes",
      icon: RegisterIcon,
      screenName: ''
    }, 
    {
      optionName: "Consultar Pacientes",
      icon: ConsultantPatient,
      screenName: ''
    },
    {
      optionName: "Criar Relatórios",
      icon: ReportCreate,
      screenName: ''
    },
  ]
  const navigateToScreen = useBackPage(navigation)

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={() => navigateToScreen()} style={styles.wrapperNavBack}>
          <Image source={ArrowBack}></Image>
          <Text style={styles.bacNavTitle}>Avaliadores</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsCards}>
        <OptionsCards navigation={navigation} data={
            data.map((item: UserOptions) => ({
              optionName: item.optionName,
              icon: item.icon,
              screenName: item.screenName
            }))
          }></OptionsCards>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperNavBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
  optionsCards: {
    height: '100%'
  }
});
