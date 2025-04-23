import type { MutationResolvers } from './../../../types.generated';
export const signOut: NonNullable<MutationResolvers['signOut']> = async (
  _parent,
  _arg,
  { res }
) => {
  res.clearCookie('token');
  return {
    user: undefined,
  };
};
