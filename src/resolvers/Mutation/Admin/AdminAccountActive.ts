import PrismaUtil from '../../../utils/PrismaUtil';
import Account, { IAccount } from '../../../models/Account';

export default async function(
  _: any,
  { idx, active }: { idx: string; active: boolean },
  ctx: any,
) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');
  const account = await Account.findOne({ $or: [{ _id: idx }] });
  if (!account) throw new Error('영구적으로 삭제되었거나 없는 계정이에요..');
  account.isActive = active;
  await account.save();
  return account;
}
