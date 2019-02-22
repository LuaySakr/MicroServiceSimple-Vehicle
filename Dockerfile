FROM node:8-alpine

EXPOSE 7004

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "npm start" ]