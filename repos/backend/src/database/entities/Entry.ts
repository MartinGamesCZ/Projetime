import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectEntity } from './Project';

@Entity()
export class EntryEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description?: string;

  @Column({
    type: 'timestamptz',
  })
  startTime: Date;

  @Column({
    type: 'timestamptz',
  })
  endTime: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.id)
  project: ProjectEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
