FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE ${APP_PORT}

CMD ["pnpm", "start"] 