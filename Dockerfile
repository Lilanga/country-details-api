FROM node:14-alpine3.13

WORKDIR /opt/app

#package definitions
COPY package.json ./

#install dependencies
RUN npm install

#copy source files
COPY . .

EXPOSE 4000

CMD [ "node", "app.js" ]