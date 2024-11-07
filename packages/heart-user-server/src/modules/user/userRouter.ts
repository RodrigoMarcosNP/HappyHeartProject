import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import userService from './services/userService';
import { authenticateToken } from '../controllers/authMiddleware';

const router = Router();

const formatCPF = (cpf: string) => cpf.replace(/\D/g, '');

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
          token: result.token, // Send the JWT token to the client
        });
      } catch (err) {
        console.error('Error in authentication:', err);
        return sendError(res, 500, 'Error during authentication');
      }
    });

    router.get('/evaluator/getList', authenticateToken, async (req: Request, res: Response) => {
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

    // Protected route: authentication required
    router.get('/patient/getList', authenticateToken, async (req: Request, res: Response) => {
      try {
        const users = await userService.getListByRole('Patient');

        if (users.length === 0) {
          return sendError(res, 404, 'No patients found');
        }

        sendSuccess(res, 'Patients fetched successfully', users);
      } catch (err) {
        console.error('Error fetching patients:', err);
        sendError(res, 500, 'Error fetching patients');
      }
    });

    // Protected route: authentication required
    router.post('/getUser', authenticateToken, async (req: Request, res: Response) => {
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

    // Protected route: authentication required
    router.post('/delete', authenticateToken, async (req: Request, res: Response) => {
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
