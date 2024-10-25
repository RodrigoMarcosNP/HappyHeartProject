import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser, setAuthenticated, setToken } from '@/src/store/ducks/auth';
import { EvaluatorInputs } from '@/src/pages/Auth/ForgotPasswordEvaluator';
import { MainInputs } from '@/src/pages/Auth/Auth';

const USER_DATA = {
  token: 'token123',
  authenticated: true,
};

export function useAuth(typeInputUser?: string) {
  const dispatch = useDispatch();
  const [isData, setData] = useState<MainInputs | EvaluatorInputs | null>(null);

  useEffect(() => {
    if (isData) {
      try {
        switch(typeInputUser) {
          case 'evaluator':
            let dataInputEvaluator = isData as EvaluatorInputs
            dispatch(postUser({ email: dataInputEvaluator.email, password: dataInputEvaluator.password }));
            break;
          default:
            let dataInputMain = isData as MainInputs;
            dispatch(postUser({ email: dataInputMain.cpf, password: dataInputMain.password }));
        }
        dispatch(setToken(USER_DATA.token));
        dispatch(setAuthenticated(USER_DATA.authenticated));
      } catch (error: any) {
        const errorMessage =
          error.response?.status === 404
            ? "ERROR: USER NOT FOUND"
            : `An unexpected error occurred: ${error.message}`;
        console.error(errorMessage);
      }
    }
  }, [isData, dispatch]);

  return { setData };
}
