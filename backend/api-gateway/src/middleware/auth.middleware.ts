import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { config } from '@/config';
import { Logger } from '@/utils';

const client = new OAuth2Client(config.googleClientId);

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid token');
    }

    req.user = {
      userId: payload.sub!,
      email: payload.email! as string,
      name: payload.name! as string,
    };

    // Optionally, you can add user ID to headers for downstream services
    req.headers['x-user-id'] = payload.sub!;
    req.headers['x-user-email'] = payload.email!;
    req.headers['x-user-name'] = payload.name!;

    next();
  } catch (error) {
    Logger.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
};

export default authMiddleware;
