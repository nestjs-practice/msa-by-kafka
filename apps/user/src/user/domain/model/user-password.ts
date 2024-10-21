import { ValueObject } from '@app/common/model/value-object.model';

type Props = {
  value: string;
};

export class UserPassword extends ValueObject<Props> {
  static from(password: string) {
    // todo : password validate
    return new UserPassword({ value: password });
  }

  getValue() {
    return this.props.value;
  }
}
