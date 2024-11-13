import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import LoadingCard from '@/src/components/LoadingCard';
import axios from 'axios';

export function ExerciseUserData({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const [exerciseData, setExerciseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const useNavHook = useBackPage(navigation);
  const userCurrentCPF = route.params.cpf;
  const exerciseIndex = parseInt(route.params.index);

  useEffect(() => {
    if (isBack) {
      setExerciseData(null);
      setLoading(true);
      setBack(null);
    }
  }, [isBack]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://e954-187-41-114-134.ngrok-free.app/api/v1/users/exercise/list',
          { patient_cpf: userCurrentCPF }
        );
        const responseJson = response.data.data;
        if (response.status === 200 && responseJson.length > exerciseIndex) {
          const dataByIndex = responseJson[exerciseIndex];
          const hours = dataByIndex.duration?.hours ?? '';
          const minutes = dataByIndex.duration?.minutes ?? '';
          const seconds = dataByIndex.duration?.seconds ?? '';
          dataByIndex.duration = `${hours ? hours + ':' : ''}${String(minutes).padStart(2, '0')}${seconds ? ':' + String(seconds).padStart(2, '0') : ''}`;
          setExerciseData(dataByIndex);
        } else {
          console.error('Invalid index or no data found.');
        }
      } catch (error) {
        console.error('Error fetching exercise data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (userCurrentCPF && exerciseIndex !== undefined) fetchExerciseData();
  }, [userCurrentCPF, exerciseIndex, isBack]);

  const handleNavigateBack = () => {
    setBack(true);
    useNavHook('ExercisesList');
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.backNavTitle}>Histórico Exercicio</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.evaluatorCards}>
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Exercício</Text>
          {loading ? (
            <LoadingCard />
          ) : exerciseData ? (
            <View style={styles.exerciseData}>
              <Text>BPM Antes: {exerciseData.bpm_before}</Text>
              <Text>BPM Depois: {exerciseData.bpm_after}</Text>
              <Text>Duração: {exerciseData.duration}</Text>
              <Text>Distância: {exerciseData.distance_roaming}</Text>
              <Text>Grau de Esforço: {exerciseData.effort_degree}</Text>
            </View>
          ) : (
            <Text>Não foram encontrados dados de exercício para este paciente!</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperNavBack: { flexDirection: 'row', alignItems: 'center' },
  backNavView: { width: '100%', height: 55, justifyContent: 'center', alignItems: 'flex-start' },
  backNavTitle: { color: 'white', fontSize: 25, paddingLeft: 10 },
  evaluatorCards: { flex: 1, padding: 10, alignItems: 'center' },
  accountContainer: { width: '100%', padding: 5, borderTopColor: 'black', borderTopWidth: 1, backgroundColor: 'white' },
  accountTitle: { fontWeight: 'bold', fontSize: 25, color: 'white', backgroundColor: '#28ACF7', padding: 4, textAlign: 'center' },
  exerciseData: { padding: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 5 },
});
