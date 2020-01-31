FROM node:12

COPY . /app
WORKDIR /app
RUN yarn && yarn build

CMD yarn start
