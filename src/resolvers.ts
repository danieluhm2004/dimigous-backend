import { IResolvers } from 'graphql-tools';
import Account from './entity/Account';
import RegexUtil from './utils/RegexUtil';
import Bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import PrismaUtil from './utils/PrismaUtil';

const resolvers: IResolvers = {
  Query: {
    async Me(_, __, ctx) {
      const account: Account = await PrismaUtil.getUser(ctx);
      return account;
    },
  },
  Mutation: {
    async AuthLogin(_, { idx, password }) {
      const options: any = {};
      if (idx.match(RegexUtil.IDENTITY)) options['identity'] = idx;
      else if (idx.match(RegexUtil.STUDENT_ID)) options['studentId'] = idx;
      else if (idx.match(RegexUtil.PHONE)) options['phone'] = idx;
      else throw Error('아이디 또는 비밀번호가 잘못되었어요.');
      const account = await Account.findOne(options);
      if (!account) throw Error('아이디 또는 비밀번호가 잘못되었어요.');
      const isMatch = Bcrypt.compareSync(password, account.password);
      if (!isMatch) throw Error('아이디 또는 비밀번호가 잘못되었어요.');
      if (!account.isActive) throw Error('해당 계정은 로그인할 수 없어요.');
      const [accessToken, refreshToken] = await Promise.all([
        JWT.sign(
          {
            identity: account.identity,
            studentId: account.studentId,
            username: account.username,
            phone: account.phone,
            department: account.department,
          },
          'THISISSECRETKEY!!!!!',
          {
            expiresIn: '30m',
          },
        ),
        JWT.sign({ identity: account.identity }, 'THISISSECRETKEY!!!!!', {
          expiresIn: '7d',
        }),
      ]);

      return {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      };
    },
    async AuthSignup(_, info) {
      if (!info.identity.match(RegexUtil.IDENTITY))
        throw Error('아이디는 영문, 숫자를 포함해서 5~20자로 입력해야 해요.');
      else if (!info.studentId.match(RegexUtil.STUDENT_ID))
        throw Error('올바른 학번을 입력해야 해요.');
      else if (!info.username.match(RegexUtil.USERNAME))
        throw Error('올바른 한글 이름을 입력해야 해요');
      else if (!info.phone.match(RegexUtil.PHONE))
        throw Error('올바른 전화번호를 입력해야 해요.');
      else if (!info.department.match(RegexUtil.DEPARTMENT))
        throw Error('올바른 학과를 선택해야 해요.');
      else if (!info.password.match(RegexUtil.PASSWORD))
        throw Error('비밀번호는 5~20자내로 영문, 숫자가 필수로 들어가야 해요');
      else if (!info.password === info.passwordConfirm)
        throw Error('비밀번호가 서로 일치하지 않아요.');

      const duplicate = await Account.findOne({
        where: {
          $or: [
            { identity: info.identity },
            { studentId: info.studentId },
            { phone: info.phone },
          ],
        },
      });

      if (duplicate) {
        if (duplicate.identity === info.identity)
          throw Error('이미 사용중인 아이디네요.');
        else if (duplicate.studentId === info.studentId)
          throw Error('해당 학번은 이미 가입되어 있어요.');
        else if (duplicate.phone === info.phone)
          throw Error('이미 사용중인 전화번호에요.');
      }

      const account = {
        isActive: true,
        identity: info.identity,
        studentId: info.studentId,
        username: info.username,
        phone: info.phone,
        department: info.department,
        password: Bcrypt.hashSync(info.password, 10),
      };

      return await Account.create(account).save();
    },
  },
};

export default resolvers;
