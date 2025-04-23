import type { QueryResolvers } from './../../../types.generated';
export const speakerById: NonNullable<QueryResolvers['speakerById']> = async (
  _parent,
  { id },
  { dataSources }
) => {
  if (!id) {
    throw new Error('Speaker ID is required');
  }

  return dataSources.speakers.getSpeakerById(id);
};
