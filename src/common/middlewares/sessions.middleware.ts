import * as session from 'express-session';
import { StringValue, ms } from '../utils/ms.util';
import { RedisStore } from 'connect-redis';
import { parseBoolean } from '../utils/parse-boolean.util';
import IORedis from 'ioredis';

const redis = new IORedis(process.env.REDIS_URI as string);

export const authSession = session({
  secret: process.env.SESSION_SECRET as string,
  name: process.env.SESSION_NAME,
  resave: true,
  saveUninitialized: false,
  cookie: {
    domain: process.env.SESSION_DOMAIN,
    maxAge: ms(process.env.SESSION_MAX_AGE as StringValue), // 30 days
    httpOnly: parseBoolean(process.env.SESSION_HTTP_ONLY as string),
    secure: parseBoolean(process.env.SESSION_SECURE as string),
    sameSite: 'lax',
  },
  store: new RedisStore({
    client: redis,
    prefix: process.env.SESSION_FOLDER,
  }),
});
