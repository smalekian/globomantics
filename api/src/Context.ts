import { SessionsDataSource } from './datasources/sessions';
import { SpeakersDataSource } from './datasources/speakers';
import { UsersDataSource } from './datasources/users';
import { User } from './schema/types.generated';

export type DataSources = {
  users: UsersDataSource;
  speakers: SpeakersDataSource;
  sessions: SessionsDataSource;
};

export type Context = {
  user: User | null;
  res: any;
  dataSources: DataSources;
};
