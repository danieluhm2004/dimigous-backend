import PrismaUtil from '../../../utils/PrismaUtil';
import Account, { IAccount } from '../../../models/Account';
import Story from '../../../models/Story';
import RegexUtil from '../../../utils/RegexUtil';

export default async function(_: any, { idx }: { idx: string }, ctx: any) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');

  const options: any = {};
  if (idx.match(RegexUtil.OBJECT_ID)) options._id = idx;
  else options.number = parseInt(idx);

  const story = await Story.findOne(options);
  if (!story) throw new Error('영구적으로 지워졌거나 없는 사연이에요.');
  const account = await Account.findById(story.account);
  if (!account) throw new Error('삭제된 사용자가 올린 사연이에요.');
  const newStory = JSON.parse(JSON.stringify(story));
  return { ...newStory, account };
}
