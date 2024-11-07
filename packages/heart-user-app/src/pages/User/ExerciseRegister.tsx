import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import EvaluatorItem from '@/src/components/ItemField';
import LoadingCard from '@/src/components/LoadingCard';
import axios from 'axios';

export function ExerciseRegister({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<{ complete_name: string; email: string; cpf: string; password: string } | null>(null);
  const [exerciseData, setExerciseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const { exerciseName } = route.params;
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:3000/api/v1/exercises/getExerciseByTitle`, {
          params: { title: exerciseName }
        });

        if (response.data) {
          setExerciseData(response.data); // Assuming response contains exercise data
        }
      } catch (err) {
        console.error('Error fetching exercise data:', err);
        setError('Failed to load exercise data.');
      } finally {
        setLoading(false);
      }
    };

    //fetchExerciseData();
    
    if (isBack) {
      useNavHook('PatientExercises');
      setBack(null);
    }
  }, [route.params.exerciseName, isBack, useNavHook]); // Added exerciseName dependency

  const handleNavigateBack = () => {
    setBack(true);
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.backNavTitle}>{`${route.params.exerciseName || 'Carregando...'}`}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.evaluatorCards}>
        <EvaluatorItem
          title={`${route.params.exerciseName ?? "Carregando..."}`}
          date="16 Out"
          onPress={() => useNavHook('AccountManagement')}
        />
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Exercicio</Text>
          <View style={styles.userInfo}>
            {loading ? (
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : error ? (
              <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
              <>
                <UserInfoRow label="Nome:" value={userData?.complete_name || 'N/A'} />
                <UserInfoRow label="Email:" value={userData?.email || 'N/A'} />
                <UserInfoRow label="CPF:" value={userData?.cpf || 'N/A'} />
                <UserInfoRow label="Senha:" value="*********************" />
              </>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const UserInfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

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
  evaluatorCards: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  accountContainer: {
    width: '100%',
    padding: 5,
    borderTopColor: 'black',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  accountTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    backgroundColor: '#28ACF7',
    padding: 4,
    textAlign: 'center',
  },
  userInfo: {
    width: '100%',
    padding: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  infoValue: {
    color: 'black',
    fontWeight: '300',
  },
  loadingCard: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    fontWeight: 'bold',
  },
});
