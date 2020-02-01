import PrismaUtil from '../../../utils/PrismaUtil';
import Story from '../../../models/Story';
import { IAccount } from '../../../models/Account';

export default async function(
  _: any,
  { idx, active }: { idx: string; active: boolean },
  ctx: any,
) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');
  const story = await Story.findOne({ $or: [{ _id: idx }] });
  if (!story) throw new Error('영구적으로 삭제되었거나 없는 사연이에요.');
  story.isActive = active;
  await story.save();
  return story;
}
