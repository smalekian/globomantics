import type { QueryResolvers } from './../../../types.generated';
export const speakers: NonNullable<QueryResolvers['speakers']> = async (
  _parent,
  args,
  { dataSources }
) => {
  return dataSources.speakers.getSpeakers(args);
};
