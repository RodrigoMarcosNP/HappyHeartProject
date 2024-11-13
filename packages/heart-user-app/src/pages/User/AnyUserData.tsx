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

export function AnyDataUser({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [isBack, setBack] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<{ complete_name: string; email: string; cpf: string; password: string, role: string } | null>(null);
  const [hemodynamicData, setHemodynamicData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const useNavHook = useBackPage(navigation);
  const userCurrentCPF = route.params.cpf;
  

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://e954-187-41-114-134.ngrok-free.app/api/v1/users/getUser', 
          { cpf: userCurrentCPF }
        );
        if (response.data) setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isBack) {
      setUserData(null);
      setHemodynamicData([]);
      setBack(null);
      useNavHook('EvaluatorHome');
    } else {
      fetchUserData();
    }
  }, [route, useNavHook, isBack, userCurrentCPF]);

  useEffect(() => {
    const fetchHemodynamicData = async () => {
      try {
        const response = await axios.get(
          'https://e954-187-41-114-134.ngrok-free.app/api/v1/users/evaluator/list/hemodynamic', 
          { params: { patientCpf: userCurrentCPF } }
        );
        if(response.status === 404) return;
        if (response.data) setHemodynamicData(response.data.data);
      } catch (error) {
        console.error('Error fetching hemodynamic data:', error);
      }
    };

    if (userCurrentCPF) fetchHemodynamicData();
  }, [userCurrentCPF]);

  const handleNavigateBack = () => setBack(true);

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
        <EvaluatorItem 
          title={userData?.complete_name ?? "Carregando..."} 
          date="16 Out"
          onPress={() => useNavHook('EvaluatorHome')}
        />
        <View style={styles.accountContainer}>
          <Text style={styles.accountTitle}>Conta</Text>
          <View style={styles.userInfo}>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <LoadingCard key={i} />)
            ) : (
              <>
                <UserInfoRow label="Nome:" value={userData?.complete_name || 'N/A'} />
                <UserInfoRow label="Email:" value={userData?.email || 'N/A'} />
                <UserInfoRow label="CPF:" value={userData?.cpf || 'N/A'} />
                <UserInfoRow label="Senha:" value="*********************" />
              </>
            )}
          </View>
          
          {userData?.role !== 'Patient' ? (
            <View>
              <Text>Test</Text>
            </View>
          ) : (
            <>
              <Text style={styles.accountTitle}>Profissionais</Text>
              <View>
                <Text>Histórico de avaliações em desenvolvimento</Text>
              </View>
              <Text style={styles.accountTitle}>Avaliações</Text>
              <View>
                {hemodynamicData.length > 0 ? (
                  hemodynamicData.map((data, index) => (
                    <View key={index} style={styles.evaluationItem}>
                      <Text style={styles.evaluationTitle}>Hemodinâmica</Text>
                      <Text>Frequência Cardiaca: {data.frequencyheart}</Text>
                      <Text>Horário de Inicio: {data.starttime}</Text>
                      <Text>Horário de Término: {data.endtime}</Text>
                      <Text>PA diastólica - PAD: {data.inputpad}</Text>
                      <Text>PA sistólica - PAS: {data.inputpas}</Text>
                    </View>
                  ))
                ) : (
                  <Text>Nenhuma avaliação encontrada!</Text>
                )}
              </View>
            </>
          )}
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
  evaluationItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  evaluationTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
