FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install
RUN npm start:dev
EXPOSE 3000

CMD ["npm", "run", "start:dev"]