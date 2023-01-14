import { Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { UserModule } from 'src/modules/user/user.module'
import { PostsModule } from 'src/modules/posts/posts.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { CategoryModule } from 'src/modules/category/category.module'
import { TagsModule } from 'src/modules/tags/tags.module'
import { PictureModule } from 'src/modules/picture/picture.module'
import { ViewModule } from 'src/modules/view/view.module'
import { SearchModule } from 'src/modules/search/search.module'
import { MenusModule } from 'src/modules/menus/menus.module'
import { filePath } from '@my-blog/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置为全局
      envFilePath: [filePath],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        host: configService.get('DB_HOST'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT'), // 端口号
        username: configService.get('DB_USER'), // 用户名
        password: configService.get('DB_PASSWORD'), // 密码
        database: configService.get('DB_DATABASE'), // 数据库名
        timezone: 'local', // 服务器上配置的时区
        charset: 'utf8mb4',
        synchronize: true, // 根据实体自动创建数据库表， 生产环境建议关闭
        autoLoadEntities: true,
      }),
    }),
    PostsModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagsModule,
    PictureModule,
    ViewModule,
    SearchModule,
    MenusModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
