import { useEffect, useState } from 'react';
import axios from 'axios';
import { EvaluatorRegisterInput } from '../pages/Admin/Evaluator/EvaluatorRegister';

export function useRegister(props: { isEvaluator: boolean }) {
  const [isData, setData] = useState<EvaluatorRegisterInput | null>(null);
  const [isScreen, setScreen] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const api = axios.create({
    baseURL: 'http://localhost:3000',
    //headers: { 'Content-Type': 'application/json' },
    timeout: 10000
  });

  const resetScreen = () => setScreen(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (!isData) return;

      setLoading(true);
      try {
        const logTest = await api.get('/'); // Optional test to log the server response
        console.log(logTest);

        const response = await api.post('/api/v1/users/register', {
          complete_name: isData.name,
          email: isData.email,
          cpf: isData.cpf,
          password: isData.password,
          birthday: isData.birthday,
          role: 'Evaluator'
        });

        console.log(response);
        if (response.status === 201) {
          console.log('Registration successful:', response.data);
          setScreen('EvaluatorHome');
        } else {
          console.warn('Unexpected response:', response);
        }
      } catch (error: any) {
        console.error(`An error occurred: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, [isData]);

  return { setData, isScreen, resetScreen, loading };
}
