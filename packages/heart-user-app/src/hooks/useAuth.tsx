import { useEffect, useState } from 'react';
import { EvaluatorInputs } from '@/src/pages/Auth/ForgotPasswordEvaluator';
import { MainInputs } from '@/src/pages/Auth/Auth';
import { AuthHandler } from '@/src/handlers/AuthHandler';

export function useAuth() {
  const handler = new AuthHandler();
  const [isData, setData] = useState<MainInputs | EvaluatorInputs | null>(null);
  const [isScreen, setScreen] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isData) {
        setLoading(true)
        try {
          //const passwordHash = await handler.hashPassword(isData.password);
          setScreen('EvaluatorHome')
        } catch (error: any) {
          console.error(`An error occurred: ${error.message}`);
        } finally {
          setLoading(false)
        }
      }
    };

    authenticateUser();
  }, [isData, isScreen]);

  return { setData, isScreen, loading };
}
