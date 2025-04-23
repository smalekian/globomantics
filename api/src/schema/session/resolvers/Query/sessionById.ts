import type { QueryResolvers } from './../../../types.generated';
export const sessionById: NonNullable<QueryResolvers['sessionById']> = async (
  _parent,
  { id },
  { dataSources }
) => {
  if (!id) {
    throw new Error('Session ID is required');
  }

  const session = dataSources.sessions.getSessionById(id);
  return session;
};
