import { IAccount } from '../models/Account';
import { Request } from 'express';
import JWT from 'jsonwebtoken';

class PrismaUtil {
  public static async getUser(ctx: any): Promise<IAccount> {
    const { req }: { req: Request } = ctx;
    const { authorization } = req.headers;
    if (!authorization) throw new Error('로그인이 필요한 서비스에요.');

    try {
      const token = authorization.replace('Bearer ', '');
      const account: string | object = await JWT.verify(
        token,
        process.env.JWT_SECRET || '',
      );
      return account as IAccount;
    } catch (err) {
      throw new Error('로그아웃되었어요. 다시 로그인해주세요.');
    }
  }
}

export default PrismaUtil;
