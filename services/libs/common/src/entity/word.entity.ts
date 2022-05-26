import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NextWord } from './next-word.entity';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  phrase: string;

  @Column()
  count: number;

  @OneToMany(() => NextWord, (nextWord) => nextWord.word)
  nextWords: NextWord[];
}
