import Mongoose, { Document, Schema } from 'mongoose';

export interface IRegion extends Document {
  isActive: boolean;
  region: string;
  usage: number;
  updateAt: Date;
}

export const RegionSchema = new Schema({
  isActive: { type: Boolean, default: true, required: true },
  region: { type: String, required: true },
  usage: { type: Number, default: 0, required: true },
  updateAt: { type: Date, default: Date.now, required: true },
  createAt: { type: Date, default: Date.now, required: true },
});

export const Region = Mongoose.model<IRegion>('Regions', RegionSchema);
export default Region;
