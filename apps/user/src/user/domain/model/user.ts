import { BaseObject } from '@app/common/model/base-object.model';
import { UserEmail } from '@app/user/user/domain/model/user-email';
import { UserPassword } from '@app/user/user/domain/model/user-password';
import { UserName } from '@app/user/user/domain/model/user-name';
import { SignUpRequestDto } from '@app/common/dto/auth/sign-up.request.dto';
import bcrypt from 'bcrypt';

type Props = {
  id?: number;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends BaseObject<Props> {
  static new(dto: SignUpRequestDto) {
    const hashPassword = bcrypt.hashSync(dto.password, 10);

    return new User({
      email: UserEmail.from(dto.email),
      password: UserPassword.from(hashPassword),
      name: UserName.from(dto.name),
    });
  }

  static from() {}

  getEmail() {
    return this.props.email.getValue();
  }

  getPassword() {
    return this.props.password.getValue();
  }

  getName() {
    return this.props.name.getValue();
  }

  getCreatedAt() {
    return this.props.createdAt;
  }

  getUpdatedAt() {
    return this.props.updatedAt;
  }
}
