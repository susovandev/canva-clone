import { error } from 'console';
import { Request, Response, NextFunction } from 'express';

const proxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\v1/, '/api');
  },
  proxyErrorHandler: (err: Error, res: Response, _: NextFunction) => {
    res.status(500).json({
      message: 'internal server error',
      error: error,
    });
  },
};

export default proxyOptions;
