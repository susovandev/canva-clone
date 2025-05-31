import morgan, { StreamOptions } from 'morgan';
import Logger from '@/utils/logger';
import { config } from '@/config';

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = config.env || 'DEVELOPMENT';
  return env !== 'DEVELOPMENT';
};

// Build the morgan middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

export default morganMiddleware;
