import Mongoose, { Document, Schema } from 'mongoose';
import { IAccount } from './Account';

export interface IStory extends Document {
  isActive: boolean;
  number: number;
  account: string | IAccount;
  contents: string;
  createAt: Date;
}

export const StorySchema = new Schema({
  isActive: { type: Boolean, default: true, required: true },
  number: { type: Number, required: true },
  account: { type: Schema.Types.ObjectId, required: true },
  contents: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true },
});

export const Story = Mongoose.model<IStory>('Story', StorySchema);
export default Story;
