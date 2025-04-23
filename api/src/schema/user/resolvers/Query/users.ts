import type { QueryResolvers } from './../../../types.generated';
export const users: NonNullable<QueryResolvers['users']> = async (
  _parent,
  _arg,
  { dataSources }
) => {
  const dbUSers = dataSources.users.getUsers();

  if (!dbUSers) {
    throw new Error('Users not found');
  }

  // map over users and get favorites for each
  const users = dbUSers.map((user) => {
    const favorites = dataSources.sessions.getSessions({ ids: user.favorites || [] });

    return {
      ...user,
      favorites,
    };
  });

  return users;
};
