import RegexUtil from '../../../utils/RegexUtil';
import Bcrypt from 'bcrypt';
import Account from '../../../models/Account';
import JWT from 'jsonwebtoken';

export default async function(_: any, info: any) {
  if (!info.identity.match(RegexUtil.IDENTITY))
    throw new Error('아이디는 영문, 숫자를 포함해서 5~20자로 입력해야 해요.');
  else if (!info.studentId.match(RegexUtil.STUDENT_ID))
    throw new Error('올바른 학번을 입력해야 해요.');
  else if (!info.username.match(RegexUtil.USERNAME))
    throw new Error('올바른 한글 이름을 입력해야 해요');
  else if (!info.password.match(RegexUtil.PASSWORD))
    throw new Error('비밀번호는 5~20자내로 영문, 숫자가 필수로 들어가야 해요');
  else if (info.password !== info.passwordConfirm)
    throw new Error('비밀번호가 서로 일치하지 않아요.');

  const jwt: any = await JWT.decode(info.phone);
  if (!jwt || !jwt.phone)
    throw new Error('인증 번호가 만료되었어요. 다시 진행해주세요.');

  const { phone } = jwt;
  const duplicate = await Account.findOne({
    $or: [
      { identity: info.identity },
      { studentId: info.studentId },
      { phone },
    ],
  });

  if (duplicate) {
    if (duplicate.identity === info.identity)
      throw new Error('이미 사용중인 아이디네요.');
    else if (duplicate.studentId === info.studentId)
      throw new Error('해당 학번은 이미 가입되어 있어요.');
    else if (duplicate.phone === info.phone)
      throw new Error('이미 사용중인 전화번호에요.');
  }

  const account = {
    isActive: true,
    identity: info.identity,
    studentId: info.studentId,
    username: info.username,
    password: Bcrypt.hashSync(info.password, 10),
    phone,
  };

  return await Account.create(account);
}
