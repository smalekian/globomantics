import { createToken, verifyPassword } from '../../../../utils/auth';
import type { MutationResolvers } from './../../../types.generated';
export const signIn: NonNullable<MutationResolvers['signIn']> = async (
  _parent,
  { credentials },
  { dataSources, res }
) => {
  const { email, password } = credentials;
  const userCredentials = { email: email.toLowerCase(), password };

  const existingUser = dataSources.users.getUserByEmail(userCredentials.email);

  if (!existingUser) {
    throw new Error('Incorrect email address or password.');
  }

  if (!existingUser.hash) {
    throw new Error('Incorrect email address or password.');
  }

  const isValidPassword = verifyPassword(password, existingUser.hash);

  if (!isValidPassword) {
    throw new Error('Incorrect email address or password.');
  }

  const token = createToken(existingUser);

  res.cookie('token', token, {
    httpOnly: true,
  });

  return {
    token,
    user: {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      name: existingUser.name,
    },
  };
};
