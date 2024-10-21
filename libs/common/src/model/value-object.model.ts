type Props = {
  [key: string]: any;
};

export class ValueObject<T extends Props> {
  public props: Readonly<T>;

  constructor(init: T) {
    this.props = Object.freeze(init) || ({} as T);
  }

  public get<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.props[key];
  }
}
