import { User } from '@app/user/user/domain/model/user';
import { UserEntity } from '@app/user/user/domain/entity/user.entity';
import { UserEmail } from '@app/user/user/domain/model/user-email';
import { UserPassword } from '@app/user/user/domain/model/user-password';
import { UserName } from '@app/user/user/domain/model/user-name';

export class UserMapper {
  static toModel(entity: UserEntity) {
    return new User({
      id: entity.id,
      email: UserEmail.from(entity.email),
      password: UserPassword.from(entity.password),
      name: UserName.from(entity.name),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toEntity(model: User) {
    return new UserEntity({
      email: model.getEmail(),
      password: model.getPassword(),
      name: model.getName(),
    });
  }
}
