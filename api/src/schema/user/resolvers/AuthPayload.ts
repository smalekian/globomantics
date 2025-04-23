import type { AuthPayloadResolvers } from './../../types.generated';
export const AuthPayload: AuthPayloadResolvers = {
  token: (parent) => parent.token,
  user: (parent) => parent.user,
};
