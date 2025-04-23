import type { MutationResolvers } from './../../../types.generated';
export const createSession: NonNullable<MutationResolvers['createSession']> = async (
  _parent,
  args,
  { dataSources, user }
) => {
  if (!user) {
    throw new Error('Not authorized');
  }

  return dataSources.sessions.createSession(args.session, user);
};
