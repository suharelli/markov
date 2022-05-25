import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import getEnvVars from './tools/getEnvVars';
import { WordModule } from './word/word.module';
import { ParserModule } from './parser/parser.module';

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
    WordModule,
    ParserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
