import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@app/user/user/infrastructure/repository/i.user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user/domain/entity/user.entity';
import { Repository } from 'typeorm';
import { User } from '@app/user/user/domain/model/user';
import { UserMapper } from '@app/user/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async upsert(model: User) {
    const entity = UserMapper.toEntity(model);
    await this.userRepository.save(entity);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user ? UserMapper.toModel(user) : null;
  }
}
