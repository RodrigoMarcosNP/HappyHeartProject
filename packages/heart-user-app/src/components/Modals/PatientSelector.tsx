import React from 'react';
import { Modal, View, Text, Button, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import PatientIcon from '@/assets/user-evaluator.png';

interface Patient {
  cpf: string;
  name: string;
}

interface PatientSelectorProps {
  onSelectPatient: (cpf: string) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ onSelectPatient }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const toggleModal = () => setModalVisible(prev => !prev);

  const fetchPatients = async () => {
    try {
      const response = await fetch('https://e954-187-41-114-134.ngrok-free.app/api/v1/users/patient/getList');
      const json = await response.json();
      if (response.ok) {
        const patientList = json.data.map(({ cpf, complete_name }: {cpf: string, complete_name: string}) => ({ cpf, name: complete_name }));
        setPatients(patientList);
      } else {
        console.error(json.message);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false); // Stop loading after request completes
    }
  };

  React.useEffect(() => {
    if (modalVisible) {
      setLoading(true); // Start loading before fetching
      fetchPatients();
    }
  }, [modalVisible]);

  const renderPatientItem = ({ item }: { item: Patient }) => (
    <View style={styles.itemContainer} onTouchEnd={() => handleSelectPatient(item.cpf)}>
      <Image source={PatientIcon} style={styles.icon} />
      <Text style={styles.patientName}>{item.name}</Text>
    </View>
  );

  const handleSelectPatient = (cpf: string) => {
    onSelectPatient(cpf);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Button title="Selecione Paciente" onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Selecione o paciente</Text>
            
            {/* Show loading indicator or patients list */}
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <FlatList
                data={patients}
                keyExtractor={(item) => item.cpf}
                renderItem={renderPatientItem}
              />
            )}

            <Button title="Fechar" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderColor: 'grey',
    borderWidth: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 5,
  },
  patientName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default PatientSelector;
