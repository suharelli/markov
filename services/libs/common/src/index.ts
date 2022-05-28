import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from '@app/common/entity/word.entity';
import { NextWord } from '@app/common/entity/next-word.entity';
import { Title } from '@app/common/entity/title.entity';
import { getEnv } from '@app/common/tools/getEnvVars';
export * from './common.module';
export * from './common.service';

const env = getEnv();

export function getPgRealTypeOrmModule() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: env.TYPEORM_HOST,
    port: Number(env.TYPEORM_PORT),
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
    entities: [Word, NextWord, Title],
    synchronize: false,
  });
}
