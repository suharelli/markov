import { Word } from './word.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['word', 'nextWord'], { unique: true })
export class NextWord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Word, (word) => word.nextWords)
  @Index()
  word: Word;

  @Column()
  count: number;

  @ManyToOne(() => Word)
  @JoinColumn()
  nextWord: Word;
}
