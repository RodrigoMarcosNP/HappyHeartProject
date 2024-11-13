import React, { useEffect, useState } from 'react';
import { SafeAreaView } from '@/src/components/SafeAreaView';
import { AppBackgroundImage } from '@/src/components/AppBackgroundImage';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useBackPage } from '@/src/hooks/useBackPage';
import ArrowBack from '@/assets/arrow-left.png';
import { BtnSubmit } from '@/src/components/Buttons/BtnSubmit';
import { useForm, SubmitHandler } from 'react-hook-form';
import HemodynamicIcon from '@/assets/hemodynamic.png';
import { TextField } from '@/src/components/Forms/TextField';
import PatientSelector from '@/src/components/Modals/PatientSelector';
import axios from 'axios';

export type HemodynamicsInput = {
  startTime: Date;
  endTime: Date;
  frequencyHeart: number;
  patientCpf: string;
  inputPas: number;
  inputPad: number;
};

interface HemodynamicsProps {
  navigation: NavigationProp<any>;
}

export const Hemodynamics: React.FC<HemodynamicsProps> = ({ navigation }) => {
  const [isBack, setBack] = useState<boolean | null>(null);
  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<HemodynamicsInput>();

  const handleNavigateBack = () => {
    setBack(true);
  };

  const useNavHook = useBackPage(navigation);

  useEffect(() => {
    if (isBack) {
      setBack(null)
      useNavHook('PatientOptions');
    }
  }, [isBack, useNavHook]);

  const onSubmit: SubmitHandler<HemodynamicsInput> = async (formFields) => {
    const isPatientCPF = getValues('patientCpf');
    console.log(isPatientCPF);

    if (isPatientCPF === undefined) {
      return Alert.alert("Selecione um paciente primeiro!");
    }

    console.log('Form submitted with fields: ', formFields);

    const data = {
      patientCpf: formFields.patientCpf,
      endTime: formFields.endTime,  // Convert Date to ISO string
      frequencyHeart: formFields.frequencyHeart,
      inputPad: formFields.inputPad,
      inputPas: formFields.inputPas,
      startTime: formFields.startTime,
      evaluatorOwner: '12545678901'
    };

    try {
      const response = await axios.post(
        'https://e954-187-41-114-134.ngrok-free.app/api/v1/users/evaluator/register/hemodynamic', 
        data
      );

      const responseData = response;
      
      if(responseData.status === 200) {
        console.log('Hemodynamic data registered:', response.data);
        Alert.alert("Hemodinâmica registrada com sucesso!");
      }
    } catch (error) {
      console.error("Error submitting hemodynamic data:", error);
      Alert.alert("Erro ao registrar os dados de hemodinâmica.");
    }
  };

  return (
    <SafeAreaView>
      <AppBackgroundImage isAuth={false} />
      <View style={styles.backNavView}>
        <TouchableOpacity onPress={handleNavigateBack} style={styles.wrapperNavBack}>
          <Image source={ArrowBack} />
          <Text style={styles.bacNavTitle}>Hemodinâmica</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formEvaluator}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Avaliação Hemodinâmica</Text>
          <Image source={HemodynamicIcon} style={styles.iconForm} />
        </View>
        <View style={styles.patientSelectorContainer}>
          <PatientSelector onSelectPatient={(cpf: string) => setValue('patientCpf', cpf)} />
        </View>
        <Text style={styles.instructionText}>
          Variabilidade da FC (medição durante 10 minutos em decúbito dorsal):
        </Text>
        <View style={styles.formFields}>
          <TextField
            label="Horário de Ínicio"
            setValue={setValue}
            inputName="startTime"
            control={control}
            modeDateTime="time"
            errorMessage={errors.startTime?.message}
            isLabelBlack={true}
            isDate={true}
            rules={{ required: "Horário de Inicio é obrigatório" }}
            placeholder="12:00 PM"
            style={styles.textField}
          />
          <TextField
            label="Horário de Término"
            setValue={setValue}
            inputName="endTime"
            control={control}
            modeDateTime="time"
            isLabelBlack={true}
            isDate={true}
            errorMessage={errors.endTime?.message}
            rules={{ required: "Horário de Término é obrigatório" }}
            placeholder="12:00 PM"
            style={styles.textField}
          />
          <TextField
            label="FC De Repouso"
            setValue={setValue}
            inputName="frequencyHeart"
            control={control}
            isLabelBlack
            errorMessage={errors.frequencyHeart?.message}
            rules={{ required: "Horário de Término é obrigatório" }}
            placeholder="Frequência Cardiaca"
            style={styles.textField}
          />
        </View>
        <Text style={[styles.instructionText, { marginTop: 10 }]}>
          Pressão Arterial (avaliado sentado):
        </Text>
        <TextField
          label="PA sistólica (PAS)"
          setValue={setValue}
          inputName="inputPas"
          control={control}
          isLabelBlack={true}
          errorMessage={errors.inputPas?.message}
          rules={{ required: "Preencha este campo" }}
          placeholder="12"
          style={styles.textField}
        />
        <TextField
          label="PA diastólica (PAD)"
          setValue={setValue}
          inputName="inputPad"
          control={control}
          isLabelBlack
          errorMessage={errors.inputPad?.message}
          rules={{ required: "Preencha este campo" }}
          placeholder="09"
          style={styles.textField}
        />
        <BtnSubmit title="Salvar" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperNavBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconForm: {
    width: 85,
    height: 85,
  },
  formEvaluator: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  header: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 125,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 30,
    width: 210,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  instructionText: {
    fontWeight: 'normal',
    fontSize: 20,
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
  formFields: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  patientSelectorContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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

