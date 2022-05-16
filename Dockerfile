FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]
