FROM node:hydrogen-slim
WORKDIR /usr/src/app
COPY package.json .
COPY pakage-lock .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:dev"]