import RegexUtil from '../../../utils/RegexUtil';
import JWT from 'jsonwebtoken';
import Bcrypt from 'bcrypt';
import Account from '../../../models/Account';

export default async function(
  _: any,
  { idx, password }: { idx: string; password: string },
) {
  const options: any = {};
  if (idx.match(RegexUtil.IDENTITY)) options['identity'] = idx;
  else if (idx.match(RegexUtil.STUDENT_ID)) options['studentId'] = idx;
  else if (idx.match(RegexUtil.PHONE)) options['phone'] = idx;
  else throw new Error('아이디 또는 비밀번호가 잘못되었어요.');
  const account = await Account.findOne(options);
  if (!account) throw new Error('아이디 또는 비밀번호가 잘못되었어요.');
  const isMatch = Bcrypt.compareSync(password, account.password);
  if (!isMatch) throw new Error('아이디 또는 비밀번호가 잘못되었어요.');
  if (!account.isActive) throw new Error('해당 계정은 로그인할 수 없어요.');
  const accessToken = await JWT.sign(
    {
      _id: account._id,
      isAdmin: account.isAdmin,
      identity: account.identity,
      studentId: account.studentId,
      username: account.username,
      phone: account.phone,
    },
    process.env.JWT_SECRET || '',
  );

  return {
    accessToken: `Bearer ${accessToken}`,
  };
}
