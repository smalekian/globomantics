import type { QueryResolvers } from './../../../types.generated';
export const sessions: NonNullable<QueryResolvers['sessions']> = async (
  _parent,
  args,
  { dataSources }
) => {
  return dataSources.sessions.getSessions();
};
