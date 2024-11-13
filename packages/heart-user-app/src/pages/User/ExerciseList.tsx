import React, { useState, useEffect } from 'react';
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
import { useSession } from '@/src/components/Session/SessionProvider';

export function ExerciseList({ navigation }: { navigation: NavigationProp<any> }) {
  const [exercises, setExercises] = useState<any[]>([]);
  const { cpf } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const useNavHook = useBackPage(navigation);
  console.log(cpf)
  useEffect(() => {
    const getExercises = async (patientCpf: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'https://e954-187-41-114-134.ngrok-free.app/api/v1/users/exercise/list',
          { patient_cpf: patientCpf }
        );
        if (response.status === 200) {
          setExercises(response.data.data);
        } else {
          setError('Failed to retrieve exercises.');
        }
      } catch (error) {
        setError('Error retrieving exercises.');
        console.error('Error retrieving exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    getExercises(cpf);
  }, []);

  const handleNavigateBack = () => {
    useNavHook('Home');
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.backNavTitle}>Histórico</Text>
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
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text>{error}</Text>
          </View>
        ) : exercises.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>Não há nenhum exercício cadastrado!</Text>
          </View>
        ) : (
          exercises.map((exercise, index) => (
            <EvaluatorItem
              key={index}
              title={exercise.exercise_name}
              date={formatDate(exercise.created_at)}
              onPress={() => useNavHook('ExerciseUserData', { cpf: exercise.patient_cpf, index: index })}
            />
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperNavBack: { flexDirection: 'row', alignItems: 'center' },
  backNavView: { width: '100%', height: 55, justifyContent: 'center', alignItems: 'flex-start' },
  backNavTitle: { color: 'white', fontSize: 25, paddingLeft: 10 },
  evaluatorOptionsList: { width: '100%', height: 40, justifyContent: 'center', alignItems: 'flex-end', backgroundColor: 'white', borderBottomWidth: 1, borderColor: 'gray', paddingHorizontal: 10 },
  evaluatorCards: { flex: 1, padding: 10, alignItems: 'center' },
  loadingContainer: { width: '100%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  errorContainer: { width: '100%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { width: '100%', height: 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
});
