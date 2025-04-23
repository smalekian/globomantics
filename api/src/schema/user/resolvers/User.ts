import type { Session, UserResolvers } from './../../types.generated';
export const User: UserResolvers = {
  favorites(user, args, { dataSources }) {
    const userById = dataSources.users.getUserById(user.id);

    if (!userById) {
      throw new Error('User not found');
    }

    if (!userById.favorites || userById.favorites.length === 0) {
      return [];
    }

    const favoriteSessions: Session[] = dataSources.sessions.getSessions({
      ids: userById.favorites,
    });

    return favoriteSessions;
  },
  speaker(user, args, { dataSources }) {
    return dataSources.speakers.getSpeakerByUserId(user.id);
  },
};
