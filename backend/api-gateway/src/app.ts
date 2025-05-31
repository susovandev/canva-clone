import express, { Application } from 'express';

export class App {
  app: Application;
  constructor() {
    this.app = express();
  }

  public start() {
    this.app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
    });
  }
}
