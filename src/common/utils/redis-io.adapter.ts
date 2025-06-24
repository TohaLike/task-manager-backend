import { IoAdapter } from '@nestjs/platform-socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { Socket } from 'socket.io';
import { authSession } from '../middlewares/sessions.middleware';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: process.env.REDIS_URI });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: process.env.ALLOWED_ORIGIN,
        credentials: true,
      },
    });

    server.use((socket: Socket, next: any) => {
      const req = socket.request;
      authSession(req as any, {} as any, next);
    });

    server.adapter(this.adapterConstructor);

    return server;
  }
}
