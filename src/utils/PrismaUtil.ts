import Account from '../entity/Account';
import { Request } from 'express';
import JWT from 'jsonwebtoken';

class PrismaUtil {
  public static async getUser(ctx: any): Promise<Account> {
    const { req }: { req: Request } = ctx;
    const { authorization } = req.headers;
    if (!authorization) throw Error('로그인이 필요한 서비스에요.');

    try {
      const token = authorization.replace('Bearer ', '');
      const account: string | object = await JWT.verify(
        token,
        'THISISSECRETKEY!!!!!',
      );
      return account as Account;
    } catch (err) {
      throw Error('로그아웃되었어요. 다시 로그인해주세요.');
    }
  }
}

export default PrismaUtil;
