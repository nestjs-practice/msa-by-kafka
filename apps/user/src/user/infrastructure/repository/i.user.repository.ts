import { User } from '@app/user/user/domain/model/user';
import { Nullable } from '@app/utils/type.util';

export const UserRepositoryToken = Symbol('UserRepository');

export interface IUserRepository {
  upsert(model: User): Promise<void>;
  findOneByEmail(email: string): Promise<Nullable<User>>;
}
