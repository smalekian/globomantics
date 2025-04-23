import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserType } from '../datasources/users';

const createToken = (userInfo: UserType) => {
  if (!process.env.SECRET) {
    throw new Error('Secret is not defined');
  }

  return JWT.sign(
    { id: userInfo.id, email: userInfo.email, role: userInfo.role, name: userInfo.name },
    process.env.SECRET
  );
};

const verifyPassword = (attemptedPw: string, hashedPw: string) =>
  bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password: string) => bcrypt.hashSync(password);

const verifyToken = (token: string) => {
  if (!process.env.SECRET) {
    throw new Error('Secret is not defined');
  }

  return JWT.verify(token, process.env.SECRET);
};
export { createToken, verifyPassword, hashPassword, verifyToken };
