import PrismaUtil from '../../../utils/PrismaUtil';
import { IAccount } from '../../../models/Account';

export default async function(_: any, __: any, ctx: any) {
  const account: IAccount = await PrismaUtil.getUser(ctx);
  return account;
}
