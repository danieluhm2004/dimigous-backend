import RegexUtil from '../../../utils/RegexUtil';
import JWT, { SignOptions } from 'jsonwebtoken';
import Phone from '../../../models/Phone';

export default async function(
  _: any,
  { phone, randomCode }: { phone: string; randomCode: string },
) {
  if (!phone.match(RegexUtil.PHONE))
    throw new Error('올바른 전화번호를 입력해야 해요');
  else if (randomCode.length !== 6)
    throw new Error('6자리의 인증 코드를 입력해야 해요.');

  const find = await Phone.findOne({ phone, randomCode });
  if (!find) throw Error('잘못된 인증 코드인 것 같아요..');

  const options: SignOptions = { expiresIn: '1h' };
  return {
    phone: await JWT.sign({ phone }, process.env.JWT_SECRET || '', options),
  };
}
