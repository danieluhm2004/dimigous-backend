# 🎒 디미고어스 백엔드

디미고어스 서비스 운영시 사용하였던 소스코드입니다. 🖐

**하루만에 만든거라 안정성이 매우 떨어집니다. 가급적 사용하지 마세요.**

⚠️ 해당 소프트웨어를 사용함에 따른 책임은 이를 이용하는 사용자에게 있음을 알려드립니다.

❌ 이의 제기 및 기타 문의는 iam@dan.al으로 문의주세요.

## 설치

### Git Clone
```bash
git clone https://github.com/danieluhm2004/dimigous-backend
```
해당 프로젝트를 다운로드 합니다.


### NPM Install
```bash
npm install
```
필요한 라이브러리를 설치합니다.

### TypeScript Build
```bash
npm run build
```
프로젝트를 JS로 빌드합니다.

> ⚠️ 오류가 발생하나요?
> ```bash
> npm install -g typescript
> ```
> 위 명령어를 사용해보세요.

### Install PM2

NPM으로 설치할 경우,
```bash
npm install pm2 -g
```

NPM이 없거나 원치 않은 경우,

```bash
wget -qO- https://getpm2.com/install.sh | bash
```

### Setup Config

ecosystem.config.js 파일을 아래와 같이 설정합니다.
```js
module.exports = {
  apps: [
    {
      name: 'Dimigous Backend',
      script: 'dist/index.js',

      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NAME: '디미라디오',
        PORT: '28190',
        MONGODB_URI: '여기에 몽고디비 주소를 넣으세요.',
        JWT_SECRET: '< JWT 시크릿 키를 넣어주세요. >',
        AWS_ACCESSKEY: '< AWS 어세스 키를 넣어주세요. >',
        AWS_SECRETKEY: '< AWS 시크릿 키를 넣어주세요. >',
        NODE_ENV: 'production',
      },
    },
  ],
};
```
< > 로 되어 있는 설정값은 반드시 변경해주셔야 합니다.
AWS 키는 문자 발송에 사용됩니다.

### Start PM2

```bash
pm2 start ecosystem.config.js
```
아래 명령어를 사용하여 프로그램을 실행하세요.


### Done!

🥳 축하해요. 이제 ``http://localhost:28190``으로 접속해보세요!
