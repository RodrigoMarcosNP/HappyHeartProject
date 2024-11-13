import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import DateTimeFilter from '@/assets/date-timer-filter.png';
import axios from 'axios';

const ItemCard = ({ title, toScreen, onPress }: { title: string, toScreen: string, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.itemCard}>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export function EvaluatorReport({ navigation }: { navigation: NavigationProp<any> }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const [evaluators, setEvaluators] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const response = await axios.get('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/evaluator/getList');

        if (response.status === 404) {
          throw new Error('Failed to fetch evaluators');
        }

        const data = response.data.data;
        setEvaluators(data);
      } catch (error) {
        console.error('Error fetching evaluators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluators();
  }, []);

  useEffect(() => {
    if (isBack) {
      setBack(null);
      useNavHook('PatientOptions');
    }
  }, [isBack, navigation, useNavHook]);

  const handleNavigateBack = () => {
    setBack(true);
  };

  // Navigate to the specific screen
  const handleNavigate = (screen: string) => {
    if(screen === '') {
      Alert.alert("Em desenvolvimento!")
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />

      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.backNavTitle}>Criar Relatórios</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.evaluatorCards}>
        <View style={styles.evaluatorOptionsList}>
          <TouchableOpacity>
            <Image source={DateTimeFilter} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.itemsContainer}>
            {/* Pass the navigation function to ItemCard */}
            <ItemCard 
              title="Hemodinâmica" 
              toScreen="Hemodynamics" 
              onPress={() => handleNavigate('Hemodynamics')} 
            />
            <ItemCard 
              title="Antropometrica" 
              toScreen="Antropometrica" 
              onPress={() => handleNavigate('')} 
            />
            <ItemCard 
              title="Funcional" 
              toScreen="Funcional" 
              onPress={() => handleNavigate('')} 
            />
          </View>
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
  loadingContainer: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  itemCard: {
    padding: 10,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
