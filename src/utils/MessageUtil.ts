import AWS from 'aws-sdk';
import Region, { IRegion } from '../models/Region';

export default async function(message: string, phone: string) {
  const region = await Region.findOne({ isActive: true }).sort({ usage: 1 });
  if (!region) throw new Error('사용 가능한 리전이 없습니다.');
  AWS.config.update({ region: region.region });
  const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
  phone = '82' + phone.replace(/-/g, '');
  const res = await SNS.publish({
    Message: `[${process.env.NAME || '클라우드어스'}] ${message}`,
    MessageStructure: 'string',
    PhoneNumber: phone,
  }).promise();

  region.usage += 1;
  region.updateAt = new Date();
  await region.save();
  return {
    messageId: res.MessageId,
    requestId: res.$response.requestId,
    region: region.region,
  };
}
