import PrismaUtil from '../../../utils/PrismaUtil';
import { Story } from '../../../models/Story';
import Account from '../../../models/Account';

export default async function(
  _: any,
  { contents }: { contents: string },
  ctx: any,
) {
  const { _id } = await PrismaUtil.getUser(ctx);
  const account = await Account.findOne({ _id });
  if (!account) throw new Error('계정에 문제가 발생했어요.');
  if (!account.isActive) throw new Error('관리자에 의해 정지된 계정이에요');
  if (contents.length < 3) throw new Error('최소 3자리 이상 입력해주세요.');

  const number = await Story.countDocuments();
  const story = {
    isActive: true,
    number: number + 1,
    account,
    contents,
  };

  return await Story.create(story);
}
