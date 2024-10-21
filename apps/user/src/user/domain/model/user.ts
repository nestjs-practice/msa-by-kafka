import { BaseObject } from '@app/common/model/base-object.model';
import { UserEmail } from '@app/user/user/domain/model/user-email';
import { UserPassword } from '@app/user/user/domain/model/user-password';
import { UserName } from '@app/user/user/domain/model/user-name';

type Props = {
  id?: number;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User extends BaseObject<Props> {
  static create() {}

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
