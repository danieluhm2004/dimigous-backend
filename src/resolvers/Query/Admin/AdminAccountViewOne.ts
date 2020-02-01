import PrismaUtil from '../../../utils/PrismaUtil';
import Account, { IAccount } from '../../../models/Account';

export default async function(_: any, { idx }: { idx: string }, ctx: any) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');
  const account: IAccount | null = await Account.findById(idx);
  if (!account) throw new Error('사용자 정보를 가져올 수 없어요.');
  return account;
}
