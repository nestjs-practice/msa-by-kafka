import { Optional } from '@app/utils/type.util';

type Props = {
  [key: string]: any;
};

export class BaseObject<T extends Props> {
  public constructor(protected _props: T) {}

  public get props(): Readonly<T> {
    return this._props;
  }

  get<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.props[key];
  }

  public getId(required: true): Required<T>['id'] extends Optional<infer K> ? K : Required<T>['id'];
  public getId(): T['id'];
  public getId(required?: true): any {
    if (required && !this.props.id) {
      throw new Error(`empty ${this.constructor.name}.id`);
    }

    return this.props.id;
  }

  protected set(props: Partial<T>): this {
    Object.keys(props).forEach((prop: keyof T) => {
      this._props[prop] = props[prop] as T[typeof prop];
    });

    return this;
  }

  protected setProps(props: Partial<T>): this {
    return this.set(props);
  }
}
