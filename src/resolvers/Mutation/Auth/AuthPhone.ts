import RegexUtil from '../../../utils/RegexUtil';
import MessageUtil from '../../../utils/MessageUtil';
import Phone from '../../../models/Phone';

export default async function(_: any, { phone }: { phone: string }) {
  console.log('asdasdas');
  if (!phone.match(RegexUtil.PHONE))
    throw new Error('올바른 전화번호를 입력해야 해요');
  console.log('asdasdas');

  const randomCode = Math.floor(100000 + Math.random() * 900000);
  console.log('asdasdas');

  const { messageId, requestId } = await MessageUtil(
    `요청하신 인증번호는 [${randomCode}] 입니다.`,
    phone,
  );
  console.log('asdasdas');

  await Phone.create({
    phone,
    randomCode,
    requestId,
    messageId,
  });

  return {
    phone,
  };
}
