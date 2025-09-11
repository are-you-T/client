import bcrypt from "bcryptjs";

const saltRounds = 10; // 해시 알고리즘의 비용 인자로, 값이 높을수록 더 많은 계산 자원이 필요합니다.

// 입력된 비밀번호를 해싱합니다.
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

type ComparePasswordType = {
  password: string;
  hashedPassword: string;
};

// 입력된 비밀번호와 해시된 비밀번호를 비교합니다.
export const compareHashPassword = async ({ password, hashedPassword }: ComparePasswordType) => {
  return await bcrypt.compare(password, hashedPassword);
};
