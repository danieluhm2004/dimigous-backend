import Story, { IStory } from '../../../models/Story';
import RegexUtil from '../../../utils/RegexUtil';

export default async function(_: any, { idx }: { idx: string }) {
  const options: any = {};
  if (idx.match(RegexUtil.OBJECT_ID)) options._id = idx;
  else options.number = parseInt(idx);

  const story = await Story.findOne(options);
  if (!story) throw new Error('사연을 가져올 수 없어요.');
  if (!story.isActive) throw new Error('관리자에 의해 비공개된 사연이에요.');
  return story;
}
