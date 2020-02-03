import Mongoose, { Document, Schema } from 'mongoose';

export interface IPhone extends Document {
  phone: string;
  randomCode: string;
  region: string;
  requestId: string;
  messageId: string;
  createAt: Date;
}

export const PhoneSchema = new Schema({
  phone: { type: String, required: true },
  randomCode: { type: String, required: true },
  region: { type: String, required: true },
  requestId: { type: String, required: true },
  messageId: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true, expires: 180 },
});

export const Phone = Mongoose.model<IPhone>('Phones', PhoneSchema);
export default Phone;
