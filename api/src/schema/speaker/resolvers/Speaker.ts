import type { SpeakerResolvers } from './../../types.generated';
export const Speaker: SpeakerResolvers = {
  async sessions(speaker, args, { dataSources }) {
    // @ts-ignore
    console.log('speaker', speaker.userId);
    let sessions = [];
    // @ts-ignore
    if (speaker.userId) {
      // @ts-ignore
      sessions = dataSources.sessions.getSessionsForSpeaker(speaker.userId.toString());
    }

    return sessions;
  },
  user(speaker, args, { dataSources }) {
    const user = dataSources.users.getUserById(speaker.user.id);

    // get favorite sessions for user
    const favorites = dataSources.sessions.getSessions({ ids: user.favorites });

    return { ...user, favorites };
  },
};
