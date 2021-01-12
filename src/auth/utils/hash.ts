import { genSaltSync, hashSync } from 'bcrypt';

export const hash = (data: any) => {
  const SALT_ROUNDS = 10;
  const salt = genSaltSync(SALT_ROUNDS);
  const hashedData = hashSync(data, salt);

  return hashedData;
};
