FROM node:25-alpine

WORKDIR /app

ARG AUTH_SERVICE_PATH

COPY ${AUTH_SERVICE_PATH}/package*.json ./
RUN npm ci

COPY ${AUTH_SERVICE_PATH}/ .

RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]