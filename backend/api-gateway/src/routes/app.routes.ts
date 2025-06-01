import { config, proxyOptions } from '@/config';
import { Application, Request, Response } from 'express';
import proxy from 'express-http-proxy';
import authMiddleware from '@/middleware/auth.middleware';



const appRoutes = (app: Application) => {
  app.get('/v1/test', (req: Request, res: Response) => {
    res.status(200).json({ statusCode: 200, message: 'OK' });
  });
  app.use(
    '/v1/media',
    authMiddleware,
    proxy(config.services.designServiceUrl, {
      ...proxyOptions,
      parseReqBody: false,
    }),
  );

  app.use(
    '/v1/designs',
    authMiddleware,
    proxy(config.services.designServiceUrl, {
      ...proxyOptions,
      parseReqBody: false,
    }),
  );

  app.use(
    '/v1/subscriptions',
    authMiddleware,
    proxy(config.services.subscriptionServiceUrl, {
      ...proxyOptions,
      parseReqBody: false,
    }),
  );
};

export default appRoutes;
