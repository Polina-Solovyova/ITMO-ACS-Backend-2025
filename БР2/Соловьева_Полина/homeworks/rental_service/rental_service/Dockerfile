FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm ci

EXPOSE 5003

CMD ["node", "dist/index.js"]
