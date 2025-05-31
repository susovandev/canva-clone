import express, { Application } from 'express';
import { config, morganMiddleware } from '@/config/index';
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
  }

  private setupRoutes() {
    appRoutes(this.app);
  }

  private severListen() {
    this.app.listen(config.port, () => {
      Logger.info(
        `Api-gateway server is running on port: ${config.port} in ${config.env} mode`,
      );
    });
  }
}
