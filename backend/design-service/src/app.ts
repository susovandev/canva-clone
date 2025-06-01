import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import {
  config,
  connectDB,
  corsOptions,
  morganMiddleware,
} from '@/config/index';
import { Logger } from '@/utils';
import appRoutes from './routes/app.routes';

export class App {
  app: Application;
  constructor() {
    this.app = express();
  }

  public async start() {
    await this.databaseConnection();
    this.setupMiddlewares();
    this.setupRoutes();
    this.severListen();
  }

  private async databaseConnection() {
    await connectDB();
  }

  private setupMiddlewares() {
    this.app.use(morganMiddleware);
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    appRoutes(this.app);
  }

  private severListen() {
    this.app.listen(config.port, () => {
      Logger.info(
        `Design- service server is running on port: ${config.port} in ${config.env} mode`,
      );
    });
  }
}
