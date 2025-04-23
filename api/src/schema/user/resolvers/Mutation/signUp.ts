import { createToken, hashPassword } from '../../../../utils/auth';
import type { MutationResolvers } from './../../../types.generated';
export const signUp: NonNullable<MutationResolvers['signUp']> = async (
  _parent,
  { credentials },
  { dataSources, res }
) => {
  const { email, password, name } = credentials;
  const userCredentials = { email: email.toLowerCase(), password, name };

  const existingUser = dataSources.users.getUserByEmail(userCredentials.email);

  if (existingUser) {
    throw new Error('A user account with that email already exists.');
  }

  const hash = hashPassword(userCredentials.password);

  const role = userCredentials.email.toLowerCase().endsWith('@globomantics.com') ? 'ADMIN' : 'USER';

  const dbUser = await dataSources.users.createUser({
    name,
    email: userCredentials.email,
    hash,
    role,
  });

  if (role === 'USER') {
    await dataSources.speakers.createSpeaker(dbUser);
  }

  const token = createToken(dbUser);

  res.cookie('token', token, {
    httpOnly: true,
  });

  return {
    token,
    user: {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role,
    },
  };
};
