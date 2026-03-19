FROM node:25-alpine

WORKDIR /app

ARG USER_SERVICE_PATH

COPY ${USER_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${USER_SERVICE_PATH}/ .

RUN npx prisma generate

EXPOSE 3000
CMD sh -c "npx prisma migrate deploy && npm run start:dev"