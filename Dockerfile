FROM node:18.14.2

RUN apt-get install -y python3

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD [ "node", "./src/server.js" ]