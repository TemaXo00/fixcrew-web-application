FROM node:25-alpine

WORKDIR /app

ARG FILE_SERVICE_PATH

COPY ${FILE_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${FILE_SERVICE_PATH}/ .

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"