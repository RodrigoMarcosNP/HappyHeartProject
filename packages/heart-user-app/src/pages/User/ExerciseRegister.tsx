import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import EvaluatorItem from '@/src/components/ItemField';
import LoadingCard from '@/src/components/LoadingCard';
import axios from 'axios';
import { TextField } from '@/src/components/Forms/TextField';
import { useForm } from 'react-hook-form';
import { BtnSubmit } from '@/src/components/Buttons/BtnSubmit';
import { useSession } from '@/src/components/Session/SessionProvider';

export type ExerciseInputs = {
  bpm_start: number;
  bpm_before: number;
  patientCpf: string;
  duration: number;
  distance_roaming: number;
  effort_degree: number;
};

export function ExerciseRegister({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const { control, setValue, formState: { errors }, handleSubmit } = useForm<ExerciseInputs>();
  const [userData, setUserData] = useState<{ complete_name: string; email: string; cpf: string; password: string } | null>(null);
  const [exerciseData, setExerciseData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const useNavHook = useBackPage(navigation);
  const {cpf} = useSession();
  useEffect(() => {
    setLoading(false);
    if (isBack) {
      useNavHook('PatientExercises');
      setBack(null);
    }
  }, [route.params.exerciseName, isBack, useNavHook]); // Added exerciseName dependency

  const onSubmit = async (input: any) => {
    const patientCpf = cpf;
    console.log(input)
    const exerciseData = {
      patient_cpf: patientCpf,
      bpm_before: String(input.bpm_before),
      bpm_after: String(input.bpm_after),
      distance_roaming: String(input.distance_roaming),
      duration: String(input.duration),
      effort_degree: String(input.effort_degree),
      exercise_name: route.params.exerciseName,
      created_at: new Date().toISOString,
    };
  
    console.log('Submitting data:', exerciseData);
  
    try {
      const response = await axios.post('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/exercise/register', exerciseData, {
        headers: {
          'Content-Type': 'application/json'
        } 
      });
  
      if (response.status === 200) {
        Alert.alert("Exercicio salvo com sucesso!")
        console.log('Exercise data registered successfully:', response.data.message);
      } else {
        console.error('Failed to register exercise data:', response.data.message);
      }
    } catch (error) {
      console.error('Error during exercise data registration:', error);
    }
  };
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
          date=""
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
                <TextField
                  label="BPM Inicial"
                  setValue={setValue}
                  inputName="bpm_after"
                  control={control}
                  isLabelBlack={true}
                  errorMessage={errors.bpm_after?.message}
                  rules={{ required: "Preencha este campo" }}
                  placeholder="70"
                  style={styles.textField}
                />
                <TextField
                  label="BPM Final"
                  setValue={setValue}
                  inputName="bpm_before"
                  control={control}
                  isLabelBlack={true}
                  errorMessage={errors.bpm_before?.message}
                  rules={{ required: "Preencha este campo" }}
                  placeholder="80"
                  style={styles.textField}
                />
                <TextField
                  label="Duração"
                  setValue={setValue}
                  inputName="duration"
                  control={control}
                  isLabelBlack={true}
                  errorMessage={errors.duration?.message}
                  rules={{ required: "Preencha este campo" }}
                  placeholder="80"
                  style={styles.textField}
                />
                <TextField
                  label="Distância Percorrida"
                  setValue={setValue}
                  inputName="distance_roaming"
                  control={control}
                  isLabelBlack={true}
                  errorMessage={errors.distance_roaming?.message}
                  rules={{ required: "Preencha este campo" }}
                  placeholder="80"
                  style={styles.textField}
                />
                <TextField
                  label="Grau de Esforço"
                  setValue={setValue}
                  inputName="effort_degree"
                  control={control}
                  isLabelBlack={true}
                  errorMessage={errors.effort_degree?.message}
                  rules={{ required: "Preencha este campo" }}
                  placeholder="80"
                  style={styles.textField}
                />
                <BtnSubmit title="Salvar" onPress={handleSubmit(onSubmit)} />

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
  textField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%',
    marginHorizontal: 0,
  },
});
