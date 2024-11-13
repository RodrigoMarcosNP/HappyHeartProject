import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import DateTimeFilter from '@/assets/date-timer-filter.png';
import EvaluatorItem from '@/src/components/ItemField';
import axios from 'axios';
import formatDate from '@/src/utils/FormatDate';

export function AccountManagement({ navigation }: { navigation: NavigationProp<any> }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const [evaluators, setEvaluators] = useState<any[]>([]); // State to store evaluators
  const [loading, setLoading] = useState<boolean>(true); // State for loading state
  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    async function fetchEvaluators() {
      try {
        const response = await axios.get('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/evaluator/getList')

        if (response.status == 404) {
          throw new Error('Failed to fetch evaluators');
        }

        const data = await response.data.data;
        console.log(data)
        setEvaluators(data);
      } catch (error) {
        console.error('Error fetching evaluators:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvaluators();
  }, []);

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

        {loading ? (
          <View style={{width: '100%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          evaluators.length === 0 ? (
            <View style={{width: '100%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
              <Text>Não há nenhum avaliador!</Text>
            </View>
          ) : (
            evaluators.map((evaluator: any, index: number) => (
              <EvaluatorItem
                key={index}
                title={evaluator.complete_name}
                date={formatDate(evaluator.created_at)}
                onPress={() => useNavHook('AnyUserData', {"cpf": evaluator.cpf})}
              />
            ))
          )
        )}
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
