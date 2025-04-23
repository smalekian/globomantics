import { createToken } from '../../../../utils/auth';
import type { MutationResolvers } from './../../../types.generated';
export const userInfo: NonNullable<MutationResolvers['userInfo']> = async (
  _parent,
  _arg,
  { user }
) => {
  if (user) {
    const token = createToken({ id: user.id, email: user.email, role: user.role, name: user.name });

    return {
      user: { id: user.id, email: user.email, role: user.role, name: user.name },
      token,
    };
  }

  return {
    user: undefined,
  };
};
