import type { MutationResolvers } from './../../../types.generated';
export const markFeatured: NonNullable<MutationResolvers['markFeatured']> = async (
  _parent,
  args,
  { user, dataSources }
) => {
  if (user && user.role === 'ADMIN') {
    return dataSources.speakers.markFeatured(args.speakerId, args.featured);
  }

  return null;
};
