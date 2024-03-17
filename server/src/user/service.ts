import bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
  const saltRounds = 10;
  const hashed_password = await bcrypt.hash(password, saltRounds);
  return hashed_password;
}

export async function comparePassword(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);
  return result;
}
