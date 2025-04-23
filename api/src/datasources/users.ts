import { Low } from 'lowdb/lib';
import { JSONPreset } from 'lowdb/node';
import { User } from '../schema/types.generated';

export type UserType = Omit<User, 'favorites'> & { favorites?: string[] };

export type Users = {
  users: UserType[];
};

type Data = Users;

const defaultData: Data = {
  users: [],
};

export class UsersDataSource {
  private users: UserType[];
  private db: Low<Data>;

  constructor(db: Low<Data>) {
    const { users } = db.data;
    this.users = users;
    this.db = db;
  }

  public static async create() {
    const db = await JSONPreset<Data>('./data/users.json', defaultData);
    return new UsersDataSource(db);
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(user: Omit<User, 'favorites' | 'id'> & { favorites?: string[] }) {
    const id = String(this.users.length + 1);
    const newUser = { id, ...user };
    this.users.push(newUser);
    await this.db.write();

    return newUser;
  }

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async toggleFavoriteSession(sessionId: string, userId: string) {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const favorites = user.favorites || [];

    const index = favorites.indexOf(sessionId);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(sessionId);
    }

    user.favorites = favorites;

    await this.db.write();

    return user;
  }
}
