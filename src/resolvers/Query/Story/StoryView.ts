import Story from '../../../models/Story';

export default async function() {
  return await Story.find({ isActive: true })
    .limit(100)
    .sort({ createAt: -1 });
}
