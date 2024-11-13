import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import userService from './services/userService';
import { authenticateToken } from '../controllers/authMiddleware';

const router = Router();

export const formatCPF = (cpf: string) => cpf.replace(/\D/g, '');

const sendSuccess = (res: Response, message: string, data?: any) => {
  return res.status(200).json({ message, data });
};

const sendError = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ error: message });
};

class UserRouter implements IRouter {
  get routes() {
    router.get('/', async (req: Request, res: Response) => {
      try {
        const quote = await userService.getRandomTest();
        sendSuccess(res, 'Quote fetched successfully', { quote });
      } catch (err) {
        console.error('Error in fetching quote:', err);
        sendError(res, 500, 'Error fetching quote');
      }
    });

    router.get('/protected', authenticateToken, (req: Request, res: Response) => {
      const user = res.locals.user;
    
      if (!user) {
        return res.status(403).json({ error: 'Invalid token' });
      }
    
      res.json({
        message: 'Token is valid!',
        user,
      });
    });

    router.post('/auth', async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        const result = await userService.AuthUser({ email, password });

        if (!result) {
          return sendError(res, 401, 'Invalid credentials');
        }

        return sendSuccess(res, 'Authentication successful', {
          email: result.email,
          role: result.role,
          cpf: result.cpf,
          token: result.token,
        });
      } catch (err) {
        console.error('Error in authentication:', err);
        return sendError(res, 500, 'Error during authentication');
      }
    });

    router.get('/evaluator/getList', /*authenticateToken,*/ async (req: Request, res: Response) => {
      try {
        const users = await userService.getListByRole('Evaluator');

        if (users.length === 0) {
          return sendError(res, 404, 'No evaluators found');
        }

        sendSuccess(res, 'Evaluators fetched successfully', users);
      } catch (err) {
        console.error('Error fetching evaluators:', err);
        sendError(res, 500, 'Error fetching evaluators');
      }
    });

    router.get('/patient/getList', /*authenticateToken,*/ async (req: Request, res: Response) => {
      try {
        const users = await userService.getListByRole('Patient');

        if (users.length === 0) {
          return sendError(res, 404, 'No patients found');
        }
        console.log(users)
        sendSuccess(res, 'Patients fetched successfully', users);
      } catch (err) {
        console.error('Error fetching patients:', err);
        sendError(res, 500, 'Error fetching patients');
      }
    });

    router.post('/getUser', /*authenticateToken,*/ async (req: Request, res: Response) => {
      try {
        const { cpf } = req.body;

        const sanitizedCpf = formatCPF(cpf);
        const user = await userService.getUserByCpf(sanitizedCpf);

        if (!user) {
          return sendError(res, 404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;
        sendSuccess(res, 'User fetched successfully', userWithoutPassword);
      } catch (err) {
        console.error('Error fetching user:', err);
        sendError(res, 500, 'Error fetching user');
      }
    });

    router.post('/exercise/register', async (req: Request, res: Response) => {
      try {
        const { patient_cpf, bpm_before, bpm_after, distance_roaming, duration, effort_degree, exercise_name } = req.body;
        console.log(req.body);
        
        // Ensure `bpm_after` and `bpm_before` are numbers
        const exerciseData = {
          patient_cpf,
          exercise_name: exercise_name,
          bpm_before: bpm_before,
          bpm_after: bpm_after,
          duration: duration,
          distance_roaming: distance_roaming,
          effort_degree: effort_degree,
          created_at: new Date().toISOString()  // Add the current timestamp to created_at
        };
    
        const isExerciseRegistered = await userService.registerExercise(exerciseData);
    
        if (isExerciseRegistered) {
          return sendSuccess(res, 'Exercise data registered successfully.');
        } else {
          return sendError(res, 400, 'Failed to register exercise data.');
        }
      } catch (err) {
        console.error('Error registering exercise data:', err);
        sendError(res, 500, 'Error registering exercise data');
      }
    });

    router.post('/exercise/list', async (req: Request, res: Response) => {
      try {
        const { patient_cpf } = req.body; // Get patient_cpf from the request body
        
        if (!patient_cpf) {
          return sendError(res, 400, 'Patient CPF is required.');
        }
    
        // Fetch exercises based on patient_cpf from your database
        const exercises = await userService.getExercisesByPatientCpf(patient_cpf);
    
        if (exercises.length > 0) {
          return sendSuccess(res, 'Exercises retrieved successfully.', exercises);
        } else {
          return sendError(res, 404, 'No exercises found for this patient.');
        }
      } catch (err) {
        console.error('Error retrieving exercises:', err);
        sendError(res, 500, 'Error retrieving exercises');
      }
    });

    router.post('/register', async (req: Request, res: Response) => {
      try {
        const { cpf, email, password, complete_name, role, birthday } = req.body;
        
        const sanitizedCpf = formatCPF(cpf);
    
        const userData = {
          cpf: sanitizedCpf,
          email,
          password,
          complete_name,
          role,
          birthday,
        };
    
        const isRegistered = await userService.registerUser(userData);
    
        if (isRegistered) {
          return sendSuccess(res, 'User registered successfully');
        } else {
          return sendError(res, 400, 'User registration failed');
        }
      } catch (err) {
        console.error('Error registering user:', err);
        sendError(res, 500, 'Error registering user');
      }
    });
    
      router.get('/evaluator/list/hemodynamic', async (req: Request, res: Response) => {
        try {
            const { patientCpf } = req.query; // Assuming the patientCpf is passed as a query parameter
            console.log(req.query.patientCpf)
            if (!patientCpf) {
                return sendError(res, 400, 'patientCpf is required.');
            }
    
            // Ensure the CPF is valid (sanitize it)
            const sanitizedCpf = formatCPF(patientCpf.toString());
    
            // Fetch hemodynamic data using the sanitized CPF
            const hemodynamicDataList = await userService.getHemodynamicListByCpf(sanitizedCpf);
    
            if (hemodynamicDataList.length > 0) {
                return sendSuccess(res, 'Hemodynamic data retrieved successfully.', hemodynamicDataList);
            } else {
                return sendError(res, 404, 'No hemodynamic data found for this patient.');
            }
        } catch (err) {
            console.error('Error fetching hemodynamic data:', err);
            sendError(res, 500, 'Error fetching hemodynamic data');
        }
    });

    router.post('/evaluator/register/hemodynamic', async (req: Request, res: Response) => {
      try {
        const { 
          patientCpf, 
          endTime, 
          frequencyHeart, 
          inputPad, 
          inputPas, 
          startTime,
          evaluatorOwner 
        } = req.body;
        console.log(req.body)
        const sanitizedCpf = formatCPF(patientCpf);
        console.log(sanitizedCpf)
        const hemodynamicData = {
          patientCpf: sanitizedCpf,
          endTime,
          frequencyHeart,
          inputPad,
          inputPas,
          startTime,
          evaluatorOwner
        };
    
        const isHemodynamicallyRegistered = await userService.registerHemodynamic(hemodynamicData);
    
        if (isHemodynamicallyRegistered) {
          return sendSuccess(res, 'Hemodynamic data registered successfully.');
        } else {
          return sendError(res, 400, 'Failed to register hemodynamic data.');
        }
      } catch (err) {
        console.error('Error registering hemodynamic data:', err);
        sendError(res, 500, 'Error registering hemodynamic data');
      }
    });

    router.post('/delete',/* authenticateToken,*/ async (req: Request, res: Response) => {
      try {
        const { cpf } = req.body;

        if (!cpf) {
          return sendError(res, 400, 'CPF is required for deletion');
        }

        const sanitizedCpf = formatCPF(cpf);
        const deleteResult = await userService.deleteUser({ cpf: sanitizedCpf });

        if (deleteResult) {
          sendSuccess(res, 'User deleted successfully');
        } else {
          sendError(res, 404, 'User not found');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        sendError(res, 500, 'Error deleting user account');
      }
    });

    return router;
  }
}

export default new UserRouter();
