import type { QueryResolvers } from './../../../types.generated';
export const me: NonNullable<QueryResolvers['me']> = async (
  _parent,
  _arg,
  { user, dataSources }
) => {
  if (user) {
    const dbUser = dataSources.users.getUserById(user.id);

    if (!dbUser) {
      throw new Error('User not found');
    }

    const favorites = dataSources.sessions.getSessions({ ids: dbUser.favorites || [] });

    const speaker = dataSources.speakers.getSpeakerByUserId(dbUser.id);

    return {
      ...dbUser,
      favorites,
      speaker,
    };
  }
  return undefined;
};
