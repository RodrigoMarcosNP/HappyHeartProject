import { Router } from 'express';
import { IRouter } from './router.interface';
import userRouter from './user/userRouter'

const router = Router();

class BaseRouter implements IRouter{// eslint-disable-line
    get routes(){
        router.use('/users', userRouter.routes);
        //router /evaluator
        //router /admin
        return router;
    }
}

export default new BaseRouter();