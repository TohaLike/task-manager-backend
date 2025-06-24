# Используем Node.js на базе Alpine
FROM node:18-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копируем всё приложение
COPY . .

# Генерируем Prisma Client с нужным бинарником
RUN npx prisma generate

# Собираем NestJS-приложение
RUN npm run build

# Запуск в продакшене с применением схемы базы через prisma db push
CMD npx prisma db push && node dist/main
