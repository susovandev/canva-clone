import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config, corsOptions, morganMiddleware } from '@/config/index';
import { Logger } from '@/utils';
import appRoutes from './routes/app.routes';


export class App {
  app: Application;
  constructor() {
    this.app = express();
  }

  public start() {
    this.setupMiddlewares();
    this.setupRoutes();
    this.severListen();
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
        `Api-gateway server is running on port: ${config.port} in ${config.env} mode`,
      );
      Logger.info(
        `Design service is running on port: ${config.services.designServiceUrl} in ${config.env} mode`,
      );
      Logger.info(
        `Upload service is running on port: ${config.services.uploadServiceUrl} in ${config.env} mode`,
      );
      Logger.info(
        `Subscription service is running on port: ${config.services.subscriptionServiceUrl} in ${config.env} mode`,
      );
    });
  }
}
