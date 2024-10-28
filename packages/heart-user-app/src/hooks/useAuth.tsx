import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/src/store';
import { postUser, setAuthenticated, setToken } from '@/src/store/ducks/auth';
import { EvaluatorInputs } from '@/src/pages/Auth/ForgotPasswordEvaluator';
import { MainInputs } from '@/src/pages/Auth/Auth';
import { AuthHandler } from '../handlers/AuthHandler';

export function useAuth() {
  const dispatch = useAppDispatch();
  const handler = new AuthHandler();
  const [isData, setData] = useState<MainInputs | EvaluatorInputs | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      if (isData) {
        try {
          const passwordHash = await handler.hashPassword(isData.password);
          await dispatch(postUser({
            email: isData.email,
            password: passwordHash,
            type: ''
          }));
          // dispatch(setToken(USER_DATA.token));
          // dispatch(setAuthenticated(USER_DATA.authenticated));
        } catch (error: any) {
          console.error(`An error occurred: ${error.message}`);
        }
      }
    };

    authenticateUser();
  }, [isData, dispatch]);

  return { setData };
}
