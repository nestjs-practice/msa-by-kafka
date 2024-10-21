import { ValueObject } from '@app/common/model/value-object.model';

type Props = {
  value: string;
};

export class UserEmail extends ValueObject<Props> {
  static from(email: string) {
    // todo : email validate
    return new UserEmail({ value: email });
  }

  getValue() {
    return this.props.value;
  }
}
