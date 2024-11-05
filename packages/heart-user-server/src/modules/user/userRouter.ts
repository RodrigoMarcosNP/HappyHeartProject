import { Request, Response, Router } from 'express';
import { IRouter } from '../router.interface';
import userService from './services/userService'
import { UserApp } from './services/userService.interface';

const router = Router();

class UserRouter implements IRouter{// eslint-disable-line
    get routes(){
        router.get('/', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const quote = await userService.getRandomTest();
                return res.send(quote);
            } catch (err) {
                throw err;
            }
        });

        router.post('/register', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                console.log(req.body)
                const evaluatorAccount = await userService.registerUser({
                    'email': req.body.email,
                    'birthday': new Date(req.body.birthday),
                    'role': req.body.role,
                    'cpf': req.body.cpf,
                    'password': req.body.password,
                    'complete_name': req.body.complete_name
                });

                if(evaluatorAccount) {
                    return res.status(201).send('Created Sucessfully!')
                } else {
                    return res.send('Error at create evaluator account!')
                }
            } catch (err) {
                throw err;
            }
        });

        router.post('/remove', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                console.log(req.body)
                const evaluatorAccount = await userService.deleteUser({
                    'cpf': req.body.cpf,
                });

                if(evaluatorAccount) {
                    return res.status(200).send('Deleted Sucessfully!')
                } else {
                    return res.send('Error at create evaluator account!')
                }
            } catch (err) {
                throw err;
            }
        });

        router.post('/auth', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const quote = await userService.AuthUser({
                    email: req.body.email,
                    password: req.body.password,
                });

                return res.send(quote)
            } catch (err) {
                throw err;
            }
        });

        router.post('/evaluator/modify', async (req: Request, res: Response) => {
            try {
                const { cpf } = req.body;
                if (!cpf) {
                    return res.status(400).send('CPF is required for modification!');
                }
        
                const userUpdates: Partial<UserApp> = {
                    email: req.body.email,
                    complete_name: req.body.complete_name,
                    role: req.body.role,
                    birthday: req.body.birthday ? new Date(req.body.birthday) : undefined,
                };
        
                const updateResult = await userService.updateUser(cpf, userUpdates);
                
                if (updateResult) {
                    return res.status(200).send('User modified successfully!');
                } else {
                    return res.status(404).send('User not found!');
                }
            } catch (err) {
                console.error('Error modifying user:', err);
                return res.status(500).send('Error modifying user account!');
            }
        });
        

        return router;
    }
}

export default new UserRouter();