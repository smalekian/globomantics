import type { SessionResolvers } from './../../types.generated';
export const Session: SessionResolvers = {
  async speakers(session, args, { dataSources }) {
    const speakers = dataSources.speakers.getSpeakers(args);

    const returns = speakers.filter((speaker) => {
      return session.speakers.filter((s) => s.id === speaker.id).length > 0;
    });

    return returns;
  },
};
