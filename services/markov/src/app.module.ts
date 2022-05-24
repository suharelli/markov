import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import getEnvVars from './tools/getEnvVars';

const env = getEnvVars();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.TYPEORM_HOST,
      port: Number(env.TYPEORM_PORT),
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      entities: ['dist/**/entity/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
