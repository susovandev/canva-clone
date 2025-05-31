import { Application, Request, Response } from 'express';

const appRoutes = (app: Application) => {
  app.use('/api/test', (req: Request, res: Response) => {
    res.status(200).json({ statusCode: 200, message: 'OK' });
  });
};

export default appRoutes;
