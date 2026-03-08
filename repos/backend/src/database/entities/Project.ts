import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './Client';

@Entity()
export class ProjectEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ManyToOne(() => ClientEntity, (client) => client.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: ClientEntity;

  @Column({
    type: 'decimal',
    default: 0,
  })
  rate: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
