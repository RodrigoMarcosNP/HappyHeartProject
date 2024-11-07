import express from 'express';
import cors from 'cors';
import { ServerInterface } from './app.interface';
import baseRouter from '@src/modules/baseRouter'
import runDBMigrations from '@src/modules/db/migrations/index';

class Server implements ServerInterface {// eslint-disable-line

  async server(): Promise<express.Application> {
    const app = express();
    const isSucessDB = await runDBMigrations();

    const corsOption = {
      origin: [
        'http://localhost:8081', 
        'exp://mmofaow-kleberrennan-8081.exp.direct',
        'http://10.100.2.2:8081',
        'http://10.100.0.100:8081'
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    }
    app.use(cors(corsOption));
    app.options('*', cors(corsOption))

    if(isSucessDB) {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use('/api/v1', baseRouter.routes);

      app.get("/", (req, res) => {
        res.status(200).json({
          "message": "Welcome to express-create application!"
        });
      });
    }
    return app;
  }
}

export default new Server();
