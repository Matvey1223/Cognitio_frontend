# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем serve для обслуживания статических файлов
RUN npm install -g serve

# Копируем файлы проекта
WORKDIR /app
COPY . .

# Устанавливаем зависимости и строим проект
RUN npm install
RUN npm run build

# Открываем порт 3000
EXPOSE 3000

# Запускаем npx serve для обслуживания статического контента
CMD ["npx", "serve@latest", "out", "-l", "3000"]
