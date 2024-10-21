import { ValueObject } from '@app/common/model/value-object.model';
import bcrypt from 'bcrypt';

type Props = {
  value: string;
};

export class UserPassword extends ValueObject<Props> {
  static from(password: string) {
    const hashPassword = bcrypt.hashSync(password, 10);

    return new UserPassword({ value: hashPassword });
  }

  getValue() {
    return this.props.value;
  }
}
