import type { QueryResolvers } from './../../../types.generated';
export const userById: NonNullable<QueryResolvers['userById']> = async (
  _parent,
  { id },
  { dataSources }
) => {
  if (!id) {
    throw new Error('User ID is required');
  }

  const dbUser = dataSources.users.getUserById(id);

  if (!dbUser) {
    throw new Error('User not found');
  }

  const favorites = dataSources.sessions.getSessions({ ids: dbUser.favorites || [] });

  return {
    ...dbUser,
    favorites,
  };
};
