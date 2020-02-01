import PrismaUtil from '../../../utils/PrismaUtil';
import Account, { IAccount } from '../../../models/Account';
import Story from '../../../models/Story';
import { ObjectId } from 'mongodb';
import _ from 'lodash';

export default async function(_: any, __: any, ctx: any) {
  const admin: IAccount = await PrismaUtil.getUser(ctx);
  if (!admin.isAdmin) throw new Error('관리자만 확인할 수 있어요.');
  const accounts: { [key: string]: IAccount } = {};
  const queryStories = await Story.find();
  const stories: any[] = [];
  for (const i in queryStories) {
    let account: IAccount | null;
    const story = JSON.parse(JSON.stringify(queryStories[i]));
    if (typeof story.account !== 'string') continue;
    if (accounts[story.account]) account = accounts[String(story.account)];
    else account = await Account.findOne({ _id: story.account });

    if (!account) continue;
    accounts[story.account] = account;
    stories.push({ ...story, account });
  }
  return stories;
}
