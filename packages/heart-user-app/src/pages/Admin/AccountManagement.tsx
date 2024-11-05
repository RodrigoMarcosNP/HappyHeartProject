import React, { useEffect, useState } from 'react';
import { SafeAreaView }  from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import DateTimeFilter from '@/assets/date-timer-filter.png';
import EvaluatorItem from '@/src/components/ItemField';

export function AccountManagement({ navigation }: { navigation: NavigationProp<any> }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    if (isBack) {
      useNavHook('EvaluatorOptions');
      setBack(null);
    }
  }, [isBack, navigation]);

  const handleNavigateBack = () => {
    setBack(true);
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.backNavTitle}>Gerenciar Contas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.evaluatorCards}>

        <View style={styles.evaluatorOptionsList}>
          <TouchableOpacity>
            <Image source={DateTimeFilter} />
          </TouchableOpacity>
        </View>

        <EvaluatorItem 
          title="Ribeiro Martins" 
          date="16 Out"
          onPress={() => useNavHook('AnyUserData')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperNavBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backNavView: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backNavTitle: {
    color: 'white',
    fontSize: 25,
    paddingLeft: 10,
  },
  evaluatorOptionsList: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  evaluatorCards: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
