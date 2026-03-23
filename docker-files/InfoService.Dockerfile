FROM node:25-alpine

WORKDIR /app

ARG INFO_SERVICE_PATH

COPY ${INFO_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${INFO_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"