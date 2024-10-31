FROM node:18

WORKDIR /api

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
