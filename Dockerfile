FROM node:16.17

WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .

CMD ["node", "index.js"]