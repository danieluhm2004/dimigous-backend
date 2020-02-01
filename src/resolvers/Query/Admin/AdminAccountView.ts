import PrismaUtil from '../../../utils/PrismaUtil';
import Account, { IAccount } from '../../../models/Account';

export default async function(_: any, __: any, ctx: any) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');
  const accounts: IAccount[] = await Account.find();
  return accounts;
}
