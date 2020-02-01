import Mongoose, { Document, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IAccount extends Document {
  isActive: boolean;
  isAdmin: boolean;
  identity: string;
  studentId: string;
  username: string;
  phone: string;
  password: string;
  createAt: Date;
}

export const AccountSchema = new Schema({
  isActive: { type: Boolean, default: true, required: true },
  isAdmin: { type: Boolean, default: false, required: true },
  identity: { type: String, required: true },
  studentId: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now, required: true },
});

export const Account = Mongoose.model<IAccount>('Account', AccountSchema);
export default Account;
