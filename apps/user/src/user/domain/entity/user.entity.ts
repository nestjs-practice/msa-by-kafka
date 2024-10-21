import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@app/common/entity/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ length: 20 })
  name: string;

  constructor(init: UserEntity) {
    super();
    Object.assign(this, init);
  }
}
