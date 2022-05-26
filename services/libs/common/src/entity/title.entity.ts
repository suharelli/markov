import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Title {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  title: string;
}
