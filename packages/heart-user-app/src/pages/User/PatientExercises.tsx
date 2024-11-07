import React from 'react';
import {SafeAreaView}  from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png'
import { OptionsCards } from '@/src/components/Cards/OptionsCards';

import Walking from '@/assets/walk_exercise_02.png'
import Racing from '@/assets/racing_exercise_01.png'
import ReportCreate from '@/assets/register-report.png'
import { ExerciseCards } from '@/src/components/Cards/ExercisesCards';

export interface UserOptions {
  optionName: string,
  icon: ImageSourcePropType,
  screenName: string
}

export function PatientExercises({ navigation }: { navigation: NavigationProp<any> }) {
  const data:UserOptions[] = [
    {
      optionName: "Caminhada",
      icon: Walking,
      screenName: 'PatientExerciseRegister'
    }, 
    {
      optionName: "Ciclismo",
      icon: Racing,
      screenName: 'PatientExerciseRegister'
    },
  ]
  const navigateToScreen = useBackPage(navigation)

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={() => navigateToScreen('Home')} style={styles.wrapperNavBack}>
          <Image source={ArrowBack}></Image>
          <Text style={styles.bacNavTitle}>Exercicios</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsCards}>
        <ExerciseCards navigation={navigation} data={
            data.map((item: UserOptions) => ({
              optionName: item.optionName,
              icon: item.icon,
              screenName: item.screenName
            }))
          }></ExerciseCards>
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
