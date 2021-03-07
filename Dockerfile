FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY dist/src src
COPY assets assets

EXPOSE 3000

CMD [ "npm", "start" ]
