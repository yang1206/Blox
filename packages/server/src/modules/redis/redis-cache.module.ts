import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule, Module } from '@nestjs/common'
import { redisStore } from 'cache-manager-redis-store'
import { RedisCacheService } from './redis-cache.service'

@Module({
  imports: [
    CacheModule.registerAsync<any>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
          password: configService.get('REDIS_PASSWORD'),
          database: 0,
          ttl: 600,
        })
        return {
          store: () => store,

        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule { }
