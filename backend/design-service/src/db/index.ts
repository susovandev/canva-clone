import { config } from '@/config';
import { Logger } from '@/utils';
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await connect(config.databaseUrl);

    Logger.info(
      `Database connected successfully`,
      connectionInstance.connection.host,
    );
  } catch (error) {
    Logger.error(`Database connected failed !!!`, error);
    process.exit(1);
  }
};
export default connectDB;
