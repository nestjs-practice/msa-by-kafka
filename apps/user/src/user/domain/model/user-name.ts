import { ValueObject } from '@app/common/model/value-object.model';

type Props = {
  value: string;
};

export class UserName extends ValueObject<Props> {
  static from(name: string) {
    // todo : name validate
    return new UserName({ value: name });
  }

  getValue() {
    return this.props.value;
  }
}
