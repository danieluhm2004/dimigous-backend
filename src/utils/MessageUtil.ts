import AWS from 'aws-sdk';

export default async function(message: string, phone: string) {
  const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

  phone = '82' + phone.replace(/-/g, '');
  const res = await SNS.publish({
    Message: `[${process.env.NAME || '클라우드어스'}] ${message}`,
    MessageStructure: 'string',
    PhoneNumber: phone,
  }).promise();

  return {
    messageId: res.MessageId,
    requestId: res.$response.requestId,
  };
}
