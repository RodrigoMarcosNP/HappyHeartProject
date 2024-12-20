import React, { useEffect, useState } from 'react';
import { SafeAreaView }  from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '../../../components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png'
import { OptionsCards } from '@/src/components/Cards/OptionsCards';

import ManagementAccounts from '@/assets/account-management.png'
import RegisterIcon from '@/assets/register-icon.png'

export interface UserOptions {
  optionName: string,
  icon: ImageSourcePropType,
  screenName: string
}

export function EvaluatorOptions({ navigation }: { navigation: NavigationProp<any> }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  
  const data:UserOptions[] = [
    {
      optionName: "Registrar Avaliador",
      icon: RegisterIcon,
      screenName: 'EvaluatorRegister'
    }, 
    {
      optionName: "Gerenciar Contas",
      icon: ManagementAccounts,
      screenName: 'AccountManagement'
    }
  ]

  const handleNavigateBack = () => {
    setBack(true);
  };

  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    if(isBack) {
      useNavHook('EvaluatorHome')
    }
  }, [isBack, navigation])

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
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
