import type { RedisModuleAsyncOptions } from '@liaoliaots/nestjs-redis'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import type { DynamicModule } from '@nestjs/common'
import { Global, Module } from '@nestjs/common'

import { RedisCacheService } from './redis.service'

@Global()
@Module({
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {
  static forRoot(options: RedisModuleAsyncOptions, isGlobal = true): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [RedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisCacheService],
      exports: [RedisCacheService],
    }
  }

  static forRootAsync(options: RedisModuleAsyncOptions, isGlobal = true): DynamicModule {
    return {
      module: RedisCacheModule,
      imports: [RedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisCacheService],
      exports: [RedisCacheService],
    }
  }
}
