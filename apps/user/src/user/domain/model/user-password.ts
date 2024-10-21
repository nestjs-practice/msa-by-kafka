import { ValueObject } from '@app/common/model/value-object.model';

type Props = {
  value: string;
};

export class UserPassword extends ValueObject<Props> {
  static from(hashPassword: string) {
    return new UserPassword({ value: hashPassword });
  }

  getValue() {
    return this.props.value;
  }
}
