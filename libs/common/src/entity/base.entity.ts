import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn()
  @Exclude()
  createdAt?: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt?: Date;
}
