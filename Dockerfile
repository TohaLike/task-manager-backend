FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Выполняем сборку проекта (предполагается, что в package.json есть скрипт build)
RUN npm run build

CMD ["npm", "run", "start:prod"]
