import type { MutationResolvers } from './../../../types.generated';
export const toggleFavoriteSession: NonNullable<MutationResolvers['toggleFavoriteSession']> = async (_parent, args, { user, dataSources }) => {
  if (user) {
    const favoriteUser = await dataSources.users.toggleFavoriteSession(args.sessionId, user.id);

    // get sessions for user
    const favorites = dataSources.sessions.getSessions({ ids: favoriteUser.favorites });

    return { ...favoriteUser, favorites };
  }
  return undefined;
};
