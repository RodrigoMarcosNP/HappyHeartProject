import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBackgroundImage } from '../../../components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { BackPage } from '@/src/components/BackPage';
import ArrowBack from '@/assets/arrow-left.png'
import { OptionsCards } from '@/src/components/OptionsCards';

import GuideApp from '@/assets/guide-app.png'
import RegisterIcon from '@/assets/register-icon.png'

export function EvaluatorOptions({ navigation }: { navigation: NavigationProp<any> }) {
  const data = [
    {
      optionName: "Registrar Avaliador",
      icon: RegisterIcon
    }, 
    {
      optionName: "Gerenciar Contas",
      icon: GuideApp
    }
  ]

  const navigateToScreen = BackPage({navigation})

  return (
    <SafeAreaView>
      <AppBackgroundImage />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={navigateToScreen} style={styles.wrapperNavBack}>
          <Image source={ArrowBack}></Image>
          <Text style={styles.bacNavTitle}>Avaliadores</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsCards}>
        <OptionsCards navigation={navigation} data={
            data.map((item) => ({
              optionName: item.optionName,
              icon: item.icon
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
