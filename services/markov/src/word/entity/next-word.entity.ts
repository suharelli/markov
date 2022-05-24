import { Word } from './word.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class NextWord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Word, (word) => word.nextWords)
  word: Word;

  @Column()
  count: number;

  @OneToOne(() => Word)
  @JoinColumn()
  nextWord: Word;
}
